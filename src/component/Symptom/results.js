import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
export default class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Triage: null,
      questions: {},
      diognostic: {},
      conditions:null,
      conditionRecomended:null
    };
  }
  componentDidMount() {
    console.log(this.props.location.state);
    if(this.props.location.state !== undefined){
    this.state.conditions=this.props.location.state.question.conditions
    this.loadcondition();
    }
  }


  loadcondition = async() =>{

    
this.state.conditionRecomended = await axios.post(`http://localhost:8000/health/condition`, {condition:this.state.conditions[0].id} )
.then(res => {



return res.data;
   
  
})   
.catch(err => {
console.log(err);
 alert( err );
});
 
this.forceUpdate();

  }
loadRecomendation(){
    console.log('recomendations',this.state.conditionRecomended);

    if(this.state.conditionRecomended != null){
    return (
    <div class="col-md-12" >
    <div class="icon-box" data-aos="fade-up">
      <div class="icon">
        <i
          class="las la-basketball-ball"
          style={{ color: " #ff689b" }}
        ></i>
      </div>
      <h4 class="title">
        <a href="">Recomendation</a>
      </h4>
      <hr/>
      <div >
      <p >
      Your conditions <h4>{this.state.conditionRecomended.name}</h4> is <h4>{this.state.conditionRecomended.severity}</h4> and  we recomend 
   <h4> {this.state.conditionRecomended.extras.hint} </h4>   the Triage Level for this is <h4> {this.state.conditionRecomended.triage_level} </h4>
      </p>
    
      </div>
    </div>
  </div>)
  }else {
      return (<div class="col-md-12">
      <div class="icon-box" data-aos="fade-up">
        <div class="icon">
          <i
            class="las la-basketball-ball"
            style={{ color: " #ff689b" }}
          ></i>
        </div>
        <h4 class="title">
          <a href="">Recomendation</a>
        </h4>
        <p class="description">
          No recomendations
        </p>
      </div>
    </div>)
  }
}
  LoadResults(){
    // {this.state.Question.question.items.map((item, index) => {
        
    //     return(  <div key={item.id} >
          
    //             <label class="" >   <input class="form-check-input" type="radio" value={item.id}  onChange={this.Answers_Group_Single} name="GroupSingle" id={item.id}   
    //      /> {this.state.Question.question.items[index].name}</label>
    //           </div>
   
    //     )
    //        }
    //     )
    //     }  

return (<div  class="row">
     {this.props.location.state.question.conditions.map((condition, index) => {
      
       return ( <div  class="col-md-12">
        <div class="icon-box" data-aos="fade-up" >
        <div class="icon">
          <i class="las la-book" style={{ color: "#3aac48" }}></i>
        </div>
        <h4 class="title" style={{ color: "#3aac48" }}>
      <a href="" > {index == 0 ? <div> <h4>Your condition: </h4></div> : <div>conditions: </div>} {this.props.location.state.question.conditions[index].name} </a> <h5>{Math.round(this.props.location.state.question.conditions[index].probability * 100)}%</h5>
        </h4>

        <p class="description">
          Evidience supporting this condition.
        </p>
        <hr />
        <div class="" >
        <div class="description" >
            {this.state.conditionRecomended != null ?
             <div>
<p>this condtion prevalency is <h5>{this.state.conditionRecomended.prevalence}</h5> and can be attributed to <h5>{this.state.conditionRecomended.sex_filter}</h5> gender
    the severity if this is   <h5>{this.state.conditionRecomended.severity}</h5> </p>
            </div> :'' }
      </div>
          
        </div>
      </div>
  </div>)
      
        })
    }
    </div>)
    }

  render() {
    return (
      <div>
        <main id="main">
          <section id="breadcrumbs" class="breadcrumbs">
            <div class="breadcrumb-hero">
              <div class="container">
                <div class="breadcrumb-hero">
                  <h2>Your Results have been finalised..</h2>
                  <p>
                    Please note that the information provided by this tool is
                    provided solely for educational purposes and is not a
                    qualified medical opinion. This information should not be
                    considered advice or an opinion of a doctor or other health
                    professional about your actual medical state, and you should
                    see a doctor for any symptoms you may have. If you are
                    experiencing a health emergency, you should call your local
                    emergency number immediately to request emergency medical
                    assistance.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div class="container">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>results of conditions</li>
              </ol>
            </div>
          </section>

          <section id="services" class="services  section-bg ">
            <div class="container">
              <div class="section-title pt-5" data-aos="fade-up">
                <h2>Summary of Results</h2>
              </div>

              <div class="row faq-item d-flex h">
                  
           {this.loadRecomendation()}
                
               </div> 
                {this.props.location.state !== undefined ?this.LoadResults() : ''}
             
         
                
      
            
              
            </div>
          </section>

     
        </main>
      </div>
    );
  }
}
