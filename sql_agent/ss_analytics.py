from mixpanel import Mixpanel

class ShapeAnalytics:
  def __init__(self, mixpanel: Mixpanel, distinctId: str):
    self.mixpanel = mixpanel
    self.distinctId = distinctId
    
  def track(self, event_name: str, properties=None, meta=None):
    self.mixpanel.track(self.distinctId, event_name, properties, meta)