import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import { Checkbox } from '../../components/ui/Checkbox';

// Import components
import UserCard from './components/UserCard';
import CreateUserModal from './components/CreateUserModal';
import UserDetailsModal from './components/UserDetailsModal';
import BulkActionsPanel from './components/BulkActionsPanel';
import FilterPanel from './components/FilterPanel';
import StatsCards from './components/StatsCards';

const AdminManagementCenter = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentFilters, setCurrentFilters] = useState({
    status: [],
    role: [],
    jurisdiction: [],
    department: [],
    dateRange: '',
    lastLogin: ''
  });

  // Mock data for users
  const [users, setUsers] = useState([
    {
      id: 'USR001',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@ayush.gov.in',
      employeeId: 'EMP001',
      role: 'Super Administrator',
      status: 'active',
      jurisdiction: 'National',
      lastLogin: '2 hours ago',
      createdAt: '15/01/2024',
      managedUsers: 45,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh'
    },
    {
      id: 'USR002',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@ayush.gov.in',
      employeeId: 'EMP002',
      role: 'District Administrator',
      status: 'active',
      jurisdiction: 'Delhi',
      lastLogin: '1 day ago',
      createdAt: '20/01/2024',
      managedUsers: 12,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya'
    },
    {
      id: 'USR003',
      name: 'Mr. Amit Singh',
      email: 'amit.singh@ayush.gov.in',
      employeeId: 'EMP003',
      role: 'Audit Officer',
      status: 'active',
      jurisdiction: 'Maharashtra',
      lastLogin: '3 hours ago',
      createdAt: '10/01/2024',
      managedUsers: 8,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit'
    },
    {
      id: 'USR004',
      name: 'Ms. Sunita Patel',
      email: 'sunita.patel@ayush.gov.in',
      employeeId: 'EMP004',
      role: 'District Administrator',
      status: 'suspended',
      jurisdiction: 'Gujarat',
      lastLogin: '1 week ago',
      createdAt: '05/01/2024',
      managedUsers: 15,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita'
    },
    {
      id: 'USR005',
      name: 'Dr. Arjun Reddy',
      email: 'arjun.reddy@ayush.gov.in',
      employeeId: 'EMP005',
      role: 'Compliance Officer',
      status: 'pending',
      jurisdiction: 'Karnataka',
      lastLogin: 'Never',
      createdAt: '25/01/2024',
      managedUsers: 0,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun'
    },
    {
      id: 'USR006',
      name: 'Ms. Kavya Nair',
      email: 'kavya.nair@ayush.gov.in',
      employeeId: 'EMP006',
      role: 'Data Analyst',
      status: 'active',
      jurisdiction: 'Tamil Nadu',
      lastLogin: '5 hours ago',
      createdAt: '12/01/2024',
      managedUsers: 3,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya'
    }
  ]);

  // Mock stats data
  const stats = {
    totalUsers: users?.length,
    activeSessions: users?.filter(u => u?.status === 'active' && u?.lastLogin !== 'Never')?.length,
    pendingApprovals: users?.filter(u => u?.status === 'pending')?.length,
    securityAlerts: 2
  };

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'role', label: 'Role' },
    { value: 'status', label: 'Status' },
    { value: 'lastLogin', label: 'Last Login' },
    { value: 'created', label: 'Date Created' }
  ];

  const viewModeOptions = [
    { value: 'grid', label: 'Grid View', icon: 'Grid3X3' },
    { value: 'list', label: 'List View', icon: 'List' }
  ];

  // Filter and search users
  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         user?.employeeId?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesStatus = currentFilters?.status?.length === 0 || currentFilters?.status?.includes(user?.status);
    const matchesRole = currentFilters?.role?.length === 0 || currentFilters?.role?.includes(user?.role);
    const matchesJurisdiction = currentFilters?.jurisdiction?.length === 0 || currentFilters?.jurisdiction?.includes(user?.jurisdiction);

    return matchesSearch && matchesStatus && matchesRole && matchesJurisdiction;
  });

  // Sort users
  const sortedUsers = [...filteredUsers]?.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a?.name?.localeCompare(b?.name);
      case 'name-desc':
        return b?.name?.localeCompare(a?.name);
      case 'role':
        return a?.role?.localeCompare(b?.role);
      case 'status':
        return a?.status?.localeCompare(b?.status);
      case 'lastLogin':
        return a?.lastLogin?.localeCompare(b?.lastLogin);
      case 'created':
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  const handleUserSelect = (userId, checked) => {
    setSelectedUsers(prev => 
      checked 
        ? [...prev, users?.find(u => u?.id === userId)]
        : prev?.filter(u => u?.id !== userId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedUsers(checked ? sortedUsers : []);
  };

  const handleCreateUser = async (userData) => {
    const newUser = {
      ...userData,
      id: `USR${String(users?.length + 1)?.padStart(3, '0')}`
    };
    setUsers(prev => [...prev, newUser]);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    // Open edit modal (would be similar to create modal)
    console.log('Edit user:', user);
  };

  const handleSuspendUser = (user) => {
    setUsers(prev => prev?.map(u => 
      u?.id === user?.id 
        ? { ...u, status: u?.status === 'active' ? 'suspended' : 'active' }
        : u
    ));
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user?.name}?`)) {
      setUsers(prev => prev?.filter(u => u?.id !== user?.id));
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const handleBulkAction = async (action, users) => {
    console.log('Bulk action:', action, users);
    // Implement bulk actions
    switch (action) {
      case 'activate':
        setUsers(prev => prev?.map(u => 
          users?.some(selectedUser => selectedUser?.id === u?.id)
            ? { ...u, status: 'active' }
            : u
        ));
        break;
      case 'suspend':
        setUsers(prev => prev?.map(u => 
          users?.some(selectedUser => selectedUser?.id === u?.id)
            ? { ...u, status: 'suspended' }
            : u
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${users?.length} users?`)) {
          setUsers(prev => prev?.filter(u => 
            !users?.some(selectedUser => selectedUser?.id === u?.id)
          ));
        }
        break;
    }
    setSelectedUsers([]);
  };

  const handleApplyFilters = (filters) => {
    setCurrentFilters(filters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(currentFilters)?.forEach(value => {
      if (Array.isArray(value)) {
        count += value?.length;
      } else if (value) {
        count += 1;
      }
    });
    return count;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-72'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Management Center</h1>
                <p className="text-gray-600 mt-2">
                  Manage administrators, roles, and permissions across the AYUSH portal ecosystem
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export
                </Button>
                <Button
                  onClick={() => setIsCreateModalOpen(true)}
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Add Administrator
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Search by name, email, or employee ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterPanelOpen(true)}
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
                </Button>

                <Select
                  options={sortOptions}
                  value={sortBy}
                  onChange={setSortBy}
                  placeholder="Sort by..."
                  className="w-48"
                />

                <div className="flex items-center border border-gray-200 rounded-md">
                  {viewModeOptions?.map((option) => (
                    <Button
                      key={option?.value}
                      variant={viewMode === option?.value ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode(option?.value)}
                      iconName={option?.icon}
                      className="rounded-none first:rounded-l-md last:rounded-r-md"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bulk Selection */}
            {sortedUsers?.length > 0 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedUsers?.length === sortedUsers?.length}
                    onChange={(e) => handleSelectAll(e?.target?.checked)}
                    label={`Select all ${sortedUsers?.length} users`}
                  />
                </div>
                
                <div className="text-sm text-gray-500">
                  Showing {sortedUsers?.length} of {users?.length} administrators
                </div>
              </div>
            )}
          </div>

          {/* Users Grid/List */}
          <div className="bg-white rounded-lg border border-gray-200">
            {sortedUsers?.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No administrators found</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery || getActiveFilterCount() > 0 
                    ? 'Try adjusting your search or filters' :'Get started by adding your first administrator'
                  }
                </p>
                {!searchQuery && getActiveFilterCount() === 0 && (
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    iconName="UserPlus"
                    iconPosition="left"
                  >
                    Add Administrator
                  </Button>
                )}
              </div>
            ) : (
              <div className="p-6">
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {sortedUsers?.map((user) => (
                      <div key={user?.id} className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <Checkbox
                            checked={selectedUsers?.some(u => u?.id === user?.id)}
                            onChange={(e) => handleUserSelect(user?.id, e?.target?.checked)}
                          />
                        </div>
                        <UserCard
                          user={user}
                          onEdit={handleEditUser}
                          onSuspend={handleSuspendUser}
                          onViewDetails={handleViewDetails}
                          onDelete={handleDeleteUser}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4">
                            <Checkbox
                              checked={selectedUsers?.length === sortedUsers?.length}
                              onChange={(e) => handleSelectAll(e?.target?.checked)}
                            />
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Jurisdiction</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                          <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedUsers?.map((user) => (
                          <tr key={user?.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <Checkbox
                                checked={selectedUsers?.some(u => u?.id === user?.id)}
                                onChange={(e) => handleUserSelect(user?.id, e?.target?.checked)}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={user?.avatar}
                                  alt={user?.name}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{user?.name}</p>
                                  <p className="text-sm text-gray-500">{user?.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-900">{user?.role}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user?.status === 'active' ? 'text-success bg-success/10' :
                                user?.status === 'suspended'? 'text-error bg-error/10' : 'text-warning bg-warning/10'
                              }`}>
                                {user?.status?.charAt(0)?.toUpperCase() + user?.status?.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-900">{user?.jurisdiction}</span>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-sm text-gray-500">{user?.lastLogin}</span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center justify-end space-x-1">
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => handleViewDetails(user)}
                                  iconName="Eye"
                                  iconSize={14}
                                />
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => handleEditUser(user)}
                                  iconName="Edit"
                                  iconSize={14}
                                />
                                <Button
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => handleSuspendUser(user)}
                                  iconName={user?.status === 'active' ? 'UserX' : 'UserCheck'}
                                  iconSize={14}
                                  className={user?.status === 'active' ? 'text-warning' : 'text-success'}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Modals and Panels */}
      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateUser}
      />
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        user={selectedUser}
      />
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={currentFilters}
      />
      <BulkActionsPanel
        selectedUsers={selectedUsers}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedUsers([])}
      />
    </div>
  );
};

export default AdminManagementCenter;