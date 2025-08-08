import React, { useState } from 'react';
import { BarChart3, Clock, Calendar, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTimeTracking } from '../../hooks/useTimeTracking';

const EmployeeStats: React.FC = () => {
  const { user } = useAuth();
  const { getEmployeeStats, timeEntries } = useTimeTracking();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month'>('week');

  const stats = getEmployeeStats(user?.id || '', selectedPeriod);
  
  const myEntries = timeEntries.filter(entry => entry.employeeId === user?.id);
  const completedEntries = myEntries.filter(entry => entry.clockOut);
  
  // Calculate earnings for current pay period
  const calculateEarnings = () => {
    const totalHours = stats.totalHours;
    if (user?.contractType === 'hourly') {
      return totalHours * (user?.payRate || 0);
    } else {
      return stats.daysWorked * (user?.payRate || 0);
    }
  };

  const currentEarnings = calculateEarnings();

  // Mock data for charts - in real app this would come from API
  const weeklyData = [
    { day: 'Mon', hours: 8 },
    { day: 'Tue', hours: 7.5 },
    { day: 'Wed', hours: 8.5 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 6.5 },
    { day: 'Sat', hours: 0 },
    { day: 'Sun', hours: 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Statistics</h1>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value as 'week' | 'month')}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Days Worked</p>
              <p className="text-2xl font-bold text-gray-900">{stats.daysWorked}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-md">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Daily Average</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgHoursPerDay}h</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-md">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Estimated Pay</p>
              <p className="text-2xl font-bold text-gray-900">${currentEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Hours</h2>
          <div className="space-y-3">
            {weeklyData.map((day, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 text-sm text-gray-600">{day.day}</div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(day.hours / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-900 font-medium text-right">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employee Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src={user?.profilePhoto || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'} 
                alt="Profile" 
                className="h-16 w-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-600">{user?.department}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Contract Type:</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {user?.contractType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pay Rate:</span>
                <span className="text-sm font-medium text-gray-900">
                  ${user?.payRate}/{user?.contractType === 'hourly' ? 'hr' : 'day'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Time Entries</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clock Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Hours
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedEntries.slice(0, 5).map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entry.clockIn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(entry.clockIn).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {entry.clockOut ? new Date(entry.clockOut).toLocaleTimeString() : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {entry.totalHours ? `${entry.totalHours}h` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {entry.note || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStats;