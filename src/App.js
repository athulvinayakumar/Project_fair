import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Project from './pages/Project';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { tokenAuthContext } from './contexts/ContextShare';
import { useContext } from 'react';


function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)
  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/login'} element={ <Auth/>}/>
        <Route path={'/register'} element={<Auth register/>}/>
        <Route path={'/project'} element={<Project/>}/>
        <Route path={'/dashboard'} element= {isAuthorized?<Dashboard dashboard/>:<Home/>}/>
       
      </Routes> 
      <Footer/>  
    </div>
  );
}

export default App;
