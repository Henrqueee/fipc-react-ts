
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/useAuthStore';
import { VehicleProvider } from './store/useVehicleStore';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Favorites from './pages/Favorites/Favorites';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </VehicleProvider>
    </AuthProvider>
  );
}

export default App;
