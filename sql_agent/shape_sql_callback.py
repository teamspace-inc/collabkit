from typing import Any, Dict, List, Optional, Union
from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import AgentAction, AgentFinish, LLMResult
from langchain.agents.agent import AgentExecutor
from langchain.agents.agent_toolkits.sql.prompt import SQL_PREFIX, SQL_SUFFIX
from langchain.agents.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langchain.agents.mrkl.base import ZeroShotAgent
from langchain.agents.mrkl.prompt import FORMAT_INSTRUCTIONS
from langchain.callbacks.base import BaseCallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains.llm import LLMChain
from langchain.llms.base import BaseLLM
from threaded_generator import ThreadedGenerator

def create_shape_sql_agent(
    llm: BaseLLM,
    toolkit: SQLDatabaseToolkit,
    callback_manager: Optional[BaseCallbackManager] = None,
    prefix: str = SQL_PREFIX,
    suffix: str = SQL_SUFFIX,
    format_instructions: str = FORMAT_INSTRUCTIONS,
    input_variables: Optional[List[str]] = None,
    top_k: int = 10,
    verbose: bool = False,
    **kwargs: Any,
) -> AgentExecutor:
    """Construct a sql agent from an LLM and tools."""
    tools = toolkit.get_tools()
    prefix = prefix.format(dialect=toolkit.dialect, top_k=top_k)
    prompt = ZeroShotAgent.create_prompt(
        tools,
        prefix=prefix,
        suffix=suffix,
        format_instructions=format_instructions,
        input_variables=input_variables,
    )
    llm_chain = LLMChain(
        llm=llm,
        prompt=prompt,
        callback_manager=callback_manager,
    )
    tool_names = [tool.name for tool in tools]
    agent = ZeroShotAgent(llm_chain=llm_chain, allowed_tools=tool_names, **kwargs)
    return AgentExecutor.from_agent_and_tools(
        agent=agent, tools=toolkit.get_tools(), callback_manager=callback_manager, verbose=verbose
    )


class ShapeSQLCallbackHandler(StreamingStdOutCallbackHandler):
    """Callback Handler that handles for Shape SQL Events"""
    def __init__(self, threadedGntr: ThreadedGenerator):
        super().__init__()
        self.threadedGntr = threadedGntr
   
    def on_llm_new_token(self, token: str, **kwargs):
        self.threadedGntr.send(token)

    def on_agent_action(
        self, action: AgentAction, color: Optional[str] = None, **kwargs: Any
    ) -> Any:
        """Run on agent action."""
        self.threadedGntr.send(action.tool)
        self.threadedGntr.send(action.tool_input)
        self.threadedGntr.send(action.log)

    def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> Any:
        """Run when LLM starts running."""
        pass

    def on_llm_new_token(self, token: str, **kwargs: Any) -> Any:
        """Run on new LLM token. Only available when streaming is enabled."""
        self.threadedGntr.send(token)

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> Any:
        """Run when LLM ends running."""
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
        class_name = serialized["name"]
        self.threadedGntr.send(f"Entering new {class_name} chain...")

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> Any:
        """Run when chain ends running."""
        self.threadedGntr.send("Finished chain")

    def on_chain_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> Any:
        """Run when chain errors."""
        pass

    def on_tool_start(
        self, serialized: Dict[str, Any], input_str: str, **kwargs: Any
    ) -> Any:
        """Run when tool starts running."""
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
        # print(output)
        self.threadedGntr.send(observation_prefix)
        self.threadedGntr.send(output)
        self.threadedGntr.send(llm_prefix)

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
        self.threadedGntr(text)

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> Any:
        """Run on agent end."""
        self.threadedGntr.send(finish.log)
        