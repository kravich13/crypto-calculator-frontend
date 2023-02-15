import { setupStore } from '@cc/shared/lib/store';
import { Provider } from 'react-redux';

interface IReduxProviderProps {
  children: React.ReactNode;
}

const store = setupStore();

export const ReduxProvider: React.FC<IReduxProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
