import { store } from '../store';

// reads user details from url params and sets them in the store
// used by e2e tests to bypass google authentication as it's not
// easy to automate using playwright
// export function useUserParams() {
//   const urlSearchParams = new URLSearchParams(window.location.search);
//   const params = Object.fromEntries(urlSearchParams.entries());
//   if (params.userId && params.userName && params.userEmail) {
//     store.user = {
//       id: params.userId,
//       name: params.userName,
//       email: params.userEmail,
//       avatar: params.userAvatar ?? null,
//     };
//   }
// }
