import { BrowserRouter, Routes, Route } from 'react-router'
import Body from './components/Body'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Logout from './components/Logout'
import Profile from './components/Profile'

function App() {

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
