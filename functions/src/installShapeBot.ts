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
  data.append('client_secret', '1a135a7c0dbd8026ebb5f68380fb657f');

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
      console.log('access token: ' + res.data.access_token);
      console.log('team id: ' + res.data.team.id);
      axios.post('https://api.clerk.com/v1/organizations', {
        name: res.data.team.name,
        created_by: userId,
        public_metadata: { botToken: res.data.access_token, id: res.data.team.id },
      }, {
        headers: {
          'Authorization': `Bearer sk_test_MCqEnnuR8Xt4uYXZhFqknfxX0TnFdH4symiqGOaUtY`,
        }
      }).then((res) => {
        response.status(200).send(); // redirect back to dashboard url here
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
