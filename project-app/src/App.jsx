
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Redirect from './Components/Redirect';
import Main from './Components/Main';
import History from './Components/History';
import RedirectLogout from './Components/RedirectLogout';

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/redirect' element={<Redirect></Redirect>}></Route>
          <Route path='/main' element={<Main></Main>}></Route>
          <Route path='/history' element={<History></History>}></Route>
          <Route path='/redirectlogout' element={<RedirectLogout />}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
