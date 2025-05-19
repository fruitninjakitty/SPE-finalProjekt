import React, { useState } from 'react'

//react router dom is used to make the application single page and in this we use "to" instead of "href" as href takes us to a new page
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';



export default function Navbar() {

  let data = useCart();

  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          {/* link tag is the replacement of anchor tag and "to" is the replacement of "href" tag */}
          <Link className="navbar-brand fs-1 fst-italic" to="/">CouchPotato</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>

              {(localStorage.getItem("authToken")) ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""}

            </ul>
            {(!localStorage.getItem("authToken")) ?
              /* here d-flex class means that login aur signup button inline ajae kyuki by default div me ek k niche ek ate hai */
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1" to="/Login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </div>
              :<div>
              <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}} >
                My Cart{" "}
                <Badge pill bg='danger'>{data.length}</Badge>
              </div> 
              {cartView ? <Model onClose={()=>{setCartView(false)}} ><Cart/></Model> : null}
              <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                Logout
              </div>
              </div>
            }


          </div>
        </div>
      </nav>
    </div>
  )
}
