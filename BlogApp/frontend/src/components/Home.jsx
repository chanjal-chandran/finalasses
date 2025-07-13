import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button,
  Stack,
  Modal,
  TextField
} from '@mui/material';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    img_url: ''
  });

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get');
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch blog posts. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog post. Please try again later.');
    }
  };

  const handleEditClick = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      img_url: blog.img_url
    });
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setCurrentBlog(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/update/${currentBlog._id}`, formData);
      fetchBlogs();
      handleCloseModal();
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to update blog post. Please try again later.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item key={blog._id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.img_url || 'https://via.placeholder.com/400x200?text=No+Image'}
                alt={blog.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Stack direction="row" spacing={1}>
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => handleDelete(blog._id)}
                    sx={{ 
                      bgcolor: '#9c27b0',
                      '&:hover': { bgcolor: '#7b1fa2' }
                    }}
                  >
                    DELETE
                  </Button>
                  <Button 
                    variant="contained" 
                    size="small"
                    onClick={() => handleEditClick(blog)}
                    sx={{ 
                      bgcolor: '#9c27b0',
                      '&:hover': { bgcolor: '#7b1fa2' }
                    }}
                  >
                    UPDATE
                  </Button>
                </Stack>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <Modal
        open={editModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-blog-modal"
        aria-describedby="edit-blog-form"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography variant="h6" component="h2" mb={3}>
            Edit Blog Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <TextField
              fullWidth
              label="Image URL"
              name="img_url"
              value={formData.img_url}
              onChange={handleInputChange}
              margin="normal"
            />
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained"
                sx={{ 
                  bgcolor: '#9c27b0',
                  '&:hover': { bgcolor: '#7b1fa2' }
                }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default Home;