from typing import Any, Dict, List, Union
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.evaluation.qa import QAEvalChain
from shape_sql_callback import create_shape_sql_agent
from sqlalchemy import *
from sqlalchemy.engine import create_engine
from sqlalchemy.schema import *
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.callbacks.base import CallbackManager
from langchain.callbacks.stdout import StdOutCallbackHandler
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.schema import AgentAction, AgentFinish, LLMResult
from langchain.callbacks.base import BaseCallbackHandler
from langchain.agents.agent import AgentExecutor
import json
import os


class UnitTestHandler(StreamingStdOutCallbackHandler):
    def __init__(self, unit_tests: List[dict]):
        super().__init__()
        self.unit_tests = unit_tests
        self.predictions = []

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> Any:
        """Run on agent end."""
        print("UnitTestHandler: Agent finished")
        print(finish.return_values["output"])
        self.predictions.append({"prediction": finish.return_values["output"]})
        if len(self.predictions) == len(self.unit_tests):
            self.evaluate(self.unit_tests, self.predictions)

    def evaluate(self, unit_tests: List[dict], predictions: List[dict]):
        TEMPLATE = """You are an expert professor specialized in grading answers to questions.
    You are grading the following question:
    {query}
    Here is the real answer:
    {answer}
    You are grading the following predicted answer:
    {result}
    Is the predicted answer correct? Answer Correct or Incorrect.
    """
        PROMPT = PromptTemplate(
            input_variables=["query", "answer", "result"], template=TEMPLATE
        )

        evalchain = QAEvalChain.from_llm(
            llm=OpenAI(model_name="text-davinci-003", temperature=0), prompt=PROMPT
        )

        unit_tests_scores = evalchain.evaluate(
            examples=unit_tests,
            predictions=predictions,
            question_key="question",
            answer_key="answer",
            prediction_key="prediction",
        )

        correctAnswers = 0
        for i, unit_test in enumerate(unit_tests):
            print(f"Test {i+1}:")
            print("Question: " + unit_test["question"])
            print("Real Answer: " + unit_test["answer"])
            print("Predicted Answer: " + predictions[i]["prediction"])
            print("Status: " + unit_tests_scores[i]["text"])
            if (
                unit_tests_scores[i]["text"] == "\nCorrect"
            ):  # QAEvalChain returns a newline character in the answer
                correctAnswers += 1
            print()
        print(f"{correctAnswers} tests correct out of {len(unit_tests)} tests")


def getSqlAgent(unitTestHandler: UnitTestHandler) -> AgentExecutor:
    engine = create_engine(
        "bigquery://", credentials_info=json.loads(os.environ["BQ_API_KEY"])
    )
    db = SQLDatabase(engine)
    toolkit = SQLDatabaseToolkit(db=db)
    agent_executor = create_shape_sql_agent(
        llm=OpenAI(temperature=0, model_name="text-davinci-003"),
        toolkit=toolkit,
        callback_manager=CallbackManager([unitTestHandler, StdOutCallbackHandler()]),
        verbose=True,
        max_execution_time=240,
        streaming=True,
    )
    return agent_executor


def runUnitTests():
    # Add unit tests here
    unit_tests = [
        {"question": "How many tables are there?", "answer": "5 tables"},
        {"question": "Which state has the most covid cases?", "answer": "California"},
        {"question": "How many austin bike stations are there?", "answer": "102"},
    ]
    unitTestHandler = UnitTestHandler(unit_tests=unit_tests)
    sqlAgent = getSqlAgent(unitTestHandler=unitTestHandler)
    for unit_test in unit_tests:
        question = unit_test["question"]
        sqlAgent.run(question)


runUnitTests()
