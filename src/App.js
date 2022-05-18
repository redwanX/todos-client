import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Header from './Pages/Shared/Header/Header';
import Login from './Pages/Authentication/Login/Login';
import { ToastContainer } from 'react-toastify';
import Register from './Pages/Authentication/Register/Register';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        </Routes>
        <ToastContainer></ToastContainer>

    </div>
  );
}

export default App;
