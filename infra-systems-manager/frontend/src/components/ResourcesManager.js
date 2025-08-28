import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography
} from '@mui/material';
import { getResources } from '../services/api';

const ResourcesManager = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await getResources();
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Computational Resources
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>CPU Cores</TableCell>
              <TableCell>Memory (GB)</TableCell>
              <TableCell>Storage (GB)</TableCell>
              <TableCell>Hostname</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>OS</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((resource) => (
              <TableRow key={resource.id}>
                <TableCell>{resource.resource_type}</TableCell>
                <TableCell>{resource.cpu_cores}</TableCell>
                <TableCell>{resource.memory_gb}</TableCell>
                <TableCell>{resource.storage_gb}</TableCell>
                <TableCell>{resource.hostname}</TableCell>
                <TableCell>{resource.ip_address}</TableCell>
                <TableCell>{resource.os}</TableCell>
                <TableCell>{resource.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ResourcesManager;