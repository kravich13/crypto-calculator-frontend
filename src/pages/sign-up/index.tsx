import { SignUpForm } from '@cc/widgets';
import Head from 'next/head';

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Calculator | Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignUpForm />
    </>
  );
}
