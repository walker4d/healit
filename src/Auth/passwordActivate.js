import React, { useState, useEffect } from 'react';
import './style.css';
import log from '../Auth/img/log.svg';
import reg from '../Auth/img/register.svg';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Swal from 'sweetalert2';


import { Link, Redirect, useHistory,useLocation} from 'react-router-dom';
 
 const PasswordActivate = ({match}) => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        password1: '',
        password2: '',
        token: '',
      textChange: 'Submit'
    });
      const { password1, password2, textChange, token } = formData;
      
      useEffect(() => {
          let token = match.params.token
          if(token) {
              setFormData({...formData, token,})
          }
          
      }, [])
    const handleChange = text => e => {
      setFormData({ ...formData, [text]: e.target.value });
    };
      const handleSubmit = e => {
        console.log(password1, password2)
      e.preventDefault();
      if ((password1 === password2) && password1 && password2) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios
          .put(`http://localhost:8000/password/reset`, {
              newPassword: password1,
              resetPasswordLink: token
          })
          .then(res => {
         
              setFormData({
                ...formData,
                 password1: '',
                password2: ''
              });
          
              
              Swal.fire({
                icon: 'success',
                title: ' ',
                text: res.data.message,
                footer: ''
              })
              
            //   window.location.reload(false);
              history.push("/Auth");
              

              
            
            
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title:'Something is wrong. Link might be expired. please try again!!',
              text: '',
              footer: ''
            })
          
          });
      } else {
     
        Swal.fire({
          icon: 'warning',
          title: 'Passwords don\'t matches',
          text: '',
          footer: ''
        })
      }
    };

        return (
            <div class="containers">
            <div class="forms-containers">
              <div class="signin-signup">
                <form class="sign-in-form"    onSubmit={handleSubmit} >
              <h2 class="title">Reset Your Password </h2>
                  <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password"
                    onChange={handleChange('password1')}
                    value={password1}
                   />
                  </div>
                  <div class="input-field">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Confirm Password" 
                      onChange={handleChange('password2')}
                      value={password2}
                    />
                  </div>
                  <input type="submit" value="Reset" class="btn solid" />
                
                  
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
                 
                </div>
                <img src={log} class="image" alt="" />
              </div>
              <div class="panel right-panel">
                  
                <div class="content">
                <Link class="btn transparent" to={{ pathname: '/', state:{}}}>  <i class="fas fa-home"></i> Home</Link>
              
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
      
                  
        )
    }

export default  PasswordActivate;
