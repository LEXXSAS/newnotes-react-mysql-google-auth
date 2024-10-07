import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {createContext} from 'react';
import Layout from './components/Layout'
import NotFound from './pages/NotFound';
import Loginpagetwo from './pages/Loginpagetwo';
import UploadFile from './pages/UploadFile';
import Notes from './pages/Notes';
import 'react-toastify/dist/ReactToastify.css'
import Store from "./store/store";

const store = new Store();

export const Context = createContext({
  store,
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path: '/',
        element:<Notes />
      },
      {
        path: '/upload',
        element:<UploadFile />
      },
    ]
  },
  {
    path: "/logintwo",
    element: <Loginpagetwo />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <Context.Provider value={{store}}>
        <RouterProvider router={router} />
    </Context.Provider>
  )
}

export default App
