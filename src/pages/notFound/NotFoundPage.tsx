import React, { useEffect } from 'react';
import { useTypedNavigate } from '../../hooks';
import { RoutesTypes } from '../../navigation';

const NotFoundPage: React.FC = () => {
  const navigate = useTypedNavigate();

  useEffect(() => {
    navigate(RoutesTypes.MAIN);
  }, [navigate]);

  return null;
};

export default NotFoundPage;
