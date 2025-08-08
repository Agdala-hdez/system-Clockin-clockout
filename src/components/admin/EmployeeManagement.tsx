import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Mail, Camera } from 'lucide-react';
import { User } from '../../types';

const mockEmployees: User[] = [
  {
    id: '2',
    email: 'john@company.com',
    name: 'John Smith',
    role: 'employee',
    profilePhoto: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    department: 'Development',
    contractType: 'hourly',
    payRate: 25,
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '3',
    email: 'sarah@company.com',
    name: 'Sarah Johnson',
    role: 'employee',
    profilePhoto: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    department: 'Marketing',
    contractType: 'hourly',
    payRate: 22,
    createdAt: new Date(),
    isActive: true
  },
  {
    id: '4',
    email: 'mike@company.com',
    name: 'Mike Wilson',
    role: 'employee',
    profilePhoto: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    department: 'Design',
    contractType: 'daily',
    payRate: 180,
    createdAt: new Date(),
    isActive: true
  }
];

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<User[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    contractType: 'hourly' as 'hourly' | 'daily',
    payRate: 0
  });

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    const employee: User = {
      id: Date.now().toString(),
      ...newEmployee,
      role: 'employee',
      createdAt: new Date(),
      isActive: true
    };

    setEmployees([...employees, employee]);
    setShowAddModal(false);
    setNewEmployee({
      name: '',
      email: '',
      department: '',
      contractType: 'hourly',
      payRate: 0
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Employee
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <img
                src={employee.profilePhoto || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop'}
                alt={employee.name}
                className="h-16 w-16 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                <p className="text-sm text-gray-600">{employee.department}</p>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                  employee.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {employee.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{employee.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Contract:</span>
                <span className="text-gray-900 capitalize">{employee.contractType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Pay Rate:</span>
                <span className="text-gray-900">
                  ${employee.payRate}/{employee.contractType === 'hourly' ? 'hr' : 'day'}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex items-center justify-center w-full px-3 py-2 text-sm text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button className="flex items-center justify-center px-3 py-2 text-sm text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
              <button className="flex items-center justify-center px-3 py-2 text-sm text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Employee</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
                <select
                  value={newEmployee.contractType}
                  onChange={(e) => setNewEmployee({ ...newEmployee, contractType: e.target.value as 'hourly' | 'daily' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pay Rate ($)</label>
                <input
                  type="number"
                  value={newEmployee.payRate}
                  onChange={(e) => setNewEmployee({ ...newEmployee, payRate: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEmployee}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;