import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return <Layout />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;