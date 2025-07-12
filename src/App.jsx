import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/authContext.jsx';
import Header from './components/Header';
import PostForm from './components/Newpost.jsx';
import Home from './components/Home.jsx';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import BottomMenu from './components/BottomMenu.jsx';
import UserProfile from './components/Profile.jsx';
import Profile from './components/Profile.jsx';
import Fetch from './components/profile-pages/fetchpage.jsx';
import PaymentPage from './components/payment/PaymentPage.jsx';

// Protected Route komponenti
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BottomMenu/>
        <div className='w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/yeni" element={<PostForm />}/>
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/user" element={<UserProfile/>} />
            <Route path="/fetch" element={<Fetch/>} />
            <Route path="/payment/:id" element={<PaymentPage/>} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
    </AuthProvider>
  );
}

export default App;
