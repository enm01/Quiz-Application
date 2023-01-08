import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import { Box } from '@mui/system';
import {
  BrowserRouter as Router ,
  Routes ,
  Route
} from 'react-router-dom';
import FinalScore from './pages/FinalScore';
import Questions from './pages/Questions';
import Settings from './pages/Settings';

function App() {
  return (
  
    <Router >
        <Container maxWidth="sm">
          <Box textAlign="center" mt={5}>
            <Routes>
              <Route path="/" element={<Settings />} />
                

              
              <Route path="/Questions" element={<Questions />} />
              <Route path="/Score" element={<FinalScore />} />
            </Routes>
          </Box>
         
        </Container>
  
      
    </Router>
  
  );
}

export default App;
