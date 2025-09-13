import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsPanel = ({ selectedUsers, onBulkAction, onClearSelection }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: 'activate', label: 'Activate Users' },
    { value: 'suspend', label: 'Suspend Users' },
    { value: 'delete', label: 'Delete Users' },
    { value: 'export', label: 'Export User Data' },
    { value: 'reset-password', label: 'Reset Passwords' },
    { value: 'update-permissions', label: 'Update Permissions' }
  ];

  const handleExecuteAction = async () => {
    if (!selectedAction || selectedUsers?.length === 0) return;

    setIsProcessing(true);
    
    try {
      await onBulkAction(selectedAction, selectedUsers);
      setSelectedAction('');
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'activate': return 'UserCheck';
      case 'suspend': return 'UserX';
      case 'delete': return 'Trash2';
      case 'export': return 'Download';
      case 'reset-password': return 'Key';
      case 'update-permissions': return 'Shield';
      default: return 'Settings';
    }
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'activate': return 'success';
      case 'suspend': return 'warning';
      case 'delete': return 'destructive';
      case 'export': return 'outline';
      case 'reset-password': return 'secondary';
      case 'update-permissions': return 'outline';
      default: return 'outline';
    }
  };

  if (selectedUsers?.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-96">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Users" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
              </p>
              <p className="text-xs text-gray-500">Choose an action to perform</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            iconName="X"
            iconSize={16}
          />
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Select
              options={bulkActionOptions}
              value={selectedAction}
              onChange={setSelectedAction}
              placeholder="Select action..."
              className="w-full"
            />
          </div>
          
          <Button
            variant={selectedAction ? getActionColor(selectedAction) : 'outline'}
            onClick={handleExecuteAction}
            disabled={!selectedAction || isProcessing}
            loading={isProcessing}
            iconName={selectedAction ? getActionIcon(selectedAction) : 'Play'}
            iconPosition="left"
          >
            Execute
          </Button>
        </div>

        {selectedAction && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-900">Action Preview</p>
                <p className="text-xs text-blue-700 mt-1">
                  {selectedAction === 'activate' && `Activate ${selectedUsers?.length} user accounts and send notification emails.`}
                  {selectedAction === 'suspend' && `Suspend ${selectedUsers?.length} user accounts and revoke active sessions.`}
                  {selectedAction === 'delete' && `Permanently delete ${selectedUsers?.length} user accounts. This action cannot be undone.`}
                  {selectedAction === 'export' && `Export detailed information for ${selectedUsers?.length} users to CSV format.`}
                  {selectedAction === 'reset-password' && `Generate new passwords for ${selectedUsers?.length} users and send via secure email.`}
                  {selectedAction === 'update-permissions' && `Open permission editor to modify access rights for ${selectedUsers?.length} users.`}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>Selected users: {selectedUsers?.map(u => u?.name)?.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;