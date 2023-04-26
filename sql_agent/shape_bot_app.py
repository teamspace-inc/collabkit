import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from decouple import config
from main import slackSqlChain

app = App(token=config("SLACK_BOT_TOKEN"))

@app.event("app_mention")
def message_hello(event, say):
    user = app.client.users_profile_get(user=event['user'])
    slackSqlChain(event['text'], user['profile']['real_name'], say, event['ts'])

@app.event("message")
def message_hello(event, say):
    if(event['channel_type']== "im"):
        user = app.client.users_profile_get(user=event['user'])
        slackSqlChain(event['text'], user['profile']['real_name'], say, event['ts'])

if __name__ == "__main__":
    SocketModeHandler(app, config("SLACK_APP_TOKEN")).start()
