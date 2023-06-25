import { NotAuthPage, PageLayout } from '@cc/app/components';
import { useEmailValidateMutation } from '@cc/shared/api';
import { RoutesTypes } from '@cc/shared/enums';
import { useAuthContext, useErrorMessage } from '@cc/shared/lib';
import { LayoutContent } from '@cc/shared/ui';
import { Typography, useTheme } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface IRouterQuery {
  email?: string;
}

interface ICodeProps {
  code?: string;
}

const ConfirmEmail: NextPage<AppProps<ICodeProps>> = ({ pageProps }) => {
  const code = pageProps.code;

  const { login } = useAuthContext();
  const { palette } = useTheme();
  const { t } = useTranslation();

  const query = useRouter().query as IRouterQuery;
  const [emailValidate, { data, error }] = useEmailValidateMutation();

  const emailValidateError = useErrorMessage(error);

  const errorMessage = emailValidateError.message.includes('Code lifetime expired')
    ? t('cc.page.code.errorMessage')
    : '';

  const forUserText = Boolean(errorMessage)
    ? t('cc.page.code.userText.error')
    : t('cc.page.code.userText.notError');

  useEffect(() => {
    if (code && query.email) {
      emailValidate({ code, email: query.email });
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
  }, [data, query.email]);

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
            <Typography
              variant="h6"
              component="h1"
              fontWeight="600"
              style={{ color: palette.error.dark }}
            >
              {t('cc.page.code.title')}
            </Typography>

            {Boolean(errorMessage) && (
              <Typography sx={{ mt: 2 }}>
                {t('cc.page.code.reasonDescription')} {errorMessage}
              </Typography>
            )}

            <Typography sx={{ mt: 2 }}>{forUserText}</Typography>
          </LayoutContent>
        )}
      </PageLayout>
    </NotAuthPage>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  const code = params?.code;

  return {
    props: {
      code,
      ...(await serverSideTranslations(locale || 'en')),
    },
  };
};

export default ConfirmEmail;
