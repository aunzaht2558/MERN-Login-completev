import React from "react";
import { useSelector } from "react-redux";
import ResponsiveAppBar from "../layout/ResponsiveAppBar";
import Notfound404 from "../components/pages/Notfound404";
;

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.user.email && user.user.token ? (
    <>
      <ResponsiveAppBar />
      {children}
    </>
  ) : (
    <Notfound404 text="No login" />
  );
};

export default UserRoute;
