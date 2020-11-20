import React, {  Component } from 'react'
import { Link, Redirect, useHistory,useLocation,useRouteMatch } from 'react-router-dom';
import { authenticate, isAuth,signout, updateUser } from '../../helpers/auth';
import axios from 'axios';
import Intro from '../Symptom/Introduction';
import Patient from '../Symptom/Patient';
import Simp from '../Symptom/symptoms';
import Interview from '../Symptom/interview';

import { Steps, Step } from "react-step-builder";

export default class Symptoms extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
      
       hi : 'hi',
        gender:'',
        age:'',
       
        evidence:[
            {id: "p_10", choice_id: "", "source": "predefined"}, //High cholesterol
            {id: "p_7", choice_id: "", "source": "predefined"},  // BMI over 30
            {id: "p_9", choice_id: "", "source": "predefined"},// Hypertension
            {id: "p_8", choice_id: "", "source": "predefined"}, // Diabetes
            {id: "p_147", choice_id: "", "source": "predefined"}, // Physical injury
            {id: "p_28", choice_id: "", "source": "predefined"}, // Smoking
      
            ],
            questions:[
                "I have high cholesterol",
                "My BMI is over 30",
                "I have hypertension",
                "I have diabetes",
                "I’ve been recently injured Physically",
                "I smoke"

            ],
        Formcounter:0

      
    

    };

  }
  componentDidMount(){
    

    


  }
 


  
  

    
 
   handleInputChange = text => e => {
   
  };
   handleChange = text => e => {
 

  };
conditionalStyle(con,un){
 let result = 'red';
  if(con == un) {
    return result;
  }  

  return '';

}
handleSubmit = e => {
  
        
      }
terms(){

}
verifyAgeAndGender(){
    
}
     checkform ( props) {
         return (
             
<div class="col-lg-12 mt-5 mt-lg-0" data-aos="fade-left">
 <form  onSubmit={this.handleSubmit} role="form" class="php-email-form">
   <div class="form-row">
     <div class="col-md-6 form-group">
       <input type="text"  class="form-control"placeholder="enter firstname"  style={{borderColor:this.conditionalStyle(this.state.firstname,'')}} data-msg="Please enter at least 4 chars" 
     onChange={(evt) => this.setState({firstname:evt.currentTarget.value})}  value={this.state.firstname}
     
      
       />
       <div class="validate"></div>
     </div>
     <div class="col-md-6 form-group">
       <input type="text" class="form-control" name="lastname" id="name" placeholder="enter  lastname" data-rule="name" data-msg="Please enter a valid email" 
         onChange={(evt) => this.setState({lastname:evt.currentTarget.value})}  value={this.state.lastname}  style={{borderColor:this.conditionalStyle(this.state.lastname,'')}}
       />
       <div class="validate"></div>
     </div>
     <div class="col-md-12 form-group">
       <input type="text" name="name" class="form-control" id="name" placeholder="please enter your username" data-rule="minlen:4" data-msg="Please enter at least 4 chars" 
            onChange={(evt) => this.setState({username:evt.currentTarget.value})}  value={this.state.username} 
       />
       <div class="validate"></div>
     </div>
     <div class=" col-md-6 form-group">
    
     <input type='number' maxlength="3" class="form-control" name="subject" id="subject" placeholder=" enter age" data-rule="minlen:1" data-msg="Please enter at least 8 chars of subject"
          onChange={(evt) => this.setState({age:evt.currentTarget.value})}  value={this.state.age}   style={{borderColor:this.conditionalStyle(this.state.age,'')}}
     />
     <div class="validate"></div>
   </div>
   <div class=" col-md-6 form-group">
   <div class="form-group">

<select class="form-control"   value={this.state.gender}  onChange={(evt) => this.setState({gender:evt.currentTarget.value})} >

<option value="male" >male</option>
<option value="female">female</option>


</select>
</div>

     
   </div>
   {/* <div class="form-group col-md-12 ">
     <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
     <div class="validate"></div>
   </div> */}
   </div>
  
   
  
   <div class="text-center"><button type="submit"><i class="fas fa-pencil-alt"></i> update </button></div>
 </form>

</div>


         );
     }  
   
setHi(val){
this.state.hi = val;
}
 
  render() {
    

    return (

      <div id="main">
        
      <section id="cta" class="cta" style={{height:'200px'}}>
<div class="container" data-aos="fade-in">

<div class="text-center">
    <h3>Self Diognostic</h3>
    <br/>
</div>

</div>
</section>


    <section id="about" class="about" style={{marginTop:'-100px'}}>
<div class="container" data-aos="fade-up">

<section  >
<div class="">



<div class="" data-aos="fade-up">
 <div class="col-lg-12 col-md-12" >
 <section id="contact" class="contact">
     
<div class="" style={{padding:'80px'}}>
   
<div class="row">


<div class="col-lg-3">
<h6>Introduction & User Info</h6>
</div>
<div class="col-lg-3">
<h4>Symptoms</h4>
</div>
<div class="col-lg-3">
<h4>Interview</h4>
</div>
<div class="col-lg-3">
<h4>Result</h4>
</div>
</div>
<hr/>


<Steps >
        <Step hi={this.state.hi} setHi={this.setHi} component={Intro} />
        <Step hi={this.state.hi} component={Patient} />
        <Step  hi={this.state.hi} component={Simp} />
        <Step  hi={this.state.hi} component={Interview} />
      
</Steps>


</div>
</section>

 </div>




</div>

</div>
</section>

</div>
</section>

 </div>
    )
 
}

       
    
}
