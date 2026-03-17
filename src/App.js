import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import ListEvents from './pages/listEvents/ListEvents';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<ListEvents />} />
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
