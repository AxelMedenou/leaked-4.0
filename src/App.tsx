import React, { useState } from 'react';
import PasswordScreen from './components/PasswordScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <PasswordScreen onAuthenticate={handleAuthenticate} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;