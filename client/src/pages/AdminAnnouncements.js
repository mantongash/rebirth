import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaBullhorn, FaPlus, FaTrash, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNotification } from '../context/NotificationContext';
import { buildApiUrl } from '../utils/apiConfig';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const AnnouncementsCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 1.5rem 0;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #667eea;
  }
`;

const AddButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.2s ease;

  &:hover:not(:disabled) {
    background: #5a67d8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AnnouncementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AnnouncementItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
`;

const AnnouncementText = styled.div`
  color: #333;
  font-size: 1rem;
  flex: 1;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #fee2e2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function AdminAnnouncements() {
  const { getAdminToken } = useAdminAuth();
  const { showSuccess, showError } = useNotification();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState('');
  const [newAnnouncement, setNewAnnouncement] = useState('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      setError('');
      const token = getAdminToken();
      
      const response = await fetch(buildApiUrl(`admin/content?type=announcement&status=published`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        // Handle both array and object with content property
        const contentList = Array.isArray(data) ? data : (data.content || []);
        setAnnouncements(contentList);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch announcements');
      }
    } catch (err) {
      console.error('Error fetching announcements:', err);
      setError(err.message || 'Failed to load announcements');
      showError('Failed to load announcements', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) {
      showError('Please enter an announcement');
      return;
    }

    try {
      setSaving(true);
      const token = getAdminToken();
      
      const response = await fetch(buildApiUrl('admin/content'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newAnnouncement.trim(),
          content: newAnnouncement.trim(),
          type: 'announcement',
          status: 'published',
          isPublic: true
        })
      });

      if (response.ok) {
        const data = await response.json();
        showSuccess('Announcement added successfully');
        setNewAnnouncement('');
        await fetchAnnouncements();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add announcement');
      }
    } catch (err) {
      console.error('Error adding announcement:', err);
      showError('Failed to add announcement', err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }

    try {
      setDeleting(id);
      const token = getAdminToken();
      
      const response = await fetch(buildApiUrl(`admin/content/${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        showSuccess('Announcement deleted successfully');
        await fetchAnnouncements();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete announcement');
      }
    } catch (err) {
      console.error('Error deleting announcement:', err);
      showError('Failed to delete announcement', err.message);
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <AnnouncementsCard>
          <LoadingState>
            <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
            Loading announcements...
          </LoadingState>
        </AnnouncementsCard>
      </Container>
    );
  }

  return (
    <Container>
      <AnnouncementsCard>
        <Title>
          <FaBullhorn />
          Announcements
        </Title>
        <Divider />
        
        {error && (
          <ErrorMessage>
            <FaExclamationCircle />
            {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleAdd}>
          <Input
            type="text"
            placeholder="New announcement"
            value={newAnnouncement}
            onChange={e => setNewAnnouncement(e.target.value)}
            disabled={saving}
          />
          <AddButton type="submit" disabled={saving || !newAnnouncement.trim()}>
            {saving ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : <FaPlus />}
            {saving ? 'Adding...' : 'Add'}
          </AddButton>
        </Form>
        
        <AnnouncementsList>
          {announcements.length === 0 ? (
            <EmptyState>
              <h3>No announcements</h3>
              <p>Add your first announcement above</p>
            </EmptyState>
          ) : (
            announcements.map((announcement) => (
              <AnnouncementItem key={announcement._id || announcement.id}>
                <AnnouncementText>{announcement.title || announcement.content}</AnnouncementText>
                <DeleteButton 
                  onClick={() => handleDelete(announcement._id || announcement.id)} 
                  title="Delete"
                  disabled={deleting === (announcement._id || announcement.id)}
                >
                  {deleting === (announcement._id || announcement.id) ? (
                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <FaTrash />
                  )}
                </DeleteButton>
              </AnnouncementItem>
            ))
          )}
        </AnnouncementsList>
      </AnnouncementsCard>
    </Container>
  );
}
