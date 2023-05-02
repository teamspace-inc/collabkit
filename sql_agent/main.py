""" Styleguide: https://google.github.io/styleguide/pyguide.html """

import functions_framework
import json
import os
import threading
from typing import Callable
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
from decouple import config
from slack_data import SlackData
from snowflake.sqlalchemy import URL
from database_factory import *

def agent_thread(threadedGntr: ThreadedGenerator, query: str, shapeAnalytics: ShapeAnalytics, slackData: SlackData):
    try:
        db = DatabaseFactory.create_database()
        
        os.environ["OPENAI_API_KEY"] = config("OPENAI_API_KEY")
        llm = OpenAI(temperature=0, model_name="gpt-4")
        toolkit = SQLDatabaseToolkit(db=db, 
                                    llm=llm) 

        agent_executor = create_shape_sql_agent(
            llm=llm, 
            toolkit=toolkit,
            callback_manager = CallbackManager([ShapeSQLCallbackHandler(threadedGntr,shapeAnalytics,slackData), StdOutCallbackHandler()]),
            verbose=True,
            max_execution_time=240,
            streaming=True
            )
        agent_executor.run(query) 
    finally:
        shapeAnalytics.track('agent_thread Completed', {
            'Query':query
        })
        threadedGntr.close()

def sqlChain(query: str, username: str) -> ThreadedGenerator:
    mp = Mixpanel(config("SHAPE_API_KEY"))
    shapeAnalytics = ShapeAnalytics(mp, username)
    shapeAnalytics.track('sqlChain Invoked',{
        'Query':query
    })
    threadedGntr = ThreadedGenerator()
    threading.Thread(target=agent_thread, args=(threadedGntr, query, shapeAnalytics, None)).start()
    return threadedGntr

def slackSqlChain(query: str, username: str, sendMessage: Callable, threadTs: str) -> ThreadedGenerator:
    mp = Mixpanel(config("SHAPE_API_KEY"))
    shapeAnalytics = ShapeAnalytics(mp, username)
    shapeAnalytics.track('slackSqlChain Invoked',{
        'Query':query
    })
    threadedGntr = ThreadedGenerator()
    slackData = SlackData(username, sendMessage, threadTs)
    threading.Thread(target=agent_thread, args=(threadedGntr, query, shapeAnalytics, slackData)).start()
    slackData.send("ok, this'll take me about 1 or 2 minutes to figure out")
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
    
    return Response(response=sqlChain(query, "HTTP call"), headers=headers)
