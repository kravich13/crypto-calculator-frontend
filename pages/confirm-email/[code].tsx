import { NotAuthPage, PageLayout } from '@cc/app/components';
import { useEmailValidateMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import { useAuthContext, useErrorMessage } from '@cc/shared/lib';
import { LayoutContent } from '@cc/shared/ui';
import { Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface IRouterQuery {
  code?: string;
  email?: string;
}

const ConfirmEmail = () => {
  const { login } = useAuthContext();

  const query = useRouter().query as IRouterQuery;
  const [emailValidate, { data, error }] = useEmailValidateMutation();

  const emailValidateError = useErrorMessage(error);

  const errorMessage = emailValidateError.message.includes('Code lifetime expired')
    ? 'Code lifetime expired.'
    : '';

  const forUserText = Boolean(errorMessage) ? 'Login again' : 'Please try again later';

  useEffect(() => {
    if (query.code && query.email) {
      emailValidate({ code: query.code, email: query.email });
    }
  }, []);

  useEffect(() => {
    if (data && query.email) {
      login({
        tokensData: data,
        userData: { email: query.email },
        notifyUser: true,
        redirectTo: RoutesTypes.MAIN,
      });
    }
  }, [data, query?.email]);

  return (
    <NotAuthPage>
      <PageLayout centerContent>
        <Head>
          <title>Confirm email | Crypto Metrics</title>
          <meta
            name="description"
            content="Enter the code from the letter to enter Crypto Metrics."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        {Boolean(errorMessage) && (
          <LayoutContent isCenterPosition containerStyles={{ maxWidth: 'xs' }}>
            <Typography variant="h6" component="h1" color="red" fontWeight="600">
              An error has occurred
            </Typography>

            {Boolean(errorMessage) && (
              <Typography sx={{ mt: 2 }}>Reason: {errorMessage}</Typography>
            )}

            <Typography sx={{ mt: 2 }}>{forUserText}</Typography>
          </LayoutContent>
        )}
      </PageLayout>
    </NotAuthPage>
  );
};

export default ConfirmEmail;
