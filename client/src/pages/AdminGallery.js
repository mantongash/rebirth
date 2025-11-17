import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaCalendarAlt, FaUpload, FaTimes, FaSave, FaSpinner, FaImage, FaExpand } from 'react-icons/fa';
import { useNotification } from '../context/NotificationContext';
import { buildApiUrl } from '../utils/apiConfig';

const Container = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

const Button = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 250px;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const GalleryCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e1e8ed;
`;

const CardTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const CardYear = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #5a6c7d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const CardImages = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  padding: 1rem;
`;

const ImageThumb = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #e1e8ed;
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &.edit {
    background: #3498db;
    color: white;
    
    &:hover {
      background: #2980b9;
    }
  }

  &.delete {
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
    }
  }

  &.view {
    background: #27ae60;
    color: white;
    
    &:hover {
      background: #229954;
    }
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #e1e8ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #7f8c8d;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
  }
`;

const ModalContent = styled.div`
  padding: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FileUploadArea = styled.div`
  border: 2px dashed #bdc3c7;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }

  &.dragover {
    border-color: #667eea;
    background: #f0f4ff;
  }

  &.uploading {
    border-color: #27ae60;
    background: #e8f5e8;
  }
`;

const UploadProgress = styled.div`
  margin-top: 1rem;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #27ae60, #2ecc71);
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: #6c757d;
  text-align: center;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  max-height: 400px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
`;

const ImageItem = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid ${props => props.selected ? '#667eea' : '#e9ecef'};
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  margin: 8px;
  flex-shrink: 0;
`;

const ImageInfo = styled.div`
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImageTitle = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 0.9rem;
`;

const ImageDetails = styled.div`
  font-size: 0.8rem;
  color: #666;
  display: flex;
  gap: 12px;
`;

const ImageDetail = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${props => props.selected ? 'rgba(102, 126, 234, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
  opacity: ${props => props.selected ? 1 : 0.8};
  transition: all 0.3s ease;
`;

const ImageActions = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ImageItem}:hover & {
    opacity: 1;
  }
`;

const ImageActionButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(231, 76, 60, 0.9);
  }
`;


const ModalFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e1e8ed;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const SaveButton = styled(motion.button)`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled.button`
  background: #95a5a6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #7f8c8d;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h3`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const AdminGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    status: 'published',
    isFeatured: false,
    eventFrequency: 'one-time',
    eventDate: '',
    eventLocation: '',
    eventType: 'other'
  });
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchGalleries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      console.log('Fetching galleries...');
      
      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in as admin.');
      }

      const response = await fetch(buildApiUrl('admin/gallery'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Gallery fetch response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Gallery fetch response data:', data);
        
        if (data.success) {
          setGalleries(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch galleries');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch galleries with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      showError(`Failed to load galleries: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      
      // Validate required fields
      if (!formData.title.trim()) {
        showError('Title is required');
        return;
      }
      if (!formData.year) {
        showError('Year is required');
        return;
      }
      
      console.log('Submitting gallery data:', { ...formData, images: uploadedImages });
      
      const galleryData = {
        ...formData,
        images: uploadedImages
      };

      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in as admin.');
      }

      const url = editingGallery 
        ? buildApiUrl(`admin/gallery/${editingGallery._id}`)
        : buildApiUrl('admin/gallery');
      const method = editingGallery ? 'PUT' : 'POST';

      console.log('Making request to:', url, 'with method:', method);
      console.log('Request payload:', JSON.stringify(galleryData, null, 2));

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(galleryData)
      });

      console.log('Gallery submit response status:', response.status);
      console.log('Gallery submit response headers:', response.headers);

      const responseText = await response.text();
      console.log('Raw response:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error(`Invalid response format: ${responseText}`);
      }

      console.log('Parsed response data:', data);

      if (response.ok) {
        if (data.success) {
          showSuccess(editingGallery ? 'Gallery updated successfully' : 'Gallery created successfully');
          setShowModal(false);
          setEditingGallery(null);
          setFormData({
            title: '',
            year: new Date().getFullYear(),
            description: '',
            status: 'published',
            isFeatured: false,
            eventFrequency: 'one-time',
            eventDate: '',
            eventLocation: '',
            eventType: 'other'
          });
          setUploadedImages([]);
          fetchGalleries();
        } else {
          throw new Error(data.message || 'Failed to save gallery');
        }
      } else {
        throw new Error(data.message || `Failed to save gallery with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
      showError(`Failed to save gallery: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    setFormData({
      title: gallery.title,
      year: gallery.customFields?.year || new Date().getFullYear(),
      description: gallery.content,
      status: gallery.status,
      isFeatured: gallery.isFeatured,
      eventFrequency: gallery.eventFrequency || 'one-time',
      eventDate: gallery.eventDate ? new Date(gallery.eventDate).toISOString().split('T')[0] : '',
      eventLocation: gallery.eventLocation || '',
      eventType: gallery.eventType || 'other'
    });
    setUploadedImages(gallery.images || []);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
          throw new Error('No authentication token found. Please log in as admin.');
        }

        const response = await fetch(buildApiUrl(`admin/gallery/${id}`), {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Gallery delete response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            showSuccess('Gallery deleted successfully');
            fetchGalleries();
          } else {
            throw new Error(data.message || 'Failed to delete gallery');
          }
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || `Failed to delete gallery with status ${response.status}`);
        }
      } catch (error) {
        console.error('Error deleting gallery:', error);
        showError(`Failed to delete gallery: ${error.message}`);
      }
    }
  };

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) {
      console.log('No files selected');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      console.log('Uploading files:', files.length, 'files');
      
      // Log file details for debugging
      Array.from(files).forEach((file, index) => {
        console.log(`File ${index + 1}:`, {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified
        });
      });

      const formData = new FormData();
      Array.from(files).forEach((file, index) => {
        console.log(`File ${index + 1}:`, file.name, file.type, file.size);
        formData.append('files', file); // Use 'files' not 'images'
      });

      const token = localStorage.getItem('adminToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in as admin.');
      }

      const response = await fetch(buildApiUrl('upload/multiple'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      console.log('Upload response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Upload response data:', data);
        
        if (data.success) {
          const newImages = data.data.map((file, index) => ({
            url: file.secure_url,
            cloudinaryId: file.public_id,
            alt: `Gallery image ${uploadedImages.length + index + 1}`,
            caption: '',
            format: file.format,
            width: file.width,
            height: file.height,
            bytes: file.bytes
          }));
          
          setUploadedImages(prev => [...prev, ...newImages]);
          showSuccess(`${files.length} images uploaded successfully to Cloudinary`);
          setUploadProgress(100);
        } else {
          throw new Error(data.message || 'Upload failed');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      showError(`Failed to upload images: ${error.message}`);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 2000);
    }
  };

  const removeImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.eventLocation?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = !yearFilter || gallery.customFields?.year?.toString() === yearFilter;
    const matchesFrequency = frequencyFilter === 'all' || gallery.eventFrequency === frequencyFilter;
    return matchesSearch && matchesYear && matchesFrequency;
  });

  const years = [...new Set(galleries.map(g => g.customFields?.year).filter(Boolean))].sort((a, b) => b - a);

  return (
    <Container>
      <Header>
        <Title>Gallery Management</Title>
        <Button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus /> Add Gallery Event
        </Button>
      </Header>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search galleries, locations, descriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={frequencyFilter}
          onChange={(e) => setFrequencyFilter(e.target.value)}
        >
          <option value="all">All Event Types</option>
          <option value="annual">Annual Events</option>
          <option value="monthly">Monthly Events</option>
          <option value="weekly">Weekly Events</option>
          <option value="one-time">One-time Events</option>
        </FilterSelect>
      </SearchBar>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: '#667eea' }} />
        </div>
      ) : filteredGalleries.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📸</EmptyIcon>
          <EmptyTitle>No Gallery Events</EmptyTitle>
          <EmptyText>Create your first gallery event to showcase your organization's milestones</EmptyText>
        </EmptyState>
      ) : (
        <GalleryGrid>
          {filteredGalleries.map((gallery) => (
            <GalleryCard
              key={gallery._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardHeader>
                <CardTitle>{gallery.title}</CardTitle>
                <CardYear>
                  <FaCalendarAlt /> {gallery.customFields?.year || 'No year'}
                </CardYear>
                <CardDescription>{gallery.content}</CardDescription>
              </CardHeader>
              
              {gallery.images && gallery.images.length > 0 && (
                <CardImages>
                  {gallery.images.slice(0, 6).map((image, index) => (
                    <ImageThumb
                      key={index}
                      src={image.url}
                      alt={image.alt}
                    />
                  ))}
                  {gallery.images.length > 6 && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      background: '#f8f9fa',
                      borderRadius: '6px',
                      color: '#7f8c8d',
                      fontSize: '0.8rem'
                    }}>
                      +{gallery.images.length - 6} more
                    </div>
                  )}
                </CardImages>
              )}
              
              <CardActions>
                <ActionButton
                  className="view"
                  onClick={() => window.open(`/gallery`, '_blank')}
                >
                  <FaEye /> View
                </ActionButton>
                <ActionButton
                  className="edit"
                  onClick={() => handleEdit(gallery)}
                >
                  <FaEdit /> Edit
                </ActionButton>
                <ActionButton
                  className="delete"
                  onClick={() => handleDelete(gallery._id)}
                >
                  <FaTrash /> Delete
                </ActionButton>
              </CardActions>
            </GalleryCard>
          ))}
        </GalleryGrid>
      )}

      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <Modal
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader>
                <ModalTitle>
                  {editingGallery ? 'Edit Gallery Event' : 'Add Gallery Event'}
                </ModalTitle>
                <CloseButton onClick={() => setShowModal(false)}>
                  <FaTimes />
                </CloseButton>
              </ModalHeader>

              <form onSubmit={handleSubmit}>
                <ModalContent>
                  <FormGroup>
                    <Label>Event Title *</Label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Annual Celebration 2024"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Year *</Label>
                    <Input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      min="2020"
                      max={new Date().getFullYear()}
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Event Frequency</Label>
                    <Select
                      value={formData.eventFrequency}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventFrequency: e.target.value }))}
                    >
                      <option value="one-time">One-time Event</option>
                      <option value="annual">Annual Event</option>
                      <option value="monthly">Monthly Event</option>
                      <option value="weekly">Weekly Event</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Event Date</Label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventDate: e.target.value }))}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Event Location</Label>
                    <Input
                      type="text"
                      value={formData.eventLocation}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventLocation: e.target.value }))}
                      placeholder="e.g., Community Center, Nairobi"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Event Type</Label>
                    <Select
                      value={formData.eventType}
                      onChange={(e) => setFormData(prev => ({ ...prev, eventType: e.target.value }))}
                    >
                      <option value="celebration">Celebration</option>
                      <option value="fundraiser">Fundraiser</option>
                      <option value="workshop">Workshop</option>
                      <option value="meeting">Meeting</option>
                      <option value="outreach">Outreach</option>
                      <option value="other">Other</option>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <Label>Description</Label>
                    <TextArea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe this event..."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </Select>
                  </FormGroup>

                <FormGroup>
                  <Label>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      style={{ marginRight: '0.5rem' }}
                    />
                    Mark as Featured (show in hero carousel)
                  </Label>
                </FormGroup>

                  <FormGroup>
                    <Label>Event Images (Cloudinary Storage)</Label>
                    <FileUploadArea
                      className={uploading ? 'uploading' : ''}
                      onClick={() => document.getElementById('image-upload').click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('dragover');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('dragover');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('dragover');
                        const files = Array.from(e.dataTransfer.files);
                        handleFileUpload(files);
                      }}
                    >
                      <FaUpload style={{ fontSize: '2rem', color: uploading ? '#27ae60' : '#667eea', marginBottom: '1rem' }} />
                      <p>{uploading ? 'Uploading to Cloudinary...' : 'Click to upload or drag and drop images here'}</p>
                      <p style={{ fontSize: '0.9rem', color: '#7f8c8d' }}>
                        Supports JPG, PNG, GIF up to 10MB each • Images stored in Cloudinary
                      </p>
                    </FileUploadArea>
                    
                    <UploadProgress show={uploading}>
                      <ProgressBar>
                        <ProgressFill progress={uploadProgress} />
                      </ProgressBar>
                      <ProgressText>
                        {uploading ? `Uploading... ${uploadProgress}%` : 'Upload Complete'}
                      </ProgressText>
                    </UploadProgress>
                    
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />

                    {uploadedImages.length > 0 && (
                      <ImageGrid>
                        {uploadedImages.map((image, index) => (
                          <ImageItem 
                            key={index}
                            selected={selectedImages.includes(index)}
                            onClick={() => {
                              if (selectedImages.includes(index)) {
                                setSelectedImages(prev => prev.filter(i => i !== index));
                              } else {
                                setSelectedImages(prev => [...prev, index]);
                              }
                            }}
                          >
                            <ImagePreview src={image.url} alt={image.alt} />
                            <ImageInfo>
                              <ImageTitle>{image.alt}</ImageTitle>
                              <ImageDetails>
                                <ImageDetail>
                                  <FaImage />
                                  {image.format ? image.format.toUpperCase() : 'Image'}
                                </ImageDetail>
                                {image.width && image.height && (
                                  <ImageDetail>
                                    <FaExpand />
                                    {image.width}×{image.height}
                                  </ImageDetail>
                                )}
                                {image.bytes && (
                                  <ImageDetail>
                                    {(image.bytes / 1024 / 1024).toFixed(1)}MB
                                  </ImageDetail>
                                )}
                              </ImageDetails>
                            </ImageInfo>
                            <ImageOverlay selected={selectedImages.includes(index)}>
                              ✓
                            </ImageOverlay>
                            <ImageActions>
                              <ImageActionButton onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}>
                                <FaTimes />
                              </ImageActionButton>
                            </ImageActions>
                          </ImageItem>
                        ))}
                      </ImageGrid>
                    )}
                    
                    {uploadedImages.length > 0 && (
                      <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>
                          <strong>{uploadedImages.length}</strong> images uploaded to Cloudinary • 
                          <strong> {selectedImages.length}</strong> selected
                        </p>
                      </div>
                    )}
                  </FormGroup>
                </ModalContent>

                <ModalFooter>
                  <CancelButton type="button" onClick={() => setShowModal(false)}>
                    Cancel
                  </CancelButton>
                  <SaveButton
                    type="submit"
                    disabled={uploading}
                    whileHover={{ scale: uploading ? 1 : 1.05 }}
                    whileTap={{ scale: uploading ? 1 : 0.95 }}
                  >
                    {uploading ? <FaSpinner className="fa-spin" /> : <FaSave />}
                    {uploading ? 'Saving...' : editingGallery ? 'Update Gallery' : 'Create Gallery'}
                  </SaveButton>
                </ModalFooter>
              </form>
            </Modal>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default AdminGallery;
