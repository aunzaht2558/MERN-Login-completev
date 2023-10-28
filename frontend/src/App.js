import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Layout
import HeaderBar from "./layout/HeaderBar";
import { CssBaseline, Box, TextField } from "@mui/material";

import SideBar from "./layout/SideBar";

import FormProduct from "./components/FormProduct";
import FormEditProduct from "./components/FormEditProduct";
import TestRedux1 from "./components/TestRedux1";
import TestRedux2 from "./components/TestRedux2";

// pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";


// admin
import HomePageAdmin from "./components/pages/admin/HomePageAdmin";
import ManageUser from "./components/pages/admin/ManageUser";

// user
import HomepageUser from "./components/pages/user/HomepageUser";

// routes
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";

// function
import { currentUser } from "./functions/auth";

import { useDispatch } from "react-redux";
import { login } from "./store/userSlice";
import Notfound404 from "./components/pages/Notfound404";
import ResponsiveAppBar from "./layout/ResponsiveAppBar";


// notify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // javascript
  const dispatch = useDispatch();

  const idToken = localStorage.getItem("token");
  console.log("token", idToken);
  
  if (!idToken) {
  
    }
	else
	{
  currentUser(idToken)
    .then((res) => {
      console.log(res);
      dispatch(
        login({
          email: res.data.email,
          role: res.data.role,
          token: idToken,
        })
      );
    })
    .catch((err) => console.log(err));
	}
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <ToastContainer position="top-left"/>
        {/* Publish */}
        
        <Routes>
          <Route path="*" element={<Notfound404 text="The page you’re looking for doesn’t exist."/>} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* User */}
          <Route
            path="/user/index"
            element={
              <UserRoute>
                <HomepageUser />
              </UserRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/index"
            element={
              <AdminRoute>
                <HomePageAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <ManageUser />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/viewtable"
            element={
              <AdminRoute>
                <FormProduct />
              </AdminRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <FormEditProduct />
              </AdminRoute>
            }
          />
        </Routes>

        {/* <TestRedux1 />
        <hr />
        <TestRedux2 /> */}
      </>
    </BrowserRouter>
  );
}

export default App;
