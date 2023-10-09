import { StyleSheet } from 'react-native';

import {AuthProvider} from './context/AuthContext'
import {SignInProvider} from './context/SignInContext';
import { WorkerProvider } from './context/WorkerContext';

import Routes from './routes/index'

export default function App() {

  return (
    <AuthProvider>
      <SignInProvider>
        <WorkerProvider>
          <Routes/>
        </WorkerProvider>
      </SignInProvider>
    </AuthProvider>
  );
}