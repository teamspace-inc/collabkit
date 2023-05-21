from langchain import OpenAI, SQLDatabase, SQLDatabaseChain
from langchain.chat_models import ChatOpenAI
from langchain.prompts.prompt import PromptTemplate
from langchain import FewShotPromptTemplate



SPIDER_DATABASE_DIR = "spider"
EXAMPLES = [
    {
        'question': "List the states where both the secretary of 'Treasury' department and the secretary of 'Homeland Security' were born.",
        'query': "SELECT T3.born_state FROM department AS T1 JOIN management AS T2 ON T1.department_id  =  T2.department_id JOIN head AS T3 ON T2.head_id  =  T3.head_id WHERE T1.name  =  'Treasury' INTERSECT SELECT T3.born_state FROM department AS T1 JOIN management AS T2 ON T1.department_id  =  T2.department_id JOIN head AS T3 ON T2.head_id  =  T3.head_id WHERE T1.name  =  'Homeland Security'",
        'result': "[('California',)]",
        'answer': "The states where both the secretary of 'Treasury' department and the secretary of 'Homeland Security' were born are as follows:\n1. California"
    },
    {
        'question': "Show the status of the city that has hosted the greatest number of competitions.",
        'query': "SELECT T1.Status FROM city AS T1 JOIN farm_competition AS T2 ON T1.City_ID  =  T2.Host_city_ID GROUP BY T2.Host_city_ID, T1.Status ORDER BY COUNT(*) DESC LIMIT 1",
        'result': "[('Village',)]",
        'answer': "The status of the city that has hosted the greatest number of competitions are as follows:\n1. Village"
    },
    {
        'question': "What are the names and ids of stations that had more than 14 bikes available on average or were installed in December?",
        'query': "SELECT T1.name ,  T1.id FROM station AS T1 JOIN status AS T2 ON T1.id  =  T2.station_id GROUP BY T2.station_id HAVING avg(T2.bikes_available)  >  14 UNION SELECT name ,  id FROM station WHERE installation_date LIKE '12/%'",
        'result': "[('Castro Street and El Camino Real', 32), ('Civic Center BART (7th at Market)', 72), ('Market at Sansome', 77), ('San Antonio Shopping Center', 31), ('Santa Clara County Civic Center', 80)]",
        'answer': "The names and ids of stations that had more than 14 bikes available on average or were installed in December are as follows:\n1. Castro Street and El Camino Real - 32\n2. Civic Center BART (7th at Market) - 72\n3. Market at Sansome - 77\n4. San Antonio Shopping Center - 31\n5. Santa Clara County Civic Center - 80"
    },
    {
        'question': "What is the mean longitude for all stations that have never had more than 10 bikes available?",
        'query': "SELECT avg(long) FROM station WHERE id NOT IN (SELECT station_id FROM status GROUP BY station_id HAVING max(bikes_available)  >  10)",
        'result': "[(-122.16748623913045,)]",
        'answer': "The mean longitude for all stations that have never had more than 10 bikes available are as follows:\n1. -122.16748623913045"
    },
]
EXAMPLE_TEMPLATE = """
Question: {question}
SQLQuery: {query}
SQLResult: {result}
Answer: {answer}
"""
prefix = """Given an input question, first create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.
Use the following format:

Question: Question here
SQLQuery: SQL Query to run
SQLResult: "Result of the SQLQuery"
Answer: "Final answer here"

Only use the following tables:

{table_info}

"""
suffix = """
Question: {input}
SQLQuery:"""



class SQLDBChainFewShot:
    def __init__(self, db_id, key):
        self.llm = ChatOpenAI(
            model_name="gpt-4",
            openai_api_key=key,
            temperature=0
        )
        example_prompt = PromptTemplate(
            input_variables=["question", "query", "result", "answer"],
            template=EXAMPLE_TEMPLATE
        )
        few_shot_prompt_template = FewShotPromptTemplate(
            examples=EXAMPLES,
            example_prompt=example_prompt,
            prefix=prefix,
            suffix=suffix,
            input_variables=["input", "table_info", "dialect"],
            example_separator="\n\n"
        )
        self.db = SQLDatabase.from_uri(
            "sqlite:///" + SPIDER_DATABASE_DIR + '/database/' + db_id + "/" + db_id + ".sqlite")
        self.db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, prompt=few_shot_prompt_template, verbose=False)
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

class SQLDBChainFewShotWithRows:
    def __init__(self, db_id, key):
        self.llm = ChatOpenAI(
            model_name="gpt-4",
            openai_api_key=key,
            temperature=0
        )
        example_prompt = PromptTemplate(
            input_variables=["question", "query", "result", "answer"],
            template=EXAMPLE_TEMPLATE
        )
        few_shot_prompt_template = FewShotPromptTemplate(
            examples=EXAMPLES,
            example_prompt=example_prompt,
            prefix=prefix,
            suffix=suffix,
            input_variables=["input", "table_info", "dialect"],
            example_separator="\n\n"
        )
        self.db = SQLDatabase.from_uri(
            "sqlite:///" + SPIDER_DATABASE_DIR + '/database/' + db_id + "/" + db_id + ".sqlite",
            sample_rows_in_table_info=2)
        self.db_chain = SQLDatabaseChain.from_llm(self.llm, self.db, prompt=few_shot_prompt_template, verbose=False)
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
