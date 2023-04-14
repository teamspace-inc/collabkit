import os
from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler
import requests
import re
from decouple import config
import json

app = App(token=config("SLACK_BOT_TOKEN"))
shape_url = config("SHAPE_URL")
final_answer_label = "Final Answer:"

@app.message()
def message_hello(message, say):

    thread_ts=message['ts']
    r = requests.get(shape_url,params={"query":message['text']}, stream=True)
    for line in r.iter_lines(delimiter=b'}'):
      
      if line:
        decoded_line = line.decode('utf-8')
        if(decoded_line.find("on_agent_action") != -1):
          decoded_line += "}}"
          data = json.loads(decoded_line)
          message = data.get("on_agent_action").get("log").split("\n")[0]
          if(message.find("Action:") == -1):
            say(message, thread_ts=thread_ts)
        else:
          decoded_line += "}"

        if(decoded_line.find(final_answer_label) != -1):
          decoded_line += "}}"
          data = json.loads(decoded_line)
          message = data.get("on_agent_finish").get("log").split(final_answer_label)[1]
          say(message, thread_ts=thread_ts, reply_broadcast=True)        

if __name__ == "__main__":
    SocketModeHandler(app, config("SLACK_APP_TOKEN")).start()
