import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';
import React, {  Component }  from 'react';
import axios from 'axios';
 class Interview extends Component {
  
  constructor(props) {
      super(props)
    this.state = {
    single_Answer:'',
    Answers_Group_Single_question:'',
    groupindex:0,
    groupMulti:'',
    Question:{},
    questionType:'',
    pause:false,
    disgonstic:{}
  
    };
  }

  componentDidUpdate () {

    if(this.state.pause == false){
     this.state.Question =  this.Loadquestions();
    }
  }
  componentDidMount  (){

    if (!this.state.Question) {
            (async () => {
                try {
                    this.setState({Question: await this.Loadquestions()});
                    console.log(this.state.Question, 'questions');
                } catch (e) {
                    //...handle the error...
                }
            })();
  }

  }


  componentWillUpdate(){
    
    if(this.state.pause == false){
      if (!this.state.Question) {
        (async () => {
            try {
                this.setState({Question: await this.Loadquestions()});
                console.log(this.state.Question, 'questions');
            } catch (e) {
                //...handle the error...
            }
        })();
}
     }
  }
   Loadquestions = async() => {
    this.state.disgonstic = {
      sex: this.props.state.gender,
  age: {
    value: this.props.state.age
  },
  evidence: this.props.state.evidence
}
    

this.state.Question = await axios.post(`http://localhost:8000/user/checkup`,  this.state.disgonstic )
.then(res => {

  console.log('q',res.data);
  this.props.setState("question",res.data);
return res.data;
   
  
})   
.catch(err => {
console.log(err);
 alert( err );
});
    

   }

    handleSubmit = e => {
  
        
    }
     AnswersGroupSingle = () => {
   
      if(this.state.Question.question){
        this.state.pause = true;
      }
        return (
         <div>
             <h3>{this.state.Question.question.text}</h3>
             <hr/>
        
           <div class="form-group">

                 
        {this.state.Question.question.items.map((item, index) => {
        
        return(  <div key={item.id} >
          
                <label class="" >   <input class="form-check-input" type="radio" value={item.id}  onChange={this.Answers_Group_Single} name="GroupSingle" id={item.id}   
         /> {this.state.Question.question.items[index].name}</label>
              </div>
   
        )
           }
        )
        }        
             <a type="button" data-value="true"  onClick={this.nextQuestion} class="next-question btn btn-success">next question</a> 
         
   
          
        </div>
                                  {/* <div class="form-group">
                           
                                 <label class="" >  <input class="form-check-input" type="radio" name="dfas" id="exampleRadios2"    
                          /> question group1</label>
                   
                               
                           
                         </div>
                         <div class="form-group">
                               
                           
                          
                                 <label class="" >      <input class="form-check-input" type="radio" name="dfas" id="exampleRadios2"    
                          /> question group1</label>
                           
                               
                           
                         </div> */}

                                            
        
          </div>
        );
    }
 
    
   
 AnswersGroupMultiple = () => {
    return (
<div >
  <div >
<h3>{this.state.Question.question.text}</h3>
<hr/>
      <form>
          
        <br/>
  
  
                 
        {this.state.Question.question.items.map((item, index) => {
        
        return(  <div key={item.id} >
          
                <label class="" >   <input class="form-check-input" type="radio" value={item.id}  onChange={this.Answers_Group_Single} name="GroupSingle" id={item.id}   
         /> {this.state.Question.question.items[index].name}</label>
              </div>
   
        )
           }
        )
        }        
             <a type="button" data-value="true"  onClick={this.nextQuestion} class="next-question btn btn-success">next question</a> 
         
        {/* <div class="input-group mb-3">
  <div class="input-group-prepend">

    <div class="input-group-text" style={{padding:'5px', background:'lightblue',color:'black'}}>
    <label>

    <input type="checkbox" aria-label="Checkbox for following text input"/>
wqrwrwveqv  qwr wqr
    </label>
  

</div>
    
            
  </div>
  </div> */}
  
  {/* <div class="input-group mb-3">
  <div class="input-group-prepend">

    <div class="input-group-text" style={{padding:'5px', background:'lightblue',color:'black'}}>
    <label>

    <input type="checkbox" aria-label="Checkbox for following text input"/>

    </label>
  

</div>
    
            
  </div>
  </div> */}
  


     <div class="col-lg-6">
         
     </div>
      </form>
  </div>
  <br/>
  <br/>
   </div>
   )
  };
  
  nextQuestion = async() =>{
console.log(' next question');
console.log(this.state.questionType, this.state.Answers_Group_Single_question);
// console.log(value);
    if(this.state.questionType == 'GroupSingle'){
      if(this.state.Answers_Group_Single != '') {
       this.state.disgonstic.evidence.push({ id:this.state.Answers_Group_Single_question, choice_id: "present"});
     console.log('evidenvce ',this.state.disgonstic.evidence);
//       this.state.Question = {};
//       this.state.pause = false;
      
    
//       }else{
//         console.log(' null or empty ')
      }
    }else if(this.state.questionType == 'single'){


    }


    this.state.Question = await axios.post(`http://localhost:8000/user/checkup`,  this.state.disgonstic )
.then(res => {

  console.log('q',res.data);
  this.props.setState("question",res.data);
return res.data;
   
  
})   
.catch(err => {
console.log(err);
 alert( err );
});
     this.forceUpdate();
    
  }
  SingleAnswer = async(e) =>{

    console.log(e.target.id, e.target.name);
    this.state.disgonstic.evidence.push({ id: e.target.name, choice_id: e.target.id });
    this.state.Question = await axios.post(`http://localhost:8000/user/checkup`,  this.state.disgonstic )
    .then(res => {
    
      console.log('q',res.data);
      this.props.setState("question",res.data);
    return res.data;
       
      
    })   
    .catch(err => {
    console.log(err);
     alert( err );
    });
         this.forceUpdate();
  }
  
  onGroup = (e) =>{

    this.groupMulti =e.target.id;
  }
  Answers_Group_Single =(e) =>{

    console.log(e.target.id);
    this.state.Answers_Group_Single_question =e.target.id;
    this.state.questionType = e.target.name;
  }
   AnswersSingle = () => {
    if(this.state.Question.question){
      this.state.pause = true;
    }
    this.state.questionType = 'single';
    console.log(this.state.Question.question.items);

    return(
      <div>
          <br/>
          <h2>{this.state.Question.question.text}</h2>
          <hr/>

     <div style={{padding:'50px'}}>
       
        {this.state.Question.question.items[0].choices.map((item, index) => {
        
return(
 <div key={item.id}>
    <input type="button"  value={item.label}   class="next-question btn btn-danger"  onClick={this.SingleAnswer} name={this.state.Question.question.items[0].id} id={item.id}   
         />
    {/* <button type="button" data-value="false"  onClick={this.SingleAnswer} class="next-question btn btn-danger">{item.label}</button> */}
   </div>
)
         })
           }
        
        
        {/* <button type="button" data-value="true"  nextQuestion class="next-question btn btn-success">Yes</button>
        <button type="button" data-value="false" class="next-question btn btn-danger">No</button>
        <button type="button" data-value="unknown" class="next-question btn btn-info">Skip question</button>
       */}
     </div>
       <br/>
       
<br/>
      </div>)
    
  };

    displayQuestions  () {
      console.log('question',this.state.Question);
    if(this.state.Question.question !== undefined ){

      if(this.state.Question.should_stop == false){

    
    if(  this.state.Question.question.type !== undefined){
  
    
    if(this.state.Question.question.type == "group_single"){
      return this.AnswersGroupSingle();
  
    } else if(this.state.Question.question.type == "group_multiple"){
  
      return this.AnswersGroupMultiple()
    } else  if(this.state.Question.question.type == "single"){
     return this.AnswersSingle();
    }


  }
  }else {
    return <div> {<Redirect to={{
      pathname: '/Result',
      state: { diognistic: this.state.disgonstic,question:this.state.Question }}}
/>} </div>
  }
}
  }
  render(){
 
    return(
    <div>
<div class="col-lg-12 mt-5 mt-lg-0" data-aos="fade-left">
<form   role="form" class="php-email-form">
 

 
 {
  this.displayQuestions()  }



</form>

</div>


<hr/>
<div class="row">

<div class="col-lg-3">
<div class="text-center"></div>

</div>

<div class="col-lg-6">
  
</div>

<div class="col-lg-3">
<div class="text-center" >
    <button class="btn btn-success"  type="submit"  disabled={this.props.isLast()} onClick={this.props.next} > <i class="fas fa-chevron-circle-right"></i> next </button>
</div>

</div>
</div>

    </div>
    )
    }
 }

 
 export default Interview;
