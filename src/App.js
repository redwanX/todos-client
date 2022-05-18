import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home/Home';
import Header from './Pages/Shared/Header/Header';
import Login from './Pages/Authentication/Login/Login';
import Todos from './Pages/Todos/Todos/Todos';
import { ToastContainer } from 'react-toastify';
import Register from './Pages/Authentication/Register/Register';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './Pages/Authentication/RequireAuth/RequireAuth';
import Footer from './Pages/Shared/Footer/Footer';
import PageNotFound from './Pages/Shared/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
        <Header></Header>
        <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/todos' element={<RequireAuth><Todos></Todos></RequireAuth>}></Route>
        <Route path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
        <ToastContainer></ToastContainer>
        <Footer></Footer>


    </div>
  );
}

export default App;
