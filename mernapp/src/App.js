
import './App.css';
import Home from './screens/Home';
import{
BrowserRouter as Router,
Routes,
Route,
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import AddItem from './screens/AddItem';


function App() {
  return (

    //isko cartProvider me isiliye wrap kiya hai taki kahi bhi ContextReducer me jo dispatch banaya hai
    //use kahi bhi use kr sake
    <CartProvider>

    {/* we can send only one div in return and if we want multiple divs we need nested divs */}
    <Router>
    
    <div>

    <Routes>
      <Route exact path="/" element = {<Home/>}></Route>
      <Route exact path='/Login' element = {<Login/>}></Route>
      <Route exact path='/createuser' element = {<Signup/>}></Route>
      <Route exact path='/myOrder' element = {<MyOrder/>}></Route>
      <Route exact path='/AddItem' element = {<AddItem/>}></Route>
    </Routes>

    </div>
    
    </Router>
    </CartProvider>
  );
}

export default App;
