from typing import Any, Dict, List, Optional, Union
from langchain.schema import AgentAction, AgentFinish, LLMResult
from langchain.agents.agent import AgentExecutor
from langchain.agents.agent_toolkits.sql.prompt import SQL_PREFIX, SQL_SUFFIX
from langchain.agents.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langchain.agents.mrkl.base import ZeroShotAgent
from langchain.agents.mrkl.prompt import FORMAT_INSTRUCTIONS
from langchain.callbacks.base import BaseCallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains.llm import LLMChain
from threaded_generator import ThreadedGenerator
import json
from shape_analytics import ShapeAnalytics
from slack_data import SlackData
import os
from decouple import config
from langchain.llms.openai import OpenAI
from database_factory import *

SHAPE_SQL_PREFIX = """You are an agent designed to interact with a SQL database and write matplotlib code.
Given an input question, create a syntactically correct {dialect} query to run, then look at the results of the query and write detailed and correct matplotlib code to create a chart of the results which saves to an io.BytesIO() buffer called buffer. 

Unless the user specifies a specific number of examples they wish to obtain, always limit your query to at most {top_k} results.
You can order the results by a relevant column to return the most interesting examples in the database.
Never query for all the columns from a specific table, only ask for the relevant columns given the question.
You have access to tools for interacting with the database.
Only use the below tools. Only use the information returned by the below tools to write your matplotlib code.
You MUST double check your query before executing it. If you get an error while executing a query, rewrite the query and try again.

DO NOT make any DML statements (INSERT, UPDATE, DELETE, DROP etc.) to the database.

If the question does not seem related to the database, just return "I don't know" as the answer.

Please return the answer as JSON string where the first key is 'matplotlib_code' and the value is the matplotlib code you wrote, 
and the second key is 'summary' and the value is one English sentence describing the results of the query.

"""

def create_shape_sql_agent(callback_manager: Optional[BaseCallbackManager] = None, **kwargs: Any) -> AgentExecutor:
    """Construct a sql agent from an LLM and tools."""
    
    db = DatabaseFactory.create_database()

    os.environ["OPENAI_API_KEY"] = config("OPENAI_API_KEY")
    llm = OpenAI(temperature=0, 
                 model_name="gpt-4")
    toolkit = SQLDatabaseToolkit(db=db,
                                 llm=llm)
    tools = toolkit.get_tools()
    prompt = ZeroShotAgent.create_prompt(
        tools,
        prefix=SHAPE_SQL_PREFIX.format(dialect=toolkit.dialect, top_k=10),
        suffix=SQL_SUFFIX,
        format_instructions=FORMAT_INSTRUCTIONS,
    )
    
    llm_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        callback_manager=callback_manager,
    )
    tool_names = [tool.name for tool in tools]
    agent = ZeroShotAgent(llm_chain=llm_chain, allowed_tools=tool_names, **kwargs)
    return AgentExecutor.from_agent_and_tools(
        agent=agent,
        tools=toolkit.get_tools(), 
        callback_manager=callback_manager, 
        verbose=True,
        max_execution_time=240,
    )


class ShapeSQLCallbackHandler(StreamingStdOutCallbackHandler):
    """Callback Handler that handles for Shape SQL Events"""

    def __init__(
        self,
        threadedGntr: ThreadedGenerator,
        shapeAnalytics: ShapeAnalytics,
        slackData: SlackData,
    ):
        super().__init__()
        self.threadedGntr = threadedGntr
        self.shapeAnalytics = shapeAnalytics
        self.slackData = slackData

    def on_agent_action(
        self, action: AgentAction, color: Optional[str] = None, **kwargs: Any
    ) -> Any:
        """Run on agent action."""
        print("on_agent_action")
        actionDict = {
            "on_agent_action": {
                "tool": action.tool,
                "tool_input": action.tool_input,
                "log": action.log,
            }
        }

        if self.slackData != None and action.log.partition("Action:")[0] != "":
            self.slackData.send(action.log.partition("Action:")[0])
            if action.tool == "query_sql_db":
                self.shapeAnalytics.track(
                    "on_agent_action",
                    {
                        "tool": action.tool,
                        "tool_input": action.tool_input,
                    },
                )
                self.slackData.send(
                    f"Here is the SQL Statement I will run: \n`{action.tool_input}`"
                )
        self.threadedGntr.send(json.dumps(actionDict))

    def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> Any:
        """Run when LLM starts running."""
        print("on_llm_start")
        print(f"prompts: {prompts}")
        pass

    def on_llm_new_token(self, token: str, **kwargs: Any) -> Any:
        """Run on new LLM token. Only available when streaming is enabled."""
        pass

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> Any:
        """Run when LLM ends running."""
        print("on_llm_end")
        pass

    def on_llm_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when LLM errors."""
        pass

    def on_chain_start(
        self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
    ) -> Any:
        """Run when chain starts running."""
        print("on_chain_start")
        startDict = {"on_chain_start":"Entering new chain..."}
        self.threadedGntr.send(json.dumps(startDict))

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> Any:
        """Run when chain ends running."""
        print("on_chain_end")
        finishDict = {"on_chain_end":"Finished chain"}
        self.threadedGntr.send(json.dumps(finishDict))

    def on_chain_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when chain errors."""
        pass

    def on_tool_start(
        self, serialized: Dict[str, Any], input_str: str, **kwargs: Any
    ) -> Any:
        """Run when tool starts running."""
        print("on_tool_start")
        pass

    def on_tool_end(
        self,
        output: str,
        color: Optional[str] = None,
        observation_prefix: Optional[str] = None,
        llm_prefix: Optional[str] = None,
        **kwargs: Any,
    ) -> None:
        """If not the final action, print out observation."""
        print("on_tool_end")
        toolEndDict = {
            "on_tool_end": {
                "observation_prefix": observation_prefix,
                "output": output,
                "llm_prefix": llm_prefix,
            }
        }
        self.threadedGntr.send(json.dumps(toolEndDict))
        if self.slackData != None:
            self.slackData.send(output.partition("Action:")[0])

    def on_tool_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when tool errors."""
        pass

    def on_text(
        self,
        text: str,
        color: Optional[str] = None,
        end: str = "",
        **kwargs: Optional[str],
    ) -> None:
        # """Run when agent ends."""
        print("on_text")
        self.threadedGntr(text)

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> Any:
        """Run on agent end."""
        print("on_agent_finish")
        finishResponse = {
            "log":finish.log,
            "return_values":finish.return_values
        }
        
        finishDict = {
            "on_agent_finish":finishResponse
        }
        if(self.slackData!=None):
            self.slackData.send(finish.log)
        self.threadedGntr.send(json.dumps(finishDict))
