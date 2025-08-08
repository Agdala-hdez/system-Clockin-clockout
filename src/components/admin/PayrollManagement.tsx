import React, { useState } from 'react';
import { Download, Calendar, DollarSign, FileText } from 'lucide-react';
import { PayrollPeriod, PayrollEmployee } from '../../types';

const PayrollManagement: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  const mockPayrollData: PayrollPeriod = {
    id: '1',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-14'),
    cutoffDate: new Date('2024-01-15'),
    status: 'draft',
    employees: [
      {
        employeeId: '2',
        name: 'John Smith',
        totalHours: 80,
        payRate: 25,
        totalPay: 2000,
        contractType: 'hourly'
      },
      {
        employeeId: '3',
        name: 'Sarah Johnson',
        totalHours: 75,
        payRate: 22,
        totalPay: 1650,
        contractType: 'hourly'
      },
      {
        employeeId: '4',
        name: 'Mike Wilson',
        totalHours: 10, // days
        payRate: 180,
        totalPay: 1800,
        contractType: 'daily'
      }
    ]
  };

  const totalPayroll = mockPayrollData.employees.reduce((sum, emp) => sum + emp.totalPay, 0);

  const generatePayroll = () => {
    // In a real app, this would call an API
    console.log('Generating payroll report...');
  };

  const exportToPDF = () => {
    // In a real app, this would generate a PDF
    console.log('Exporting to PDF...');
  };

  const exportToExcel = () => {
    // In a real app, this would generate an Excel file
    console.log('Exporting to Excel...');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={exportToExcel}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Payroll Period Selector */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Payroll Period</h2>
          <button
            onClick={generatePayroll}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span className="font-medium text-gray-900">Current Period</span>
            </div>
            <p className="text-sm text-gray-600">
              {mockPayrollData.startDate.toLocaleDateString()} - {mockPayrollData.endDate.toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Cutoff: {mockPayrollData.cutoffDate.toLocaleDateString()}
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-gray-900">Total Payroll</span>
            </div>
            <p className="text-2xl font-bold text-green-600">${totalPayroll.toLocaleString()}</p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-purple-600 mr-2" />
              <span className="font-medium text-gray-900">Status</span>
            </div>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              mockPayrollData.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
              mockPayrollData.status === 'processed' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {mockPayrollData.status.charAt(0).toUpperCase() + mockPayrollData.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Employee Payroll Details */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Employee Payroll Details</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contract Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hours/Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pay
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPayrollData.employees.map((employee) => (
                <tr key={employee.employeeId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {employee.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      employee.contractType === 'hourly' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {employee.contractType.charAt(0).toUpperCase() + employee.contractType.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.totalHours} {employee.contractType === 'hourly' ? 'hours' : 'days'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${employee.payRate}/{employee.contractType === 'hourly' ? 'hr' : 'day'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    ${employee.totalPay.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={4} className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                  Total Payroll:
                </td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">
                  ${totalPayroll.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Payroll Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payroll Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay Period Frequency
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="14">Every 14 days</option>
              <option value="15">Every 15 days</option>
              <option value="7">Weekly</option>
              <option value="30">Monthly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cutoff Time
            </label>
            <input
              type="time"
              defaultValue="23:59"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollManagement;