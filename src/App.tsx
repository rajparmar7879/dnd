import React from 'react'
import styled from 'styled-components'
import './App.css'
import Columns from './Columns'

function App() {
  return (
    <div className="App">
      <Container>
        <Header>Test</Header>
        <Columns />
      </Container>
    </div>
  );
}

export default App;


const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 10px;
`;

const Header = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 10px 0;
  margin-bottom:  10px;
  border-bottom: 1px solid #f3f0f0;
`;
