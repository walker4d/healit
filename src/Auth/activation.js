
import './style.css';
import log from '../Auth/img/log.svg';
import reg from '../Auth/img/register.svg';
import { Link, Redirect, useHistory,useLocation} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticate, isAuth } from '../helpers/auth';
 
 const Activation = ({match}) => {
 console.log(match);


 const [formData, setFormData] = useState({
   
    token: '',
  
  });

  useEffect(() => {
    let token = match.params.token;
    let  token1  = jwt.decode(token);

    if (token) {
      setFormData({ ...formData,  token });
    }

    console.log(token1);
  }, [match.params]);
  const {  token } = formData;

  
function shoot() {
    axios
      .post(`http://localhost:8000/activation`, {
        token:token
      })
      .then(res => {
       
        // console.log(res.data.user);
        alert(res.data.message);

       
      })
      .catch(err => {
        console.log(err);
        alert('Link Expired. sign up again' + err.error);
      });
  }
 
        return (
            <div>
                 <div class="containers">
      <div class="forms-containers">
        <div class="signin-signup">
          <form class="sign-in-form"    >
        <h2 class="title">Welcome To Healit </h2>
        <br/>
           
            <a href="#" style={{width:500}} type="button" class="social-icon" class="btn solid" onClick={shoot} >
            <i class="fas fa-user-plus"></i> Activate Your Account
              </a>
           
          </form>
        
            
        </div>
      </div>

      <div class="panels-containers">
          
        <div class="panel left-panel">
          <div class="content">
        
    
            <br/>
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
           
              <Link class="btn transparent" style={{width:240}}  id="sign-up-btn" to={{ pathname: '/Auth', state:{}}}> <i class="fas fa-sign-in-alt"></i>  Signup or login </Link>
        
          </div>
          <img src={log} class="image" alt="" />
        </div>
        <div class="panel right-panel">
            
          <div class="content">
          {/* <Link class="btn transparent" to={{ pathname: '/', state:{}}}>  <i class="fas fa-home"></i> Home</Link> */}
        
            <br/>
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button class="btn transparent sign-up-mode" id="sign-in-btn" >
              Sign in
            </button>
          </div>
          <img src={reg} class="image" alt="" />
        </div>
      </div>
    </div>

            </div>
          
        )
    }

export default  Activation;
