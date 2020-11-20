import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

 const Symptoms = (props) =>{

    const options = [
       
      ]
      let optionsValue =[];
    const symptomsData =[];
    console.log(props.state);
    function handleSubmit (e) {
  
       
        
    }
    const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
    const loadSearch = async(data) =>{
        console.log(data);
  return await  axios.post(`http://localhost:8000/health/Symptoms`,  data )
    .then(res => {
      console.log(res.data);
    return res.data;
       
      
    })   
    .catch(err => {
    console.log(err);
     alert(err.response.data.error);
    });

     //  
    }
    const loadOptions = async(inputValue) => {
       await sleep(1000);
       let  data = {age:props.state.age, gender:props.state.gender, search:inputValue};
          console.log('handle input', data);
          
let symptomsData =   await   loadSearch(data);
console.log('before');
let newData =[];
for (let d of symptomsData) {
  console.log(d,"data");
   newData.push({value: d.id, label: d.label})
  
}
console.log('after');
  
console.log(inputValue);
        return  newData ;
      }

      const handleInputChange = async(e)=>{
         
      }
   const   handleChange = (selectedOption) => {
     optionsValue = selectedOption;
    console.log('all symptoms selected..',selectedOption,optionsValue);   
    };
    const next =() =>{
      if(optionsValue.length != 0){
        let evidence  =props.state.evidence;
        console.log(optionsValue);
        let length = props.state.evidence.length;


        if(props.state.p_10 !== undefined ){ props.state.evidence[0].choice_id = props.state.p_10}else{props.state.evidence[0].choice_id = "absent"};
        if( props.state.p_7 !== undefined  ){ props.state.evidence[1].choice_id  = props.state.p_7}else{props.state.evidence[1].choice_id = "absent"};

   
   if(     props.state.p_9 !== undefined ){ props.state.evidence[2].choice_id = props.state.p_9}else{props.state.evidence[2].choice_id = "absent"};
        if(props.state.p_8 !== undefined ){ props.state.evidence[3].choice_id = props.state.p_8}else{props.state.evidence[3].choice_id = "absent"};
        if(props.state.p_147 !== undefined){ props.state.evidence[4].choice_id = props.state.p_147}else{props.state.evidence[4].choice_id = "absent"};
        if(props.state.p_28 !== undefined ){ props.state.evidence[5].choice_id = props.state.p_28}else{props.state.evidence[5].choice_id = "absent"};
       
    console.log(props.state.evidence);
    console.log(props.state);
    for(let option of optionsValue){
console.log(option)
      props.state.evidence.push( {id: option.value, choice_id: "present", source: 'initial'})
    }
  
    console.log('finale value', props.state.evidence);

      }else{
        alert('please select what symptoms you are feeling');
      }
      
    props.next();
    }
    return(
    <div>
<div class=" mt-5 mt-lg-0" data-aos="fade-left">

 
 <h3>Search and select a symptom that you are feeling..</h3>
 <br/>
   <AsyncSelect isMulti cacheOptions defaultOptions loadOptions={loadOptions} onChange={handleChange}/>


</div>


<hr/>
<div style={{marginTop:'150px'}} class="row">

<div class="col-lg-3">
<div class="text-center"><button class="btn btn-success"  type="submit"  disabled={props.isFirst()} onClick={props.prev}><i class="fas fa-pencil-alt"></i> back </button></div>

</div>

<div class="col-lg-6">
  
</div>

<div class="col-lg-3">
<div class="text-center" >
    <button class="btn btn-success"  type="submit"  disabled={props.isLast()} onClick={(e) => next()} ><i class="fas fa-pencil-alt"></i> next </button>
</div>

</div>
</div>
    </div>
    )

 }

 
 export default Symptoms;
