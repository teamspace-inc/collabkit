import json
import sqlite3
from langchain import SQLDatabase
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_sql_agent
from langchain.callbacks.base import CallbackManager, BaseCallbackHandler
import pandas as pd

data = {
    "sp_question": [],
    "gp_query": [],
    "sp_query": [],
    "gp_data": [],
    "sp_data": [],
    "gp_output": [],
}
df = pd.DataFrame(data)


class BenchmarkCallbackHandler(BaseCallbackHandler):
    def __init__(self, query, index):
        super().__init__()
        self.query = query
        self.index = index

    def on_llm_start(self, serialized, prompts, **kwargs):
        # print("foo", prompts)
        pass
        # print(serialized)
        # print(prompts)

    def on_llm_new_token(self, token, **kwargs):
        pass
        # print(token)

    def on_llm_end(self, response, **kwargs):
        pass
        # print(response)

    def on_llm_error(self, error, **kwargs):
        pass
        # print(error)

    def on_chain_start(self, serialized, inputs, **kwargs):
        pass
        # print(serialized)
        # print(inputs)

    def on_chain_end(self, outputs, **kwargs):
        pass
        # print(outputs)

    def on_chain_error(self, error, **kwargs):
        pass
        # print(error)

    def on_tool_start(self, serialized, input_str, **kwargs):
        pass
        # print(serialized)
        # print(input_str)

    def on_tool_end(self, output, **kwargs):
        # print("Tool end", output)
        pass
        # print(output)

    def on_tool_error(self, error, **kwargs):
        pass
        # print(error)

    def on_text(self, text, **kwargs):
        pass
        # print(text)

    def on_agent_action(self, action, **kwargs):
        if action.tool == "query_checker_sql_db":
            # since we use index this always
            # saves the latest SQL query for the
            # current question
            df.loc[self.index] = [
                self.query["question"],
                action.tool_input,
                self.query["query"],
                None,
                None,
                None,
            ]
            pass
        pass
        # print(action)

    def on_agent_finish(self, finish, **kwargs):
        pass
        # print("finito")
        # print(finish)


def process_db(db_name, query, index):
    con = sqlite3.connect("database/{}/{}.sqlite".format(db_name, db_name))
    db = SQLDatabase.from_uri(
        "sqlite:///database/{}/{}.sqlite".format(db_name, db_name),
        sample_rows_in_table_info=2,
    )
    callback_manager = CallbackManager([BenchmarkCallbackHandler(query, index)])

    def runQueryGPT4(query):
        print("running query: ", query["question"])
        llm = ChatOpenAI(temperature=0, model_name="gpt-4")
        toolkit = SQLDatabaseToolkit(db=db)
        agent_executor = create_sql_agent(
            llm=llm, toolkit=toolkit, verbose=True, callback_manager=callback_manager
        )
        output = agent_executor(query["question"])
        print("output", output)
        return output

    cur = con.cursor()
    sp_data = cur.execute(query["query"]).fetchall().__str__()

    try:
        runQueryGPT4(query)
        df.loc[index, "sp_data"] = sp_data
        gp_data = cur.execute(df.loc[index]["gp_query"]).fetchall().__str__()
        df.loc[index, "gp_data"] = gp_data
        return 1
    except Exception as e:
        print(e)
        return 0


with open("train_spider.json", "r") as f:
    arr = json.load(f)

count = 0
executed = 0
errored = 0
checkpoint = 0
limit = 1000
for obj in arr:
    print("DB:", obj["db_id"])
    count += 1
    if count > limit:
        print("Limit reached")
        break
    if count > checkpoint:
        ans = process_db(obj["db_id"], obj, count)
        if ans == 1:
            executed += 1
        else:
            errored += 1
        print("Count:", count, "\n")
        print("Executed:", executed, "\nErrored:", errored, "\n")

df.to_csv("test_run.csv", index=False)
