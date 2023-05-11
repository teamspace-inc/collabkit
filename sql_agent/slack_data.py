from slack_bolt.context.say import Say


class SlackData:
    def __init__(self, username: str, sendMessage: Say, thread_ts: str, channel: str):
        self.username = username
        self.sendMessage = sendMessage
        self.thread_ts = thread_ts
        self.channel = channel

    def send(self, message: str) -> None:
        self.sendMessage(text=message, thread_ts=self.thread_ts)
