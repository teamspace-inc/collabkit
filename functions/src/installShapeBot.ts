import * as functions from 'firebase-functions';
import axios from 'axios';
import FormData from 'form-data';

export async function installShapeBotImpl(
  request: functions.https.Request,
  response: functions.Response
) {
  const code = request.query.code;
  const userId = request.query.state;
  let data = new FormData();
  data.append('code', code);
  data.append('client_id', '3913993031188.5124245352709');
  data.append('client_secret', process.env.SLACK_CLIENT_SECRET);
  data.append('redirect_uri', 'https://us-central1-collabkit-test.cloudfunctions.net/installShapeBot');

  let config = {
    method: 'post',
    url: 'https://slack.com/api/oauth.v2.access',
    headers: {
      ...data.getHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      axios.post('https://api.clerk.com/v1/organizations', {
        name: res.data.team.name,
        created_by: userId,
        public_metadata: { botToken: res.data.access_token, id: res.data.team.id },
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        }
      }).then((res) => {
        response.redirect(`https://dashboard.shape.xyz/setup`);
      }).catch((error) => {
        response.status(500).send();
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export const installShapeBot = functions.https.onRequest(async (request, response) => {
  installShapeBotImpl(request, response);
});
