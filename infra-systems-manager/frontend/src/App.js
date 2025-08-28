import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  AppBar, 
  Toolbar, 
  Box,
  Tab,
  Tabs
} from '@mui/material';
import SystemsManager from './components/SystemsManager';
import ResourcesManager from './components/ResourcesManager';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyITAM - Infrastructure Systems Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Systems" />
            <Tab label="Resources" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <SystemsManager />
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <ResourcesManager />
        </TabPanel>
      </Container>
    </div>
  );
}

export default App;