import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import PublicRoute from "./Auth/PublicRoute";
import AuthContextProvider from "./Auth/authContext";
import {
  LOGIN,
  LOGOUT,
  CHAT,
  ERROR,
  INICIO,
  MAIN,
  PRODUCTOS,
  CANJEAR,
  CARRITO,
} from "./Path/Paths";
import ErrorPage from "./Error/error-page"
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Inicio from "./Components/Inicio";
import Productos from "./Components/Productos";
import Canjear from "./Components/Canjear";
import Carrito from "./Components/Carrito";
import getProducts from "./Path/Apis.jsx/getProductos";
import getCanjear from "./Path/Apis.jsx/getCanjear";
import getRecomended from "./Path/Apis.jsx/getRecomended"
import getCupon from "./Path/Apis.jsx/getCupon"

const router = createBrowserRouter([
  {
    path: CHAT,
    element: <PrivateRoute />,
    children: [
      {
        path: MAIN,
        element: <Chat />,
        children: [
          {
            path: INICIO,
            loader: getRecomended,
            element: <Inicio />,
          },
          {
            path: PRODUCTOS,
            loader: getProducts,
            element: <Productos />,
          },
          {
            path: CANJEAR,
            loader: getCanjear,
            element: <Canjear />,
          },
          {
            path: CARRITO,
            loader: getCupon,
            element: <Carrito />,
          },
        ],
      },
      {
        path: LOGOUT,
        element: <Logout />,
      },
    ],
  },
  {
    path: "/",
    element: <PublicRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: LOGIN,
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
};

export default App;
