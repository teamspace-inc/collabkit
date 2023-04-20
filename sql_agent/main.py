import functions_framework
import json
import os
import threading
from flask import Flask, Response
from flask import escape
from langchain.agents import AgentExecutor
from langchain.agents.agent_toolkits import SQLDatabaseToolkit
from langchain.sql_database import SQLDatabase
from langchain.llms.openai import OpenAI
from langchain.callbacks.base import CallbackManager
from langchain.callbacks.stdout import StdOutCallbackHandler
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from mixpanel import Mixpanel
from shape_sql_callback import ShapeSQLCallbackHandler
from shape_sql_callback import create_shape_sql_agent
from sqlalchemy import *
from sqlalchemy.engine import create_engine
from sqlalchemy.schema import *
from threaded_generator import ThreadedGenerator
from typing import Any, Dict, List, Union
from ss_analytics import ShapeAnalytics


def agent_thread(threadedGntr: ThreadedGenerator, query: str, shapeAnalytics: ShapeAnalytics):
    try:
        engine = create_engine("bigquery://", credentials_info=json.loads(os.environ["BQ_API_KEY"]))
        db = SQLDatabase(engine)
        toolkit = SQLDatabaseToolkit(db=db)

        agent_executor = create_shape_sql_agent(
            llm=OpenAI(temperature=0, 
            model_name="gpt-4"),
            toolkit=toolkit,
            callback_manager = CallbackManager([ShapeSQLCallbackHandler(threadedGntr,shapeAnalytics), StdOutCallbackHandler()]),
            verbose=True,
            max_execution_time=240,
            streaming=True
            )
        agent_executor.run(query) 
    finally:
        shapeAnalytics.track('runSQLAgent Completed', {
            'Query':query
        })
        threadedGntr.close()

def sqlChain(query: str, shapeAnalytics: ShapeAnalytics) -> ThreadedGenerator:
    threadedGntr = ThreadedGenerator()
    threading.Thread(target=agent_thread, args=(threadedGntr, query, shapeAnalytics)).start()
    return threadedGntr

@functions_framework.http
def runSQLAgent(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }
        return ('', 204, headers)
    # Set CORS headers for the main request
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    request_args = request.args
    query = request_args['query']
    query = escape(query)
    
    distinctId = "Bob" # TODO: Get distinctId from request

    os.environ["SHAPE_API_KEY"]="7e221d1ec0008a63a3d805413e2011f1"
    mp = Mixpanel(os.environ["SS_API_KEY"])
    shapeAnalytics = ShapeAnalytics(mp, distinctId)    
    shapeAnalytics.track('runSQLAgent Invoked',{
        'Query':query
    })
    return Response(response=sqlChain(query, shapeAnalytics), headers=headers)
