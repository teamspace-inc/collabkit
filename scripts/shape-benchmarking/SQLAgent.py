from langchain.sql_database import SQLDatabase
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.chat_models import ChatOpenAI

SPIDER_DATABASE_DIR = "spider"


class SQLDBAgent:
    def __init__(self, db_id, key):
        self.llm = ChatOpenAI(
            model_name="gpt-4",
            openai_api_key=key,
            temperature=0
        )
        self.db = SQLDatabase.from_uri(
            "sqlite:///" + SPIDER_DATABASE_DIR + '/database/' + db_id + "/" + db_id + ".sqlite")
        self.toolkit = SQLDatabaseToolkit(db=self.db, llm=self.llm)
        self.agent_executor = create_sql_agent(
            llm=self.llm,
            toolkit=self.toolkit,
            verbose=False,
        )
        self.agent_executor.return_intermediate_steps = True

    def get_SQL_query(self,response):
        for agent_action in response["intermediate_steps"]:
            if agent_action[0][0] == 'query_sql_db':
                predicted_SQL = agent_action[0][1]
            else:
                predicted_SQL = "NO SQL detected"
        return predicted_SQL

    def get_agent(self):
        return self.agent_executor
