import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserDetailsModal = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState('profile');

  if (!isOpen || !user) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10 border-success/20';
      case 'suspended': return 'text-error bg-error/10 border-error/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-gray-500 bg-gray-100 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Administrator': return 'text-navy-deep bg-navy-deep/10 border-navy-deep/20';
      case 'District Administrator': return 'text-primary bg-primary/10 border-primary/20';
      case 'Audit Officer': return 'text-saffron bg-saffron/10 border-saffron/20';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const mockActivityLog = [
    {
      id: 1,
      action: 'User Login',
      timestamp: '2025-01-12 09:30:15',
      details: 'Successful login from IP: 203.192.12.45',
      type: 'login'
    },
    {
      id: 2,
      action: 'Permission Modified',
      timestamp: '2025-01-11 14:22:30',
      details: 'Added blockchain explorer access',
      type: 'permission'
    },
    {
      id: 3,
      action: 'Profile Updated',
      timestamp: '2025-01-10 11:15:45',
      details: 'Updated contact information',
      type: 'profile'
    },
    {
      id: 4,
      action: 'Document Access',
      timestamp: '2025-01-09 16:45:20',
      details: 'Accessed compliance report #CR-2025-001',
      type: 'access'
    },
    {
      id: 5,
      action: 'User Creation',
      timestamp: '2025-01-08 10:30:00',
      details: 'Account created by Super Administrator',
      type: 'system'
    }
  ];

  const mockPermissions = [
    { module: 'Dashboard', read: true, write: true, delete: false },
    { module: 'User Management', read: true, write: true, delete: true },
    { module: 'Blockchain Explorer', read: true, write: false, delete: false },
    { module: 'Compliance Reports', read: true, write: true, delete: false },
    { module: 'Security Monitoring', read: true, write: false, delete: false },
    { module: 'System Settings', read: false, write: false, delete: false }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'login': return 'LogIn';
      case 'permission': return 'Shield';
      case 'profile': return 'User';
      case 'access': return 'FileText';
      case 'system': return 'Settings';
      default: return 'Activity';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' },
    { id: 'activity', label: 'Activity Log', icon: 'Clock' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user?.status)}`}>
              {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <div className="flex border-b border-gray-200">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Employee ID:</span>
                      <span className="text-sm font-medium text-gray-900">{user?.employeeId}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Role:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user?.role)}`}>
                        {user?.role}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Department:</span>
                      <span className="text-sm font-medium text-gray-900">Ayurveda Division</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Jurisdiction:</span>
                      <span className="text-sm font-medium text-gray-900">{user?.jurisdiction}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Phone:</span>
                      <span className="text-sm font-medium text-gray-900">+91 98765 43210</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Account Details</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm font-medium text-gray-900">{user?.createdAt}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Last Login:</span>
                      <span className="text-sm font-medium text-gray-900">{user?.lastLogin}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Managed Users:</span>
                      <span className="text-sm font-medium text-gray-900">{user?.managedUsers}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Two-Factor Auth:</span>
                      <span className="text-sm font-medium text-success">Enabled</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Login Attempts:</span>
                      <span className="text-sm font-medium text-gray-900">0 failed</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reporting Structure</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={20} className="text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reports to: Dr. Rajesh Kumar</p>
                      <p className="text-xs text-gray-500">Super Administrator - National Level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Module Permissions</h3>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                >
                  Edit Permissions
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Module</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Read</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Write</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-900">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPermissions?.map((permission, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-medium text-gray-900">{permission?.module}</td>
                        <td className="py-3 px-4 text-center">
                          {permission?.read ? (
                            <Icon name="Check" size={16} className="text-success mx-auto" />
                          ) : (
                            <Icon name="X" size={16} className="text-error mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {permission?.write ? (
                            <Icon name="Check" size={16} className="text-success mx-auto" />
                          ) : (
                            <Icon name="X" size={16} className="text-error mx-auto" />
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          {permission?.delete ? (
                            <Icon name="Check" size={16} className="text-success mx-auto" />
                          ) : (
                            <Icon name="X" size={16} className="text-error mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Log
                </Button>
              </div>

              <div className="space-y-4">
                {mockActivityLog?.map((activity) => (
                  <div key={activity?.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name={getActionIcon(activity?.type)} size={14} className="text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity?.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity?.details}</p>
                      <p className="text-xs text-gray-500 mt-2">{activity?.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
          >
            Edit User
          </Button>
          {user?.status === 'active' ? (
            <Button
              variant="destructive"
              iconName="UserX"
              iconPosition="left"
            >
              Suspend User
            </Button>
          ) : (
            <Button
              variant="success"
              iconName="UserCheck"
              iconPosition="left"
            >
              Activate User
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;