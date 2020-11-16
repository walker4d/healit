import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';

 function Patient (props) {

   let evidence = [
            {id: "p_10", choice_id: "", "source": "predefined"}, //High cholesterol
            {id: "p_7", choice_id: "", "source": "predefined"},  // BMI over 30
            {id: "p_9", choice_id: "", "source": "predefined"},// Hypertension
            {id: "p_8", choice_id: "", "source": "predefined"}, // Diabetes
            {id: "p_147", choice_id: "", "source": "predefined"}, // Physical injury
            {id: "p_28", choice_id: "", "source": "predefined"}, // Smoking
      
            ];

           let  questions =[
                "I have high cholesterol",
                "My BMI is over 30",
                "I have hypertension",
                "I have diabetes",
                "I’ve been recently injured Physically",
                "I smoke"

            ];
    
    console.log(props.state);
    function handleSubmit (e) {
  
        
    }
   function componentWillUpdate () {
        console.log(questions)
    }
    return(
    <div>

<div class="col-lg-12">
    <h3>Please check all the statements below that apply to you</h3><br/>
    <h4>Select one answer in each row.</h4>
</div>
<br/>
<br/>
<div  class="row">
{evidence.map((evi, index) => (
<form  onSubmit={handleSubmit} role="form" class="php-email-form">
    
   

    <div   class="col-lg-12"> 
    <div  style={{marginRight:'200px'}}>
    <h6> {questions[index]} </h6>
     

   
       </div>
      
       <div class="row" style={{marginLeft:'20px'}}>
    
       <div class="col-lg-4 form-check">
  <input class="form-check-input" type="radio" name={evi.id} id="exampleRadios2" value={props.getState(evi.id, "present")}       onChange={props.handleChange}  
         />
  <label class="form-check-label" for="exampleRadios2">
   yes
  </label>
</div>



<div class="col-lg-4 form-check">
  <input class="form-check-input" type="radio" name={evi.id} id="exampleRadios2" 
     value={props.getState(evi.id, "absent")}
     onChange={props.handleChange}     />
  <label class="form-check-label" for="exampleRadios2">
   no
  </label>
</div>



<div class="col-lg-4 form-check">
  <input class="form-check-input" type="radio" name={evi.id} id="exampleRadios2"    value={props.getState(evi.id, "unknown")}
     onChange={props.handleChange} 
         />
  <label class="form-check-label" for="exampleRadios2">
   i don't know
  </label>
</div>

       </div>
</div>
  
  
  
    <br/>
    <hr/>


</form>
))}
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

 
 export default Patient;
