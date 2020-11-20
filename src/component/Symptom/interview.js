import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';
import React, {  Component }  from 'react';
import axios from 'axios';
 class Interview extends Component {
  
  constructor(props) {
      super(props)
    this.state = {
    single_Answer:'',
    Answers_Group_Single_question:'',
    groupMulti:'',
    Question:{},
    pause:false,
  
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
    let disgonstic = {
      sex: this.props.state.gender,
  age: {
    value: this.props.state.age
  },
  evidence: this.props.state.evidence
}
    

this.state.Question = await axios.post(`http://localhost:8000/user/checkup`,  disgonstic )
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
          
                <label class="" >   <input class="form-check-input" type="radio" value={item.id}  onChange={this.Answers_Group_Single} name="dfas" id={item.id}   
         /> {this.state.Question.question.items[index].name}</label>
              </div>
   
        )
           }
        )
        }        
             <button type="button" data-value="true"  onClick={this.nextQuestion('GroupSingle')} class="next-question btn btn-success">next question</button> 
         
   
          
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
  
        <div class="input-group mb-3">
  <div class="input-group-prepend">

    <div class="input-group-text" style={{padding:'5px', background:'lightblue',color:'black'}}>
    <label>

    <input type="checkbox" aria-label="Checkbox for following text input"/>
wqrwrwveqv  qwr wqr
    </label>
  

</div>
    
            
  </div>
  </div>
  
  <div class="input-group mb-3">
  <div class="input-group-prepend">

    <div class="input-group-text" style={{padding:'5px', background:'lightblue',color:'black'}}>
    <label>

    <input type="checkbox" aria-label="Checkbox for following text input"/>

    </label>
  

</div>
    
            
  </div>
  </div>
  


     <div class="col-lg-6">
         
     </div>
      </form>
  </div>
  <br/>
  <br/>
   </div>
   )
  };
  
  nextQuestion =(value) =>{

console.log(value);
    if(value == 'GroupSingle'){
      if(this.state.Answers_Group_Single) {
      this.props.state.evidence.push({ id: this.state.Answers_Group_Single, choice_id: "present"});
      console.log('evidenvce ',this.props.state.evidence);
      this.state.Question = {};
      this.state.pause = false;
      
      this.forceUpdate();
      }
    }
    
  }
  SingleAnswer = (e) =>{

    console.log(e);
    // if(e.target !== undefined){
    //   this.single_Answer =e.target.id;

    // }
  }
  
  onGroup = (e) =>{

    this.groupMulti =e.target.id;
  }
  Answers_Group_Single =(e) =>{

    console.log(e.target.id);
    this.Answers_Group_Single_question =e.target.id;
  }
   AnswersSingle = () => {
    if(this.state.Question.question){
      this.state.pause = true;
    }
    console.log(this.state.Question.question.items);

    return(
      <div>
          <br/>
          <h2>{this.state.Question.question.text}</h2>
          <hr/>

     <div style={{padding:'50px'}}>
       
        {this.state.Question.question.items.map((item, index) => 
       
       {
         item.choices.map((i,index) =>{
return(
<button key={i.id} type="button" data-value="true" onClick={this.SingleAnswer} id={i.id} class="next-question btn btn-success">{i.label}</button>
)
         })
           }
        )
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

    
    if(  this.state.Question.question.type !== undefined){
  
    
    if(this.state.Question.question.type == "group_single"){
      return this.AnswersGroupSingle();
  
    } else if(this.state.Question.question.type == "group_multiple"){
  
      return this.AnswersGroupMultiple()
    } else  if(this.state.Question.question.type == "single"){
     return this.AnswersSingle();
    }
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
<div class="text-center"><button class="btn btn-success"  type="submit"  disabled={this.props.isFirst()} onClick={this.props.prev}><i class="fas fa-pencil-alt"></i> back </button></div>

</div>

<div class="col-lg-6">
  
</div>

<div class="col-lg-3">
<div class="text-center" >
    <button class="btn btn-success"  type="submit"  disabled={this.props.isLast()} onClick={this.props.next} ><i class="fas fa-pencil-alt"></i> next </button>
</div>

</div>
</div>

    </div>
    )
    }
 }

 
 export default Interview;
