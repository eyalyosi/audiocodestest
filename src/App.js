import Home from './pages/Home';
import NavBar from './components/NavBar';
import AddTest from './pages/AddTest';
import Suite from './pages/Suite'
import { Routes, Route } from "react-router-dom";
import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`

function App() {

  return (
    <AppContainer className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="suite" element={<Suite />} />
        <Route path="addTest" element={<AddTest />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
