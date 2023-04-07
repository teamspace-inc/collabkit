from flask import escape
from sqlalchemy import *
from sqlalchemy.engine import create_engine
from sqlalchemy.schema import *
from langchain.agents import create_sql_agent
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.agents import AgentExecutor
import json
import functions_framework
import os

@functions_framework.http
def runSQLAgent(request):
    
  request_args = request.args
  query = request_args['query']
  query = escape(query)

  uri = "bigquery://bigquerysandboxproject-382616/covid19_nyt"

  credentials_info = {
      "type": "service_account",
      "project_id": "bigquerysandboxproject-382616"
  }
  engine = create_engine(uri, credentials_info=json.loads(os.environ["BQ_API_KEY"]))
  db = SQLDatabase(engine)
  toolkit = SQLDatabaseToolkit(db=db)
  agent_executor = create_sql_agent(
      llm=OpenAI(temperature=0),
      toolkit=toolkit,
      verbose=True
  )
  agentResponse = agent_executor.run(query)
  return {"response":agentResponse}