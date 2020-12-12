import React, { Component ,useEffect} from 'react'
import PropTypes from 'prop-types'
import News from '../component/Blogs/news';
import axios from 'axios';

export default class Home extends Component {
 
    constructor(props) {
      super(props)
    this.state = {
quote:null,
covid:{},
country:null
    }

    }
    
   async loadquote(){


    let res = await axios.get(`http://localhost:8000/resource/quotes`);
    
      this.state.quote = res.data[Math.floor(Math.random() * 1643)];

      console.log(this.state.quote,'quote', );
    }
    async loadCovidStatus(){

      let res = await axios.get(`http://localhost:8000/resource/covid`);
      
        this.state.covid = res.data;
        console.log(this.state.covid,'covid');
      this.state.country =  this.state.covid.data.covid19Stats.find(element => element.country == 'Jamaica');
      console.log(this.state.country, 'jamaica');
      this.forceUpdate();
      }
    componentWillMount(){
  
    }
    componentDidMount(){
      this.loadquote();
      this.loadCovidStatus();
      
       
    }
    dateformat(date){
      var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
      ];
     let d = new Date(date);
     var day = d.getDate();
  var monthIndex = d.getMonth();
  var year = d.getFullYear();

  
      console.log(d);
    return <div>{ day + ' ' + monthNames[monthIndex] + ' ' + year}</div> ;
    }

    render() {
        return (
            <div>
                

  <section id="hero">
    <div class="hero-container" data-aos="fade-up">
      <h1>Welcome to Healit</h1>
      <h2>A place where your Health Matters.</h2>
      <h4 style={{color:'white'}}>{this.state.quote != null? <div>{this.state.quote.text} <br/><span> ~{this.state.quote.author}</span></div>:'loading..'}</h4>
      <a href="/SymptomsChecker" class="btn-get-started scrollto">Get Started </a>
    </div>
  </section>

  <main id="main">

  
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">
        <br/>
<h1 style={{color:'red;'}}>Covid Status In {this.state.country != null? this.state.country.country:'loading..'}</h1>
        <div class="row justify-content-end">

          <div class="col-lg-11">
            <div class="row justify-content-end">

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box py-5">
                  {/* <i class="icofont-simple-smile"></i> */}
                  <i class="fas fa-skull-crossbones"></i>
                  <span data-toggle="counter-up">{this.state.country != null? this.state.country.deaths:'loading..'}</span>
        <p>Covid Death</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box py-5">
                  {/* <i class="icofont-document-folder"></i> */}
                  <i class="fas fa-first-aid"></i>
                  <span data-toggle="counter-up">{this.state.country != null? this.state.country.recovered:'loading..'}</span>
                  <p>Recovered</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box pb-5 pt-0 pt-lg-5">
                  {/* <i class="icofont-clock-time"></i> */}
                  <i class="fas fa-head-side-cough"></i>
                  <span data-toggle="counter-up">{this.state.country != null? this.state.country.confirmed:'loading..'}</span>
                  <p>Confirmed Casses</p>
                </div>
              </div>

              <div class="col-lg-3 col-md-5 col-6 d-md-flex align-items-md-stretch">
                <div class="count-box pb-5 pt-0 pt-lg-5">
                  {/* <i class="icofont-award"></i> */}
                  <i class="fas fa-clock"></i>
                  {this.state.country != null? this.dateformat(this.state.country.lastUpdate)  :'loading..'}
                  <p>Last updated </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="row">

          <div class="col-lg-6 video-box align-self-baseline">
            <img src="assets/img/medical.png" class="img-fluid" alt=""/>
            <a href="https://www.youtube.com/watch?v=rAj38E7vrS8" class="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
          </div>

          <div class="col-lg-6 pt-3 pt-lg-0 content">
            <h3>STAY HOME.SAVE LIVES.</h3>
            <p class="font-italic">
            Help stop coronavirus
            </p>
            <ul>
              <li><i class="bx bx-check-double"></i> STAY home as much as you can
.</li>
              <li><i class="bx bx-check-double"></i>KEEP a safe distance
.</li>
              <li><i class="bx bx-check-double"></i> WASH hands often</li>

              <li><i class="bx bx-check-double"></i> COVER your cough </li>
              <li><i class="bx bx-check-double"></i> SICK? Call ahead</li>

            </ul>
            <p>
              {/* Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum */}
            </p>
          </div>

        </div>

      </div>
    </section>

   
    <section id="cta" class="cta">
      <div class="container" data-aos="fade-in">

        <div class="text-center">
          <h3>How are you Feeling?</h3>
          <p>Try our self Diognostic solution where you can test how you feel and what is happening to your body to get a 
            better understanding...
          </p>
          <a class="cta-btn" href="/SymptomsChecker">Self Diognostic</a>
        </div>

      </div>
    </section>
<section id="blog"  class="services blog  section-bg ">
<div class="section-title pt-5" data-aos="fade-up">
          <h2>Recent News on Health Topics</h2>
        </div>
  <News/>
</section>
    
   </main>
            </div>
        )
    }
}
