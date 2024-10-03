import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Index from '../Index/Index';
import Login from '../Login/Login';
import Dashbord from '../Admin/Dashbord/Dashbord';
import PrivateRoute from './PrivateRoute';


import { useEffect } from 'react';

const Root = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/login'){
            import ('../../assets/front/css/nucleo-icons.css');
            import ('../../assets/front/css/nucleo-svg.css');
            import ('../../assets/front/css/material-kit.css?v=3.0.4');
        }else if(location.pathname.startsWith('/admin')){
            import ("../../assets/admin/css/bootstrap.min.css");
            import ("../../assets/admin/css/now-ui-dashboard.min.css");
            import ("../../assets/admin/demo/demo.css");
        }else{
            import ('../../assets/front/css/nucleo-icons.css');
            import ('../../assets/front/css/nucleo-svg.css');
            import ('../../assets/front/css/material-kit.css?v=3.0.4');
        }
        
    },[location])
    return(
        <>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/admin" element=
                    {
                        <PrivateRoute>   
                            <Dashbord />
                        </PrivateRoute>
                    } />
                </Routes>
        </>
    );
};

const AppWrapper = () => (
    <Router>
        <Root />
    </Router>
);

export default AppWrapper;