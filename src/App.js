import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import store from './redux/store';
import {Provider} from 'react-redux'
import Home from './pages/Home';
import Login from './pages/logix';
import SignUp from './pages/signup';
import ErrorPage from './pages/ErrorPage';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Product from './pages/Product';
import EditProduct from './pages/EditProduct';

const router = createBrowserRouter ([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'login',
    element:<Login/>
  },
  {
    path:'signup',
    element:<SignUp/>
  },
  {
    path:'profile',
    element:<Profile/>
  },
  {
    path:'product',
    element:<Product/>
  },
  {
    path:'product/:id',
    element:<EditProduct/>
  },
  {
    path:'cart',
    element:<Cart/>
  },
  {
    path:'category/:id',
    element:<Category/>
  },
  {
    path:'*',
    element:<ErrorPage/>
  }
])

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  );
}

export default App;
