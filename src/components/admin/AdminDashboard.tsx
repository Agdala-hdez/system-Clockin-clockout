import React from 'react';
import { Users, Clock, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { useTimeTracking } from '../../hooks/useTimeTracking';

const AdminDashboard: React.FC = () => {
  const { timeEntries, getCurrentEntry } = useTimeTracking();

  // Mock stats - in real app, these would come from API
  const stats = {
    totalEmployees: 15,
    currentlyWorking: 8,
    todayHours: 64,
    pendingPayroll: 12500
  };

  const recentActivity = [
    { id: '1', employee: 'John Smith', action: 'Clocked In', time: '9:15 AM', status: 'success' },
    { id: '2', employee: 'Sarah Johnson', action: 'Clocked Out', time: '8:45 AM', status: 'info' },
    { id: '3', employee: 'Mike Wilson', action: 'Missed Clock Out', time: 'Yesterday', status: 'warning' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Currently Working</p>
              <p className="text-2xl font-bold text-gray-900">{stats.currentlyWorking}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-md">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayHours}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-md">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Payroll</p>
              <p className="text-2xl font-bold text-gray-900">${stats.pendingPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-3 ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <Clock className={`h-4 w-4 ${
                      activity.status === 'success' ? 'text-green-600' :
                      activity.status === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.employee}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Issues</h2>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Missing Clock Out</p>
                <p className="text-sm text-gray-600">Mike Wilson didn't clock out yesterday</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-blue-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Payroll Due</p>
                <p className="text-sm text-gray-600">Weekly payroll processing due tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;