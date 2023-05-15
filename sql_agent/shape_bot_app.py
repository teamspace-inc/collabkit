""" Styleguide: https://google.github.io/styleguide/pyguide.html """
import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from slack_bolt.context.say import Say
from decouple import config
from main import slackSqlChain
from typing import Dict, Any
import logging

# logging.basicConfig(level=logging.DEBUG)

app = App(token=config("SLACK_BOT_TOKEN"))


@app.event("app_mention")
def message_hello(event: Dict[str, Any], say: Say):
    user = app.client.users_profile_get(user=event["user"])

    thread_ts = event.get("thread_ts", None)
    slackSqlChain(
        query=event["text"],
        username=user["profile"]["real_name"],
        sendMessage=say,
        thread_ts=thread_ts if thread_ts else event["ts"],
        channel=event["channel"],
    )


@app.event("message")
def message_hello(event: Dict[str, Any], say: Say):
    if event["channel_type"] == "im":
        user = app.client.users_profile_get(user=event["user"])
        thread_ts = event.get("thread_ts", None)
        slackSqlChain(
            query=event["text"],
            username=user["profile"]["real_name"],
            sendMessage=say,
            thread_ts=thread_ts if thread_ts else event["ts"],
            channel=event["channel"],
        )


if __name__ == "__main__":
    SocketModeHandler(app, config("SLACK_APP_TOKEN")).start()
