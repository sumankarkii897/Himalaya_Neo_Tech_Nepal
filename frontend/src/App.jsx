import React from 'react'
import {ToastContainer} from 'react-toastify';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Layout from './pages/Layout';
import PageNotFound from './pages/PageNotFound';
import SingleSolution from './components/SingleSolution';
import EditSolution from './components/EditSolution';
import CreateSolution from './pages/CreateSolution';
import Dashboard from './pages/Dashboard';
import Admin from './components/Admin';
import Protected from './components/Protected';
function App() {
  return (
    <>
    <ToastContainer
    autoClose={3000}
    position='top-right'
    />

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route element={<Layout/>}>
      <Route path="/" element={<Protected>
        <Home/>
      </Protected>} />
      <Route path="/profile" element={<Protected>
        <Profile/>
      </Protected>} />
      <Route path="/solution/:id" element={<Protected>
        <SingleSolution/>
      </Protected>} />
      <Route path="/solution/edit/:id" element={<Admin>
        <EditSolution/>
      </Admin>} />
      <Route path="/create/solution" element={<Admin>
        <CreateSolution/>
      </Admin>} />
      <Route path="/dashboard" element={<Admin>
        <Dashboard/>
      </Admin>} />
      <Route path="*" element={<PageNotFound/>} />  
      </Route>
    </Routes>
    </>
  )
}

export default App