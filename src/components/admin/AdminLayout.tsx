import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  DollarSign, 
  BarChart3, 
  MessageSquare, 
  Settings,
  LogOut,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import EmployeeManagement from './EmployeeManagement';
import AttendanceControl from './AttendanceControl';
import PayrollManagement from './PayrollManagement';
import Reports from './Reports';
import Messaging from './Messaging';
import CompanySettings from './CompanySettings';

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Employees', icon: Users, id: 'employees' },
  { name: 'Attendance', icon: Clock, id: 'attendance' },
  { name: 'Payroll', icon: DollarSign, id: 'payroll' },
  { name: 'Reports', icon: BarChart3, id: 'reports' },
  { name: 'Messages', icon: MessageSquare, id: 'messages' },
  { name: 'Settings', icon: Settings, id: 'settings' },
];

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboard />;
      case 'employees': return <EmployeeManagement />;
      case 'attendance': return <AttendanceControl />;
      case 'payroll': return <PayrollManagement />;
      case 'reports': return <Reports />;
      case 'messages': return <Messaging />;
      case 'settings': return <CompanySettings />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <Building2 className="h-8 w-8 text-white mr-2" />
          <span className="text-white text-xl font-bold">TimeTracker</span>
        </div>
        
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-100 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-700'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.name}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t">
          <div className="flex items-center mb-3">
            <img 
              src={user?.profilePhoto || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'} 
              alt="Profile" 
              className="h-10 w-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;