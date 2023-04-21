import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from decouple import config
from main import slackSqlChain

app = App(token=config("SLACK_BOT_TOKEN"))
final_answer_label = "Final Answer:"

@app.message()
def message_hello(message, say):
    slackSqlChain(message['text'], message['user'], say, message['ts'])

if __name__ == "__main__":
    SocketModeHandler(app, config("SLACK_APP_TOKEN")).start()
