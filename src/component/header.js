import React, {  useState, useEffect } from 'react'
import { Link, Redirect, useHistory,useLocation,useRouteMatch } from 'react-router-dom';
import { authenticate, isAuth,signout } from '../helpers/auth';
import jwt from 'jsonwebtoken';
const Header = ({...match})=> {
  const location = useLocation();
  // let match = useRouteMatch("activation/:token");
  var str  = window.location.href;
  
  const history = useHistory();

  
const header = () =>{
  return (
          
    <div>

<header id="header" class="fixed-top">
<div class="container d-flex">

<div class="logo mr-auto">
<h1 class="text-light">
   <Link style={{color:"#3aac48"}}  to={{ pathname: '/', state:{}}}>Healit </Link>



    
    </h1>

</div>

<nav class="nav-menu d-none d-lg-block">
<ul>
  <li class="active"><a href="/">Home</a></li>

  <li class="drop-down"><a href="#">about</a>
    <ul>
      <li><a href="#"></a></li>
      <li><a href="#"></a></li>

      <li class="drop-down"><a href="#">Drop Down 2</a>
        <ul>
          <li><a href="#">Deep Drop Down 1</a></li>
          <li><a href="#">Deep Drop Down 2</a></li>
          <li><a href="#">Deep Drop Down 3</a></li>
          <li><a href="#">Deep Drop Down 4</a></li>
          <li><a href="#">Deep Drop Down 5</a></li>
        </ul>
      </li>
    </ul>
  </li>

  <li><a href="#">Diet and dishes</a></li>
  <li><a href="/blogs">Blogs</a></li>
  
  <li><a href="#">Contact</a></li>

{ isAuth() ?
  <li class="drop-down"><a href="#" style={{color:"#3aac48"}}>{isAuth().firstname  } {isAuth().lastname}</a>
    <ul>
      <li><Link to={{ pathname: '/profile', state:{}}}> <i class="fas fa-user"></i> Profile </Link></li>
      <li><a href="/create">  <i class="fas fa-feather-alt"></i> Create post  </a></li>
      <li><a href="/blogs">  <i class="fas fa-bell"></i>  Notification  </a></li>

      <li><a  href='#' onClick={() => signout(() => {history.push("/");})}> <i class="fas fa-sign-out-alt"></i> SignOut  </a></li>

    </ul>
  </li>
  
  : <li class="get-started"><a href="/Auth">Signup</a></li> 

}
</ul>
</nav>

</div>
</header>
    </div>
)
  
}

      if(location.pathname == '/Auth'){
      return <div></div>
    }
    else if (str.includes("activation/")){
    return <div></div>
    }else if (window.location.href == 'http://localhost:3000/password/forget'){
    return <div></div>
    }else if( str.includes("/password/reset/")){
    return <div></div>
     
    }else{
    
    return header();    
    }   
    }

export default  Header;

