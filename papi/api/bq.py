import os
os.environ["OPENAI_API_KEY"] = ""

from fastapi import FastAPI, Query
from sqlalchemy import *
from sqlalchemy.engine import create_engine
from sqlalchemy.schema import *
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents import AgentExecutor

app = FastAPI()

@app.get("/")
async def runSQLAgent(q: str = Query(None)):
  uri = "bigquery://bigquerysandboxproject-382616/covid19_nyt"

  credentials_info = {
      "type": "service_account",
      "project_id": "bigquerysandboxproject-382616"
  }

  engine = create_engine(uri, credentials_path='keyfile.json')
  db = SQLDatabase(engine)
  toolkit = SQLDatabaseToolkit(db=db)
  agent_executor = create_sql_agent(
      llm=OpenAI(temperature=0),
      toolkit=toolkit,
      verbose=True
  )
  agentResponse = agent_executor.run(q)
  return {"message": agentResponse}