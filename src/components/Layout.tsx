import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminLayout from './admin/AdminLayout';
import EmployeeLayout from './employee/EmployeeLayout';

const Layout: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return user.role === 'admin' ? <AdminLayout /> : <EmployeeLayout />;
};

export default Layout;