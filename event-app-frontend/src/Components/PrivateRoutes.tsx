import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutes = () => {
    let isAuth = localStorage.getItem('email')
    return(isAuth ? <Outlet/> : <Navigate to="/login"/>)
}

export default PrivateRoutes;