import { FC, useLayoutEffect } from 'react';

interface IPageTitleProps {
  Component: FC;
  title: string;
}

export const PageTitle: FC<IPageTitleProps> = ({ title, Component }) => {
  useLayoutEffect(() => {
    const prevTitle = document.title;

    document.title = title;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);

  return <Component />;
};
