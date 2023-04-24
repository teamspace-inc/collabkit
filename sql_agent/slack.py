class SlackData:
  def __init__(self, username: str, sendMessage, threadTs: str):
    self.username = username
    self.sendMessage = sendMessage
    self.threadTs = threadTs
  
  def send(self, message: str):
    self.sendMessage(message, thread_ts = self.threadTs)