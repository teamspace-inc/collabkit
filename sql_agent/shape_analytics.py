from mixpanel import Mixpanel
from decouple import config

class ShapeAnalytics:

  def __init__(self, distinctId: str):
    shape_analytics_api_key = config("SHAPE_API_KEY", default=None)
    # If customer has not opted into analytics via shape analytics api key, don't initialize Mixpanel
    self.mixpanel = None if shape_analytics_api_key is None else Mixpanel(shape_analytics_api_key)
    self.distinctId = distinctId

  def track(self, event_name: str, properties=None, meta=None) -> None:
    if self.mixpanel is None:
      return
    self.mixpanel.track(self.distinctId, event_name, properties, meta)