import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Auth from './components/Auth';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Project from './components/Project';
import PageNotFound from './components/PageNotFound'




function App() {
  return (
    <div className="App text-center">
      

     <section>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/projects' element={<Project/>}/>
      <Route path='/*' element={<PageNotFound/>}/>

      
     </Routes>
     </section>

     <footer>
      <Footer/>
      </footer>
    </div>
  );
}

export default App;
