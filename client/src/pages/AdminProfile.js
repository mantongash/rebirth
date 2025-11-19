import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSave, FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNotification } from '../context/NotificationContext';
import { getBaseUrl } from '../utils/apiConfig';
import logo from "../asset/logo-1.png";

const Container = styled.div`
  min-height: 100vh;
  background: #f7fafd;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  min-width: 340px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: block;
`;

const Title = styled.h2`
  color: #26a69a;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 1rem 0;
`;

const SuccessAlert = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const ErrorAlert = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  text-align: left;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #667eea;
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
`;

const HelperText = styled.small`
  color: #666;
  font-size: 0.8rem;
  text-align: left;
`;

const SaveButton = styled.button`
  background: #26a69a;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #1e8a7e;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export default function AdminProfile() {
  const { getAdminToken, adminUser, refreshAdminProfile } = useAdminAuth();
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminUser]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Try to get profile from adminUser context first
      if (adminUser) {
        setFormData({
          firstName: adminUser.firstName || '',
          lastName: adminUser.lastName || '',
          email: adminUser.email || '',
          phone: adminUser.phone || '',
          password: '',
          confirmPassword: ''
        });
        setLoading(false);
        return;
      }

      // If not in context, fetch from API
      const token = getAdminToken();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const API_BASE = getBaseUrl();
      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && data.data.user) {
          const user = data.data.user;
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            password: '',
            confirmPassword: ''
          });
        } else {
          throw new Error(data.message || 'Failed to load profile');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load profile');
      }
    } catch (err) {
      console.error('Error loading profile:', err);
      setError(err.message || 'Failed to load profile');
      showError('Failed to load profile', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate password if provided
    if (formData.password) {
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        showError('Validation Error', 'Password must be at least 6 characters long');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        showError('Validation Error', 'Passwords do not match');
        return;
      }
    }

    try {
      setSaving(true);
      const token = getAdminToken();
      const API_BASE = getBaseUrl();

      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone
      };

      // Only include password if provided
      if (formData.password) {
        updateData.password = formData.password;
      }

      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updateData)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSuccess(true);
          showSuccess('Profile updated successfully');
          
          // Clear password fields
          setFormData(prev => ({
            ...prev,
            password: '',
            confirmPassword: ''
          }));

          // Refresh admin profile
          if (refreshAdminProfile) {
            await refreshAdminProfile();
          }

          setTimeout(() => setSuccess(false), 3000);
        } else {
          throw new Error(data.message || 'Failed to update profile');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
      showError('Failed to update profile', err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <ProfileCard>
          <LoadingState>
            <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
            Loading profile...
          </LoadingState>
        </ProfileCard>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileCard>
        <Avatar src={logo} alt="Admin" />
        <Title>Admin Profile</Title>
        <Divider />
        
        {success && (
          <SuccessAlert>
            <FaCheckCircle />
            Profile updated successfully!
          </SuccessAlert>
        )}

        {error && (
          <ErrorAlert>
            <FaExclamationCircle />
            {error}
          </ErrorAlert>
        )}

        <Form onSubmit={handleSave}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              value={formData.firstName}
              onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="Enter your first name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              value={formData.lastName}
              onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Enter your last name"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
              required
              disabled
            />
            <HelperText>Email cannot be changed</HelperText>
          </FormGroup>

          <FormGroup>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </FormGroup>

          <Divider />

          <FormGroup>
            <Label>New Password</Label>
            <Input
              type="password"
              value={formData.password}
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter new password"
            />
            <HelperText>Leave blank to keep current password</HelperText>
          </FormGroup>

          {formData.password && (
            <FormGroup>
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                value={formData.confirmPassword}
                onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                placeholder="Confirm new password"
              />
            </FormGroup>
          )}

          <SaveButton type="submit" disabled={saving}>
            {saving ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </SaveButton>
        </Form>
      </ProfileCard>
    </Container>
  );
}
