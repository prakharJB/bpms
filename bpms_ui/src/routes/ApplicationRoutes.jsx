import React, { Suspense, useMemo, useState, useEffect, useContext } from 'react';
import { Routes, Route, useLocation, Outlet, useNavigate, Router } from 'react-router-dom';
const Home = React.lazy(() => import('../screens/Home'));
const SignIn = React.lazy(() => import('../screens/SignIn'));
const SignUp = React.lazy(() => import('../screens/SignUp'));

function ApplicationRoutes() {

    return (
        <>
         <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Signup" element={<SignUp />} />
         <Route path="/Login" element={<SignIn />} />
         </Routes>
        </>
    )

}

export default ApplicationRoutes;