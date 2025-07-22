import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Favorites from './components/Favorites.jsx';
import Stores from './components/Stores.jsx';
import AdvancedSearch from './components/AdvancedSearch.jsx';
import About from './components/About.jsx';
import Terms from './components/Terms.jsx';

// Protected Route komponenti
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}


  // product detail səhifəsində bottommenu gizlətmək üçün

function App() {
    const location = useLocation();
     const hideBottomMenu =
  location.pathname.startsWith('/payment/') ||
  location.pathname.startsWith('/product/') ||
  location.pathname.startsWith('/advanced') ||
  location.pathname.startsWith('/yeni') ||
  location.pathname.startsWith('/haqqimizda') ||
  location.pathname.startsWith('/qaydalar');


  return (
    <AuthProvider>
    {!hideBottomMenu && <BottomMenu />}
        <div className='w-full'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/yeni" element={<PostForm />}/>
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/user" element={<UserProfile/>} />
            <Route path="/fetch" element={<Fetch/>} />
            <Route path="/favorites" element={<Favorites/>} />
             <Route path="/stores" element={<Stores/>} />
             <Route path="/advanced" element={<AdvancedSearch/>} />
             <Route path='/haqqimizda' element={<About/>}/>
             <Route path='/qaydalar' element={<Terms/>}/>
            <Route path="/payment/:id" element={<PaymentPage/>} />
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
    </AuthProvider>
  );
}

export default App;
