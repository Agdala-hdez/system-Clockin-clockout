import React, { useState } from 'react';
import { Camera, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const EmployeeProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    profilePhoto: user?.profilePhoto || ''
  });

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      department: user?.department || '',
      profilePhoto: user?.profilePhoto || ''
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({ ...profileData, profilePhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Picture */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Picture</h2>
          
          <div className="text-center">
            <div className="relative inline-block">
              <img
                src={profileData.profilePhoto || 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <Camera className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {!isEditing && (
              <p className="text-sm text-gray-500 mt-4">
                Profile photo helps your team recognize you
              </p>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.department}
                  onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-900 py-2">{profileData.department}</p>
              )}
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Employment Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Employee ID:</span>
              <span className="text-sm font-medium text-gray-900">{user?.id}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Role:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">{user?.role}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Contract Type:</span>
              <span className="text-sm font-medium text-gray-900 capitalize">{user?.contractType}</span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Pay Rate:</span>
              <span className="text-sm font-medium text-gray-900">
                ${user?.payRate}/{user?.contractType === 'hourly' ? 'hr' : 'day'}
              </span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Start Date:</span>
              <span className="text-sm font-medium text-gray-900">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between py-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user?.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {user?.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-2 text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
              Change Password
            </button>
            
            <button className="w-full flex items-center justify-center px-4 py-2 text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
              Download My Data
            </button>
            
            <button className="w-full flex items-center justify-center px-4 py-2 text-purple-600 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors">
              View Time Reports
            </button>
            
            <button className="w-full flex items-center justify-center px-4 py-2 text-orange-600 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors">
              Request Time Off
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;