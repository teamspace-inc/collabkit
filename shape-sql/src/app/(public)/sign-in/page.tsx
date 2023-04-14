'use client';
import { SignIn } from '@clerk/nextjs';
import styles from './page.module.css';

const SignInPage = () => (
  <div className={styles.main}>
    <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
