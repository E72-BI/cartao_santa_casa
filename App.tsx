
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole, AuthState } from './types';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const saved = localStorage.getItem('santa_casa_auth');
    return saved ? JSON.parse(saved) : { isLoggedIn: false, role: null, currentUser: null };
  });

  const [dbUsers, setDbUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('santa_casa_users');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        name: 'EUDES CAVALCANTE',
        email: 'eudes@exemplo.com',
        cpf: '000.000.000-00',
        cardType: 'Diamante',
        expiryDate: '12/2030',
        birthDate: '16/12/1975',
        status: 'Ativo',
        isValidated: true,
        password: '123'
      },
      {
        id: 'admin',
        name: 'Administrador Santa Casa',
        email: 'admin@santacasa.com',
        cpf: '000.000.000-00',
        cardType: 'Diamante',
        expiryDate: '12/2030',
        birthDate: '01/01/1980',
        status: 'Ativo',
        isValidated: true,
        password: 'admin'
      }
    ];
  });

  const [appImages, setAppImages] = useState<string[]>(() => {
    const saved = localStorage.getItem('santa_casa_assets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('santa_casa_auth', JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem('santa_casa_users', JSON.stringify(dbUsers));
  }, [dbUsers]);

  useEffect(() => {
    localStorage.setItem('santa_casa_assets', JSON.stringify(appImages));
  }, [appImages]);

  const handleLogin = (user: User) => {
    const role = user.email.includes('admin@') ? UserRole.ADMIN : UserRole.USER;
    setAuth({ isLoggedIn: true, role, currentUser: user });
  };

  const handleRegister = (newUser: User) => {
    setDbUsers(prev => [...prev, newUser]);
  };

  const handleUpdatePassword = (email: string, password: string) => {
    setDbUsers(prev => prev.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, password } : u));
  };

  const handleValidateEmail = (email: string) => {
    setDbUsers(prev => prev.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, isValidated: true } : u));
  };

  const handleLogout = () => {
    setAuth({ isLoggedIn: false, role: null, currentUser: null });
  };

  const updateUsers = (newUsers: User[]) => {
    setDbUsers(prev => [...prev, ...newUsers]);
  };

  const handleEditUser = (updatedUser: User) => {
    setDbUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (auth.currentUser && auth.currentUser.id === updatedUser.id) {
      setAuth(prev => ({ ...prev, currentUser: updatedUser }));
    }
  };

  const deleteUser = (id: string) => {
    setDbUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {auth.isLoggedIn && (
          <Navbar 
            role={auth.role} 
            userName={auth.currentUser?.name} 
            onLogout={handleLogout} 
          />
        )}
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/login" 
              element={
                !auth.isLoggedIn ? (
                  <Login 
                    users={dbUsers} 
                    onLogin={handleLogin} 
                    onRegister={handleRegister} 
                    onUpdatePassword={handleUpdatePassword}
                    onValidateEmail={handleValidateEmail}
                  />
                ) : (
                  <Navigate to="/" />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                auth.isLoggedIn ? (
                  auth.role === UserRole.ADMIN ? (
                    <AdminDashboard 
                      users={dbUsers} 
                      onUpdateUsers={updateUsers} 
                      onDeleteUser={deleteUser} 
                      onEditUser={handleEditUser}
                      appImages={appImages}
                      onUpdateImages={setAppImages}
                    />
                  ) : (
                    <Dashboard user={auth.currentUser!} appImages={appImages} />
                  )
                ) : (
                  <Navigate to="/login" />
                )
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
