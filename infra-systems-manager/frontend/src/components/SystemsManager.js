import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { getSystems, createSystem, updateSystem, deleteSystem } from '../services/api';

const SystemsManager = () => {
  const [systems, setSystems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    owner: '',
    status: 'active'
  });

  useEffect(() => {
    fetchSystems();
  }, []);

  const fetchSystems = async () => {
    try {
      const response = await getSystems();
      setSystems(response.data);
    } catch (error) {
      console.error('Error fetching systems:', error);
    }
  };

  const handleOpen = (system = null) => {
    if (system) {
      setEditingSystem(system);
      setFormData(system);
    } else {
      setEditingSystem(null);
      setFormData({
        name: '',
        description: '',
        owner: '',
        status: 'active'
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSystem(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingSystem) {
        await updateSystem(editingSystem.id, formData);
      } else {
        await createSystem(formData);
      }
      fetchSystems();
      handleClose();
    } catch (error) {
      console.error('Error saving system:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this system?')) {
      try {
        await deleteSystem(id);
        fetchSystems();
      } catch (error) {
        console.error('Error deleting system:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add System
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {systems.map((system) => (
              <TableRow key={system.id}>
                <TableCell>{system.name}</TableCell>
                <TableCell>{system.description}</TableCell>
                <TableCell>{system.owner}</TableCell>
                <TableCell>{system.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(system)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(system.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingSystem ? 'Edit System' : 'Add System'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Owner"
            fullWidth
            variant="outlined"
            value={formData.owner}
            onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            select
            SelectProps={{ native: true }}
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingSystem ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SystemsManager;