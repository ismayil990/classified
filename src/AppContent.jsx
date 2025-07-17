import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext.jsx';
import BottomMenu from './components/BottomMenu.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import PostForm from './components/Newpost.jsx';
import ProductDetail from './components/ProductDetail.jsx';
import UserProfile from './components/Profile.jsx';
import Fetch from './components/profile-pages/fetchpage.jsx';
import PaymentPage from './components/payment/PaymentPage.jsx';
import Favorites from './components/Favorites.jsx';
import Stores from './components/Stores.jsx';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppContent() {
  const location = useLocation();
  const hideBottomMenu = location.pathname.startsWith('/product/');

  return (
    <>
      {!hideBottomMenu && <BottomMenu />}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/yeni" element={<PostForm />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/fetch" element={<Fetch />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default AppContent;
