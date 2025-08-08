import React, { useState } from 'react';
import { BarChart3, TrendingUp, Download, Calendar, Users } from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('attendance');

  // Mock data for charts
  const attendanceData = [
    { employee: 'John Smith', hours: 42, days: 5 },
    { employee: 'Sarah Johnson', hours: 38, days: 5 },
    { employee: 'Mike Wilson', hours: 35, days: 4 },
  ];

  const departmentStats = [
    { department: 'Development', employees: 5, avgHours: 40 },
    { department: 'Marketing', employees: 3, avgHours: 37 },
    { department: 'Design', employees: 2, avgHours: 35 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      {/* Report Controls */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="attendance">Attendance</option>
              <option value="productivity">Productivity</option>
              <option value="payroll">Payroll</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Custom Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-md">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-md">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">320</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-md">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Hours/Employee</p>
              <p className="text-2xl font-bold text-gray-900">21.3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-md">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Performance */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Performance</h2>
          <div className="space-y-4">
            {attendanceData.map((employee, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{employee.employee}</h3>
                  <p className="text-sm text-gray-600">{employee.days} days worked</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{employee.hours}h</p>
                  <p className="text-sm text-gray-500">this week</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Statistics */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Statistics</h2>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{dept.department}</h3>
                  <p className="text-sm text-gray-600">{dept.employees} employees</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">{dept.avgHours}h</p>
                  <p className="text-sm text-gray-500">avg/week</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Attendance Trends</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Interactive chart would be displayed here</p>
            <p className="text-sm text-gray-500">Integration with chart library like Chart.js or D3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;