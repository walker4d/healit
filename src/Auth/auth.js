  
import React, { useState } from 'react';
import { Link, Redirect, useHistory,useLocation} from 'react-router-dom';
 
import './style.css';
import log from '../Auth/img/log.svg';
import reg from '../Auth/img/register.svg';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { useForm } from "react-hook-form";

const Auth = () => {
  const location = useLocation();
  // console.log(location.pathname);
const [loginFromData, setLoginFormData] = useState({
    lpassword:'',
    lemail:'',

       });
  const [formData, setFormData] = useState({
    firstname: '',
    lastname:'',
    email: '',
    password: '',
    consfirmPassword:'',
    age: 0,
    gender:'male'

   
  });
  const [check,setcheck] = useState({});

  const { firstname,
  lastname,
  email,
  password,
  consfirmPassword,
  age,
  gender
} = formData;
const { auth, errors, handleSubmit } = useForm({
  mode: "onBlur"
});

const {
  auth: login,
  errors: errors2,
  handleSubmit: handleSubmit2
} = useForm({
  mode: "onBlur"
});

const {lemail,lpassword}=loginFromData;


const handleChange = text => e => {
  console.log(formData,  e.target.value );

  setFormData({ ...formData, [text]: e.target.value });
  console.log(loginFromData,e.target.value);
  setLoginFormData({ ...loginFromData, [text]: e.target.value });
};
const handleCheck = text => e => {

 
}

const register = e => {

  
  console.log(e);
  if (firstname && lastname && gender && email && password) {
    if (password === consfirmPassword) {
      setFormData({ ...formData });
      axios
        .post(`http://localhost:8000/register`, {
          firstname:firstname,
          lastname:lastname,
          age:20,
          gender:'male',
          email:email,
          password: password
        })
        .then(res => {
          // setFormData({
          
          //   firstname:'',
          // lastname:'',
          // age:0,
          // gender:'',
          // email:'',
          // password: ''
          // });
console.log(res);
         alert(res.data.message,'submitted');
        })
        .catch(err => {
          setFormData({
          
            firstname:'',
          lastname:'',
          age:0,
          gender:'',
          email:'',
          password: ''
          });
          console.log(err.data);
          alert(err.data);
        });
    } else {
alert('password does not match')
    }
  } else {
    alert('Please fill all fields');
  }
};


// const onSubmitEmail = data => {
//   alert(JSON.stringify(data));
// };

const history = useHistory();
const handleLoginSubmit = e => {
  // e.preventDefault();
  
  // console.log(loginFromData);
  if ( lemail && lpassword) {

      setLoginFormData({ ...loginFromData });
      axios
        .post(`http://localhost:8000/login`, {
          email:lemail,
          password: lpassword
        })
        .then(res => {

          setFormData({
          
            firstname:'',
          lastname:'',
          age:0,
          gender:'',
          email:'',
          password: ''
          });

authenticate(res, ()=>{

  
  console.log(res.data);
  alert('login WAS SUCCESFULL');
  if(isAuth()){

    history.push("/");
  

  }
 
})
      
        }).catch(err => {
          setLoginFormData({
          
          lemail:'',
          lpassword: ''
          });
          console.log(err.data);
          alert(err);
        });
    
  } else {
    alert('Please fill all fields');
  }
};





const container = document.querySelector(".containers");
const  sign_in =(e)=> {
    document.querySelector('.containers').classList.remove("sign-up-mode");

  
  }
  
  const sign_up =(e)=> {
document.querySelector('.containers').classList.add("sign-up-mode");
  }
  
        return (
          
            <div>
     {isAuth() ? <Redirect to='/' /> : null}
      <div class="containers">
      <div class="forms-containers">
        <div class="signin-signup">
          <form class="sign-in-form"  onSubmit={handleSubmit2(handleLoginSubmit)} >
        <h2 class="title">Sign in </h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Email"
                onChange={handleChange('lemail')}
                value={lemail} 
              />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password" 
                 onChange={handleChange('lpassword')}
                 value={lpassword} 
              />
            </div>
            <input type="submit" value="Login" class="btn solid" />
            <div class="read-more"><a href="/password/forget"> forgot password</a></div>
            
            <p class="social-text">Or Sign in with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          <form  class="sign-up-form"   onSubmit={handleSubmit(register)}>
            <h2 class="title">Sign up</h2>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="firstname"
               onChange={handleChange('firstname')}
               value={firstname} />
            </div>
            <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="lastname"
              onChange={handleChange('lastname')}
              value={lastname} />
            </div>
            {/* <div class="input-field">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div> */}
            <div class="input-field">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="Email" 
              onChange={handleChange('email')}
                  value={email}/>
            </div>
          
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="Password"   onChange={handleChange('password')}
                  value={password} />
            </div>
            <div class="input-field">
              <i class="fas fa-lock"></i>
              <input type="password" placeholder="confirm password"
                onChange={handleChange('consfirmPassword')}
                value={consfirmPassword} />
            </div>

           
            
            <div>
          
            <div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="male"   
  onClick={handleChange('gender')}  />
  <label class="form-check-label" for="exampleRadios1">
   male
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="female"  onClick={handleChange('gender')}
         />
  <label class="form-check-label" for="exampleRadios2">
   female
  </label>
</div>
</div>
            <input type="submit" class="btn" value="Sign up" />
            <p class="social-text">Or Sign up with social platforms</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div class="panels-containers">
          
        <div class="panel left-panel">
          <div class="content">
          <Link class="btn transparent" to={{ pathname: '/', state:{}}}>  <i class="fas fa-home"></i> Home</Link>
        
    
            <br/>
            <h3>New here ?</h3>
            <p>
              Join our Community that is actively engague in health and wellness...
            </p>
            <button class="btn transparent" onClick={sign_up} id="sign-up-btn">
              Sign up
            </button>
          </div>
          <img src={log} class="image" alt="" />
        </div>
        <div class="panel right-panel">
            
          <div class="content">
          <Link class="btn transparent" to={{ pathname: '/', state:{}}}>  <i class="fas fa-home"></i> Home</Link>
        
            <br/>
            <h3>One of us ?</h3>
            <p>
              welcome back our health and site...
            </p>
            <button class="btn transparent sign-up-mode" id="sign-in-btn" onClick={sign_in}>
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



export default  Auth;
