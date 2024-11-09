import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User"

function App() {
return(
  <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/User" element={<User/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
)
}
export default App
