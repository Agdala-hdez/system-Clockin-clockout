import React, { useState } from 'react';
import { Clock, User, MessageSquare, BarChart3, LogOut, Building2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ClockInOut from './ClockInOut';
import EmployeeProfile from './EmployeeProfile';
import EmployeeMessages from './EmployeeMessages';
import EmployeeStats from './EmployeeStats';

const navigation = [
  { name: 'Clock In/Out', icon: Clock, id: 'clock' },
  { name: 'My Stats', icon: BarChart3, id: 'stats' },
  { name: 'Messages', icon: MessageSquare, id: 'messages' },
  { name: 'Profile', icon: User, id: 'profile' },
];

const EmployeeLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('clock');
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch (activeTab) {
      case 'clock': return <ClockInOut />;
      case 'stats': return <EmployeeStats />;
      case 'messages': return <EmployeeMessages />;
      case 'profile': return <EmployeeProfile />;
      default: return <ClockInOut />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-friendly header */}
      <div className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">TimeTracker</span>
          </div>
          <button
            onClick={logout}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-md"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex overflow-x-auto bg-gray-50">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex-shrink-0 flex flex-col items-center px-4 py-3 text-xs font-medium ${
                  activeTab === item.id 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-5 w-5 mb-1" />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:shadow-lg">
          <div className="flex items-center justify-center h-16 bg-blue-600">
            <Building2 className="h-8 w-8 text-white mr-2" />
            <span className="text-white text-xl font-bold">TimeTracker</span>
          </div>
          
          <nav className="mt-8 flex-1">
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

          <div className="p-4 border-t">
            <div className="flex items-center mb-3">
              <img 
                src={user?.profilePhoto || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'} 
                alt="Profile" 
                className="h-10 w-10 rounded-full object-cover mr-3"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.department}</p>
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
        <div className="lg:pl-64 flex-1">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;