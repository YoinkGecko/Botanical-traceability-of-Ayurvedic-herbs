import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreateUserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeId: '',
    role: '',
    jurisdiction: '',
    department: '',
    reportingTo: '',
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { value: 'Super Administrator', label: 'Super Administrator' },
    { value: 'District Administrator', label: 'District Administrator' },
    { value: 'Audit Officer', label: 'Audit Officer' },
    { value: 'Compliance Officer', label: 'Compliance Officer' },
    { value: 'Data Analyst', label: 'Data Analyst' }
  ];

  const jurisdictionOptions = [
    { value: 'National', label: 'National Level' },
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' }
  ];

  const departmentOptions = [
    { value: 'Ayurveda', label: 'Ayurveda Division' },
    { value: 'Yoga & Naturopathy', label: 'Yoga & Naturopathy Division' },
    { value: 'Unani', label: 'Unani Medicine Division' },
    { value: 'Siddha', label: 'Siddha Medicine Division' },
    { value: 'Homoeopathy', label: 'Homoeopathy Division' },
    { value: 'Administration', label: 'Administration' },
    { value: 'Finance', label: 'Finance & Accounts' },
    { value: 'IT & Digital', label: 'IT & Digital Services' }
  ];

  const reportingOptions = [
    { value: 'SA001', label: 'Dr. Rajesh Kumar (Super Admin)' },
    { value: 'SA002', label: 'Dr. Priya Sharma (Super Admin)' },
    { value: 'DA001', label: 'Mr. Amit Singh (District Admin - Delhi)' },
    { value: 'DA002', label: 'Ms. Sunita Patel (District Admin - Gujarat)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) newErrors.name = 'Full name is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.employeeId?.trim()) newErrors.employeeId = 'Employee ID is required';
    if (!formData?.role) newErrors.role = 'Role selection is required';
    if (!formData?.jurisdiction) newErrors.jurisdiction = 'Jurisdiction is required';
    if (!formData?.department) newErrors.department = 'Department is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData?.email && !emailRegex?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData?.phone && !phoneRegex?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        ...formData,
        id: `USR${Date.now()}`,
        status: 'pending',
        createdAt: new Date()?.toLocaleDateString('en-IN'),
        lastLogin: 'Never',
        managedUsers: 0,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData?.name}`
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        employeeId: '',
        role: '',
        jurisdiction: '',
        department: '',
        reportingTo: '',
        permissions: []
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Create New Administrator</h2>
            <p className="text-sm text-gray-500 mt-1">Add a new user to the AYUSH admin portal</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter full name"
              value={formData?.name}
              onChange={handleInputChange}
              error={errors?.name}
              required
            />

            <Input
              label="Employee ID"
              name="employeeId"
              type="text"
              placeholder="e.g., EMP001"
              value={formData?.employeeId}
              onChange={handleInputChange}
              error={errors?.employeeId}
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="user@ayush.gov.in"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="9876543210"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              required
            />

            <Select
              label="Role"
              options={roleOptions}
              value={formData?.role}
              onChange={(value) => handleSelectChange('role', value)}
              error={errors?.role}
              placeholder="Select user role"
              required
            />

            <Select
              label="Department"
              options={departmentOptions}
              value={formData?.department}
              onChange={(value) => handleSelectChange('department', value)}
              error={errors?.department}
              placeholder="Select department"
              required
            />

            <Select
              label="Jurisdiction"
              options={jurisdictionOptions}
              value={formData?.jurisdiction}
              onChange={(value) => handleSelectChange('jurisdiction', value)}
              error={errors?.jurisdiction}
              placeholder="Select jurisdiction"
              searchable
              required
            />

            <Select
              label="Reporting Manager"
              options={reportingOptions}
              value={formData?.reportingTo}
              onChange={(value) => handleSelectChange('reportingTo', value)}
              error={errors?.reportingTo}
              placeholder="Select reporting manager"
              searchable
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Account Setup Information</h4>
                <p className="text-sm text-blue-700 mt-1">
                  The new user will receive login credentials via secure email. They must complete 
                  two-factor authentication setup on first login. Default permissions will be assigned 
                  based on the selected role and can be customized later.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="UserPlus"
              iconPosition="left"
            >
              Create Administrator
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;