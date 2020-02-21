import React from 'react';
import './App.css';
import Navbar from './views/navbar';
import ViewRouter from './ViewRouter';
import { Container, Sidebar } from 'rsuite';

function App() {
  return (
    <Container>
      <Sidebar style={{ display: 'flex', flexDirection: 'column' }} width={250}>
        <Navbar></Navbar>
      </Sidebar>
      <ViewRouter></ViewRouter>
    </Container>
  );
}

export default App;
