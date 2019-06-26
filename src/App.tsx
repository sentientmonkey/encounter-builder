import React from 'react';
import './App.css';
import Encounter from './Encounter';
import { Container, Box } from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Container>
       <Box>
         <Encounter />
       </Box>
    </Container>
  );
}

export default App;
