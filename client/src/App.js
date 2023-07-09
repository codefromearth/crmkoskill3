import './App.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter,Route,Routes} from 'react-router-dom'
import HomePage from './component/HomePage';
import  Login  from './component/Login';
import RegisterPage from './component/RegisterPage';
import ProtectedRoute from './component/ProtectedRoute';
import PublicRoute from './component/PublicRoute';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'
     element={
      <ProtectedRoute>
         <HomePage/>
      </ProtectedRoute>
     }
     />
    <Route path='/login'
     element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path='/register' element={<PublicRoute><RegisterPage/></PublicRoute>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
