import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from './components/Header'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User"

function App() {

  const isAuthenticated = useSelector((state) => state.authentication.isAuthenticated); 

return(
  <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={isAuthenticated ? <Navigate to={"/User"} /> : <Login/>} /> 
      <Route path="/User" element={isAuthenticated ? <User/> : <Navigate to={"/Login"} /> } /> 
      </Routes>
      <Footer/>
    </BrowserRouter>
)
}
export default App
