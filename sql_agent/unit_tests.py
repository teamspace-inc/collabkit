from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import OpenAI
from langchain.evaluation.qa import QAEvalChain

# Add unit tests here
unit_tests = [
  {
    "question":"How many tables are there?",
    "answer":"5 tables"
  },
  {
    "question":"Which state has the most covid cases?",
    "answer":"California"
  }
]

# TODO: Get answers from SQL Agent
predictions = [
  {
    "prediction":"There are 5 tables",
  },
  {
    "prediction":"California has the most covid cases",
  }
]


TEMPLATE = """You are an expert professor specialized in grading answers to questions.
You are grading the following question:
{query}
Here is the real answer:
{answer}
You are grading the following predicted answer:
{result}
Is the predicted answer correct? Answer Correct or Incorrect.
"""

PROMPT = PromptTemplate(input_variables=["query", "answer", "result"], 
                        template=TEMPLATE)

evalchain = QAEvalChain.from_llm(llm=OpenAI(model_name="text-davinci-003", temperature=0),
                                 prompt=PROMPT)

unit_tests_scores = evalchain.evaluate(examples=unit_tests, 
                                       predictions=predictions, 
                                       question_key="question", 
                                       answer_key="answer", 
                                       prediction_key="prediction")

correctAnswers = 0
for i, unit_test in enumerate(unit_tests):
  print(f"Test {i+1}:")
  print("Question: " + unit_test['question'])
  print("Real Answer: " + unit_test['answer'])
  print("Predicted Answer: " + predictions[i]['prediction'])
  print("Status: " + unit_tests_scores[i]['text'])
  if unit_tests_scores[i]['text'] == "\nCorrect": # QAEvalChain returns a newline character in the answer
    correctAnswers += 1
  print()

print(f"{correctAnswers} tests correct out of {len(unit_tests)} tests")
