import React, { useState } from 'react';
import { sendVerificationEmail } from './sendVerificationEmail';

export function SignIn() {
  const [email, setEmail] = useState(window.localStorage.getItem('emailForSignIn') || '');
  const [didSendEmail, setDidSendEmail] = useState(false);

  return (
    <div>
      <h1>Sign in to Collabkit</h1>
      <input
        type="email"
        onChange={(e) => {
          setEmail(e.target.value);
          setDidSendEmail(false);
        }}
        value={email}
      />
      <button onClick={async () => setDidSendEmail(await sendVerificationEmail(email))}>
        Submit
      </button>
      {didSendEmail && 'Check your email'}
    </div>
  );
}
