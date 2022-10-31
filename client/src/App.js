import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Callback from './Callback';

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./error-page";
const router = createBrowserRouter([
  {
    path: "/callback",
    element: <Callback />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

function App() {

  return (
    <div className="App">
       <RouterProvider router={router}/>
    </div>
  );
}

export default App;
