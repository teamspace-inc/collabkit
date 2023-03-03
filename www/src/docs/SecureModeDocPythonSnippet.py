import jwt

token = jwt.encode({"userId": "<your user ID here>",
                    "workspaceId": "<your workspaceId here>"},
                   "<your api key here>",
                   algorithm="HS256")
