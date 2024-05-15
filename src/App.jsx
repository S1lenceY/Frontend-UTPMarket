import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import PublicRoute from "./Auth/PublicRoute";
import AuthContextProvider from "./Auth/authContext";
import { LOGIN, LOGOUT, CHAT, ERROR, INICIO, MAIN, PRODUCTOS, CANJEAR, CARRITO } from "./Path/Paths";
import Chat from "./Components/Chat";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import ErrorPage from "./Error/ErrorPage";
import Inicio from "./Components/Inicio";
import Productos from "./Components/Productos";
import Canjear from "./Components/Canjear";
import Carrito from "./Components/Carrito";
import getProducts from "./Path/Apis.jsx/getProductos";

const router = createBrowserRouter([
  {
    path: CHAT,
    element: <PrivateRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: MAIN,
        element: <Chat />,
        children: [
          {
            path: INICIO,
            element: <Inicio />,
          },
          {
            path: PRODUCTOS,
            loader: getProducts,
            element: <Productos />,
          },
          {
            path: CANJEAR,
            element: <Canjear />,
          },
          {
            path: CARRITO,
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
