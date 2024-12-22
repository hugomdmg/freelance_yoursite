import Dashboard from './components/Dashboard';
import Login from './components/Login';
import NavBar from './components/Bar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CostumerMain from './components/CostumerMain';
import "./components/Bar/languages/i18n";
import PaymentPage from './components/Payment';
import AdminMain from './components/Admin_Main/AdminMain'
import Signup from './components/Singup';
import { AuthProvider } from './infraestructure/AuthContext';
import ManageAccount from './components/ManageAccount';
import Introduction from './components/Introduction';

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Introduction />
          <NavBar />
          <div className="App pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/costumer-main' element={<CostumerMain />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/admin-main' element={<AdminMain />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/account' element={<ManageAccount />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
