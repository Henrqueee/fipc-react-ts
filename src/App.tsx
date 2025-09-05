
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './store/useAuthStore';
import { VehicleProvider } from './store/useVehicleStore';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Routes from './Routes/Routes';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <VehicleProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes />
            </main>
            <Footer />
          </div>
        </Router>
      </VehicleProvider>
    </AuthProvider>
  );
}

export default App;
