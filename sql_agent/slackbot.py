import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
from decouple import config
import json
from main import sqlChain

app = App(token=config("SLACK_BOT_TOKEN"))
final_answer_label = "Final Answer:"

@app.message()
def message_hello(message, say):
    thread_ts=message['ts']
    # sqlChain(message['text']) // call sql agent here
    say("test", reply_broadcast=True)        

if __name__ == "__main__":
    SocketModeHandler(app, config("SLACK_APP_TOKEN")).start()
