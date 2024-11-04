import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from "./components/Footer";

function App() {
return(
  <BrowserRouter>
      <Header />
      <Footer/>
    </BrowserRouter>
)
}
export default App
