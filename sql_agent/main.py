""" Styleguide: https://google.github.io/styleguide/pyguide.html """
import functions_framework
import threading
from typing import Callable
from flask import Response
from flask import escape
from langchain.callbacks.base import CallbackManager
from langchain.callbacks.stdout import StdOutCallbackHandler
from shape_sql_callback import ShapeSQLCallbackHandler
from shape_sql_callback import create_shape_sql_agent
from sqlalchemy import *
from sqlalchemy.schema import *
from threaded_generator import ThreadedGenerator
from shape_analytics import ShapeAnalytics
from slack_data import SlackData
from snowflake.sqlalchemy import URL


def agent_thread(
    threadedGntr: ThreadedGenerator,
    query: str,
    shapeAnalytics: ShapeAnalytics,
    slackData: SlackData,
):
    try:
        agent_executor = create_shape_sql_agent(
            callback_manager=CallbackManager(
                [
                    ShapeSQLCallbackHandler(threadedGntr, shapeAnalytics, slackData),
                    StdOutCallbackHandler(),
                ]
            ),
        )
        agent_executor.run(query)
    finally:
        shapeAnalytics.track("agent_thread Completed", {"Query": query})
        threadedGntr.close()


def sqlChain(query: str, username: str) -> ThreadedGenerator:
    shapeAnalytics = ShapeAnalytics(username)
    shapeAnalytics.track("sqlChain Invoked", {"Query": query})
    threadedGntr = ThreadedGenerator()
    threading.Thread(
        target=agent_thread, args=(threadedGntr, query, shapeAnalytics, None)
    ).start()
    return threadedGntr


def slackSqlChain(
    query: str, username: str, sendMessage: Callable, threadTs: str
) -> ThreadedGenerator:
    shapeAnalytics = ShapeAnalytics(username)
    shapeAnalytics.track("slackSqlChain Invoked", {"Query": query})
    threadedGntr = ThreadedGenerator()
    slackData = SlackData(username, sendMessage, threadTs)
    threading.Thread(
        target=agent_thread, args=(threadedGntr, query, shapeAnalytics, slackData)
    ).start()
    slackData.send("ok, this'll take me about 1 or 2 minutes to figure out")
    return threadedGntr


@functions_framework.http
def runSQLAgent(request):
    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }
        return ("", 204, headers)
    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}
    request_args = request.args
    query = request_args["query"]
    if query:
        query = escape(query)
        return Response(response=sqlChain(query, "HTTP call"), headers=headers)
    else:
        return ("Please provide 'query' param", 400, headers)
