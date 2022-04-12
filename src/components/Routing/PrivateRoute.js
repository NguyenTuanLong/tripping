import { Navigate, Route , Outlet} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
      localStorage.getItem("authToken") ? (
        <Outlet/>
      ) : (
        <Navigate to="/login" />
      )
  );
};

export default PrivateRoute;
