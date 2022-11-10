import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Header, store } from '../home/Header';
import { SmallHeader } from '../home/small/SmallHeader';
import { useHeaderStyle } from '../hooks/useHeaderStyle';
import { useIsSmallScreen } from '../hooks/useIsSmallScreen';
import { light, vars } from '../styles/Theme.css';
import { button, website } from '../styles/Website.css';
import { push, getDatabase, ref } from 'firebase/database';
import { getApp } from 'firebase/app';

async function signup(params: { email: string }) {
  await push(ref(getDatabase(getApp('CollabKit')), '/website/signups'), {
    email: params.email,
  });
}

const SIGNUP_ERROR_MESSAGE =
  'Something went wrong. Please email us at namit@collabkit.dev and we can sort it out.';

export function GetStartedPage() {
  useEffect(() => {
    store.backgroundColor = vars.color.ice;
    store.theme = 'light';
  }, []);

  const { ref } = useHeaderStyle({ backgroundColor: vars.color.ice, theme: 'light' });

  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

  useEffect(() => {
    store.backgroundColor = vars.color.ice;
  }, []);

  const isSmallScreen = useIsSmallScreen();

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (emailRef.current) {
      const email = emailRef.current.value;
      emailRef.current.value = '';
      signup({ email }).then(
        () => {
          console.log('signup success');
          setSignupSuccess(true);
        },
        (e) => {
          console.log('signup fail', e);
          setErrorMessage(SIGNUP_ERROR_MESSAGE);
        }
      );
    }
  }, []);

  return (
    <div className={`${website} ${light}`}>
      {isSmallScreen ? <SmallHeader /> : <Header />}
      <section ref={ref} style={{ padding: '0px 40px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '40px',
            height: '100vh',
            backgroundColor: vars.color.ice,
            width: '100vw',
          }}
        >
          <h1>Enter your email</h1>
          <h3>
            We'll send you your API keys in
            <br /> a few hours
          </h3>
          <form
            onSubmit={onSubmit}
            style={{
              display: 'flex',
              gap: '20px',
              padding: '20px',
              width: isSmallScreen ? '100%' : 'unset',
              flexDirection: isSmallScreen ? 'column' : 'row',
            }}
          >
            <input
              ref={emailRef}
              type="email"
              placeholder="name@work-email.com"
              style={{
                border: '1px solid #BBBBBB',
                borderRadius: 100,
                height: 50,
                width: isSmallScreen ? 'auto' : 300,
                padding: 16,
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: 16,
                lineHeight: '110%',
              }}
            />
            <button className={button({ size: 'large', type: 'primary' })}>Continue</button>
          </form>
          {errorMessage}
          {signupSuccess && (
            <>
              Thanks for signing up! You should receive the API keys in a few hours.
              <a
                href="https://calendly.com/namit-chadha/30min?month=2022-07"
                target="_blank"
                style={{
                  color: vars.color.blue,
                }}
              >
                Book a time a for a demo and onboarding with us.
              </a>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
