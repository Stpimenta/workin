import { StyleSheet } from 'react-native';

import {AuthProvider} from './context/AuthContext'
import {SignInProvider} from './context/SignInContext';
import { WorkerProvider } from './context/WorkerContext';
import { SignInWorkerProvider } from './context/SignInWorkerContext';

import Routes from './routes/index'

export default function App() {

  return (
    <AuthProvider>
      <SignInWorkerProvider>
        <SignInProvider>
          <WorkerProvider>
            <Routes/>
          </WorkerProvider>
        </SignInProvider>
      </SignInWorkerProvider>
    </AuthProvider>
  );
}