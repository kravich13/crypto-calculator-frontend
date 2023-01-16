import { AuthProvider } from './context';
import { RootNavigator } from './navigation';

export const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};
