import React, { useState } from 'react';
import './style.css';
import log from '../Auth/img/log.svg';
import reg from '../Auth/img/register.svg';
import axios from 'axios';
import Swal from 'sweetalert2';


import { Link, Redirect, useHistory,useLocation} from 'react-router-dom';
 
 const ForgetPassword = () => {
 
    const [formData, setFormData] = useState({
        email: '',
        textChange: 'Submit'
      });
      const { email, textChange } = formData;
      const handleChange = text => e => {
        setFormData({ ...formData, [text]: e.target.value });
      };
      const handleSubmit = e => {
        e.preventDefault();
        if (email) {
          setFormData({ ...formData, textChange: 'Submitting' });
          axios
            .post(`http://localhost:8000/password/forgot`, {
              email:email
            })
            .then(res => {
              
                setFormData({
                  ...formData,
                  email: '',
                });
         
                Swal.fire({
                  icon: 'success',
                  title: ' ',
                  text: 'please check your Email  to Reset your Password.',
                  footer: ''
                })
            })
            .catch(err => {
          
           
             Swal.fire({
              icon: 'error',
              title: err.response.data.error,
              text: '',
              footer: ''
            })
            });
        } else {
     
          Swal.fire({
            icon: 'warning',
            title: 'Please fill all fields',
            text: '',
            footer: ''
          })
        }
      };
        return (
         
            <div class="containers">
 <div class="forms-containers">
   <div class="signin-signup">
     <form class="sign-in-form"  onSubmit={handleSubmit} >
   <h2 class="title">Forgot Password </h2>
       <div class="input-field">
         <i class="fas fa-user"></i>
         <input type="email" placeholder="Email"
         onChange={handleChange('email')}
         value={email}
         />
       </div>
      
       <input type="submit" value="submit" class="btn solid" />
     
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

export default  ForgetPassword;
