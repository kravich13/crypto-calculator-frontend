import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from '../components/header/Header';
import { LogInPage } from '../pages/logIn/LoginPage';
import { MainPage } from '../pages/main/MainPage';
import { NotFoundPage } from '../pages/notFound/NotFoundPage';
import { SignUpPage } from '../pages/signUp/SignUpPage';
import { PageTitle } from './PageTitle';

export const RootNavigator: React.FC = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<PageTitle Component={MainPage} title="Calculator | Crypto Calculator | Demo" />}
        />
        <Route
          path="/login"
          element={<PageTitle Component={LogInPage} title="Calculator | Log in" />}
        />
        <Route
          path="/sign-up"
          element={<PageTitle Component={SignUpPage} title="Calculator | Sign up" />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
