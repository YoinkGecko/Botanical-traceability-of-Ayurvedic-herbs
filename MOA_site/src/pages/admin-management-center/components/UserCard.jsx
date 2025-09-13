import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onEdit, onSuspend, onViewDetails, onDelete }) => {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              user?.status === 'active' ? 'bg-success' : 
              user?.status === 'suspended' ? 'bg-error' : 'bg-warning'
            }`}></div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <p className="text-xs text-gray-500">{user?.employeeId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user?.status)}`}>
            {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
          </span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Role:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user?.role)}`}>
            {user?.role}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Jurisdiction:</span>
          <span className="text-sm font-medium text-gray-900">{user?.jurisdiction}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Last Login:</span>
          <span className="text-sm text-gray-700">{user?.lastLogin}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Created:</span>
          <span className="text-sm text-gray-700">{user?.createdAt}</span>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={14} className="text-gray-400" />
          <span className="text-xs text-gray-500">{user?.managedUsers} users</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onViewDetails(user)}
            iconName="Eye"
            iconSize={14}
          >
            View
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onEdit(user)}
            iconName="Edit"
            iconSize={14}
          >
            Edit
          </Button>
          {user?.status === 'active' ? (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onSuspend(user)}
              iconName="UserX"
              iconSize={14}
              className="text-warning hover:text-warning"
            >
              Suspend
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onSuspend(user)}
              iconName="UserCheck"
              iconSize={14}
              className="text-success hover:text-success"
            >
              Activate
            </Button>
          )}
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onDelete(user)}
            iconName="Trash2"
            iconSize={14}
            className="text-error hover:text-error"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;