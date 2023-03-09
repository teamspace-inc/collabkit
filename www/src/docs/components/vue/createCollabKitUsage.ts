import { createApp } from 'vue';
import { createCollabKit } from '@collabkit/vue';
import App from './App.vue';

const app = createApp(App);
const collabkit = createCollabKit({
  appId: import.meta.env.VITE_COLLABKIT_APP_ID,
  apiKey: import.meta.env.VITE_COLLABKIT_API_KEY,
  workspace: {
    id: 'acme',
    name: 'ACME Corporation',
  },
  user: {
    id: 'jane',
    name: 'Jane Doe',
    email: 'jane@example.com',
  },
  mentionableUsers: 'allWorkspace',
});

app.use(collabkit);

app.mount('#app');
