import React, { useState } from 'react';
import { Clock, MapPin, Camera, Edit, CheckCircle, XCircle } from 'lucide-react';
import { useTimeTracking } from '../../hooks/useTimeTracking';

const AttendanceControl: React.FC = () => {
  const { timeEntries, setTimeEntries } = useTimeTracking();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const mockEmployees = [
    { id: '2', name: 'John Smith', department: 'Development' },
    { id: '3', name: 'Sarah Johnson', department: 'Marketing' },
    { id: '4', name: 'Mike Wilson', department: 'Design' }
  ];

  const getEmployeeStatus = (employeeId: string) => {
    const activeEntry = timeEntries.find(entry => 
      entry.employeeId === employeeId && !entry.clockOut
    );
    return activeEntry ? 'clocked-in' : 'clocked-out';
  };

  const getEmployeeTodayHours = (employeeId: string) => {
    const today = new Date().toDateString();
    const todayEntries = timeEntries.filter(entry => 
      entry.employeeId === employeeId && 
      new Date(entry.clockIn).toDateString() === today
    );
    return todayEntries.reduce((total, entry) => total + (entry.totalHours || 0), 0);
  };

  const handleManualClockOut = (employeeId: string) => {
    const activeEntry = timeEntries.find(entry => 
      entry.employeeId === employeeId && !entry.clockOut
    );
    
    if (activeEntry) {
      const clockOutTime = new Date();
      const totalHours = (clockOutTime.getTime() - activeEntry.clockIn.getTime()) / (1000 * 60 * 60);
      
      setTimeEntries(prev => prev.map(entry => 
        entry.id === activeEntry.id 
          ? { ...entry, clockOut: clockOutTime, totalHours: Math.round(totalHours * 100) / 100, adminEditedBy: 'Admin' }
          : entry
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Control</h1>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Live Status Board */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockEmployees.map((employee) => {
            const status = getEmployeeStatus(employee.id);
            const todayHours = getEmployeeTodayHours(employee.id);
            
            return (
              <div key={employee.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      status === 'clocked-in' ? 'bg-green-500' : 'bg-gray-400'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.department}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    status === 'clocked-in' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {status === 'clocked-in' ? 'Working' : 'Off'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Today's Hours:</span>
                    <span className="font-medium">{todayHours.toFixed(1)}h</span>
                  </div>
                  
                  {status === 'clocked-in' && (
                    <button
                      onClick={() => handleManualClockOut(employee.id)}
                      className="w-full px-3 py-2 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                    >
                      Force Clock Out
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance History */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Attendance History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
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
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeEntries.map((entry) => {
                const employee = mockEmployees.find(emp => emp.id === entry.employeeId);
                return (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee?.name}
                      </div>
                      <div className="text-sm text-gray-500">{employee?.department}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.clockIn).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.clockOut ? new Date(entry.clockOut).toLocaleString() : 'Still working'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.totalHours ? `${entry.totalHours}h` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        entry.clockOut 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {entry.clockOut ? 'Completed' : 'Active'}
                      </span>
                      {entry.adminEditedBy && (
                        <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Edited by Admin
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        {entry.photo && (
                          <button className="text-green-600 hover:text-green-900">
                            <Camera className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceControl;