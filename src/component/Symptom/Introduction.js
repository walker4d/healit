import { Component } from 'react';
import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';

 function Introduction (props) {

    

  
    // this.state = {
      
       
    //     gender:'',
    //     age:'',
       
    //     evidence:[
    //         {id: "p_10", choice_id: "", "source": "predefined"}, //High cholesterol
    //         {id: "p_7", choice_id: "", "source": "predefined"},  // BMI over 30
    //         {id: "p_9", choice_id: "", "source": "predefined"},// Hypertension
    //         {id: "p_8", choice_id: "", "source": "predefined"}, // Diabetes
    //         {id: "p_147", choice_id: "", "source": "predefined"}, // Physical injury
    //         {id: "p_28", choice_id: "", "source": "predefined"}, // Smoking
      
    //         ],
    //         questions:[
    //             "I have high cholesterol",
    //             "My BMI is over 30",
    //             "I have hypertension",
    //             "I have diabetes",
    //             "I’ve been recently injured Physically",
    //             "I smoke"

    //         ],
    //     Formcounter:0

      
    

    // };

  
 
    console.log(props.state);
    
  function  handleSubmit (e) {
  
        
    }
    return(
    <div>
  
  <div class="row">
  <div class="col-lg-3 mt-5 mt-lg-0" data-aos="fade-left">

<h5>welcome to Healt Self Diognostic </h5>
<br/>
<p>
You’re about to use a short (3 min), 
safe and anonymous health checkup. 
Your answers will be carefully 
analyzed and you’ll learn about possible causes of your symptoms.

</p>
    </div>
    <div class="col-lg-9 mt-5 mt-lg-0" data-aos="fade-left">
        <h5>Before we Start Please verify the information below</h5>
        <br/>
          
<form  onSubmit={handleSubmit} role="form" class="php-email-form">
<div class=" col-md-6 form-group">
    
    <input type='number' maxlength="3" class="form-control" name="age" id="subject" placeholder=" enter age" data-rule="minlen:1" data-msg="Please enter at least 8 chars of subject"
       	value={props.getState("age", "")}
           onChange={props.handleChange}  
    />
    <div class="validate"></div>
  </div>
  <div class=" col-md-6 form-group">
  <div class="form-group">

<select class="form-control" name="gender" 	
value={props.getState("gender", "")}
onChange={props.handleChange} 

>

<option value="male" >male</option>
<option value="female">female</option>


</select>
 </div>
 </div>
</form>

</div>
  </div>
    <br/>
<div class="col-lg-12 mt-5 mt-lg-0" data-aos="fade-left">
  

</div>

<hr/>
<div class="row">

<div class="col-lg-3">
<div class="text-center"><button class="btn btn-success"  type="submit"  disabled={props.isFirst()} onClick={props.prev}><i class="fas fa-pencil-alt"></i> back </button></div>

</div>

<div class="col-lg-6">
  
</div>

<div class="col-lg-3">
<div class="text-center" >
    <button class="btn btn-success"  type="submit"  disabled={props.isLast()} onClick={props.next} ><i class="fas fa-pencil-alt"></i> next </button>
</div>

</div>
</div>
    </div>
    )

 }

 
 export default Introduction;
