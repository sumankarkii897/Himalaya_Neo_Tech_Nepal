import React, {createContext, useState, useEffect}from 'react'
import API from '../services/Api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext()
function AuthProvider({children}) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const checkAuth = async()=>{
        try {
           const res = await API.get('/auth/profile')
           setUser(res.data.user);
        } catch (error) {
            setUser(null)
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        checkAuth();

    },[])
    const login = async () => {
        await checkAuth();
    }

    const logout = async () => {
        try {
            await API.post('/auth/logout')
            toast.success("Logout successful");
            navigate("/login");
            setUser(null)
        } catch (error) {
            toast.error("Logout failed");
            console.log("Logout Failed", error)
        }
    }
  return (
    <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider