from langchain import OpenAI, SQLDatabase, SQLDatabaseChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate


SPIDER_DATABASE_DIR = "spider"

class SQLDBChain:
    def __init__(self, db_id, key):
        self.llm = ChatOpenAI(
            model_name="gpt-4",
            openai_api_key=key,
            temperature=0
        )
        _DEFAULT_TEMPLATE = """Given an input question, first create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.
        Use the following format:

        Question: "Question here"
        SQLQuery: SQL Query to run
        SQLResult: "Result of the SQLQuery"
        Answer: "Final answer here"

        Only use the following tables:

        {table_info}

        Question: {input}"""
        PROMPT = PromptTemplate(
            input_variables=["input", "table_info", "dialect"], template=_DEFAULT_TEMPLATE
        )
        self.db = SQLDatabase.from_uri(
            "sqlite:///" + SPIDER_DATABASE_DIR + '/database/' + db_id + "/" + db_id + ".sqlite")
        self.db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, prompt=PROMPT, verbose=False)
        self.db_chain.return_intermediate_steps = True

    def get_chain(self):
        return self.db_chain

    def get_SQL_query(self,response):
        predicted_SQL = None
        for step in response["intermediate_steps"]:
            if 'SELECT' in step:
                predicted_SQL = step
        if predicted_SQL is None:
            predicted_SQL = "NO SQL found"
        predicted_SQL = predicted_SQL.replace("\n"," ")
        return predicted_SQL

class SQLDBChainWithRows:
    def __init__(self, db_id, key):
        self.llm = ChatOpenAI(
            model_name="gpt-4",
            openai_api_key=key,
            temperature=0
        )
        _DEFAULT_TEMPLATE = """Given an input question, first create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.
        Use the following format:

        Question: "Question here"
        SQLQuery: SQL Query to run
        SQLResult: "Result of the SQLQuery"
        Answer: "Final answer here"

        Only use the following tables:

        {table_info}

        Question: {input}"""
        PROMPT = PromptTemplate(
            input_variables=["input", "table_info", "dialect"], template=_DEFAULT_TEMPLATE
        )
        self.db = SQLDatabase.from_uri(
            "sqlite:///" + SPIDER_DATABASE_DIR + '/database/' + db_id + "/" + db_id + ".sqlite",
            sample_rows_in_table_info=2)
        self.db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, prompt=PROMPT, verbose=False)
        self.db_chain.return_intermediate_steps = True

    def get_chain(self):
        return self.db_chain

    def get_SQL_query(self,response):
        predicted_SQL = None
        for step in response["intermediate_steps"]:
            if 'SELECT' in step:
                predicted_SQL = step
        if predicted_SQL is None:
            predicted_SQL = "NO SQL found"
        predicted_SQL = predicted_SQL.replace("\n"," ")
        return predicted_SQL