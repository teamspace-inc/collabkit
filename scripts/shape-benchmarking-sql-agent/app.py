from flask import Flask, render_template

import json
import sqlite3
from langchain import SQLDatabase
from langchain.chat_models import ChatOpenAI
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.agents import create_sql_agent
from langchain.callbacks.base import CallbackManager, BaseCallbackHandler
import pandas as pd

import json

app = Flask(__name__)

# def agent_thread(query: str):
#     try:
#         engine = create_engine("bigquery://", credentials_info=json.loads(config("BQ_API_KEY")))
#         db = SQLDatabase(engine)
#         toolkit = SQLDatabaseToolkit(db=db)
#         os.environ["OPENAI_API_KEY"] = config("OPENAI_API_KEY")
#         agent_executor = create_shape_sql_agent(
#             llm=OpenAI(temperature=0,
#             model_name="gpt-4"),
#             toolkit=toolkit,
#             callback_manager = CallbackManager([ShapeSQLCallbackHandler(threadedGntr,shapeAnalytics,slackData), StdOutCallbackHandler()]),
#             verbose=True,
#             max_execution_time=240,
#             streaming=True
#             )
#         agent_executor.run(query)
#     finally:
#         shapeAnalytics.track('agent_thread Completed', {
#             'Query':query
#         })
#         threadedGntr.close()

with open("train_spider.json", "r") as f:
    train_spider = json.load(f)


@app.route("/")
def index():
    train_spider_json = json.dumps(train_spider)
    return render_template("home.html", train_spider_json=train_spider_json)


if __name__ == "__main__":
    app.run()
