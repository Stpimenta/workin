import { StyleSheet } from 'react-native';

import {SignInProvider} from './context/SignInContext';

import {AuthProvider} from './context/AuthContext'

import Routes from './routes/index'

export default function App() {
  return (
    <AuthProvider>
      <SignInProvider>
        <Routes/>
      </SignInProvider>
    </AuthProvider>
  );
}