import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';
class NewsFeed extends Component {
    constructor(props) {
        super(props)
      this.state = {
      News:null
     
    
      };
    }

    loadNews =  async() =>{
//    console.log('load2');

        try{
//    console.log('load3');

         let res = await axios.get(`http://localhost:8000/resource/news`);
//    console.log('load4');
       
         console.log(res.data);
        this.state.News = res.data;
        this.forceUpdate();
        }catch(e){
            console.log(e);
        }
      
    }
    componentWillMount() {
        
        
    }

    load = async () =>{
     

    }

     componentDidMount () {
//    console.log('load');
        this.loadNews();
        // console.log(this.state.News);
    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

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
    LoadArticles =  () =>{

      
console.log('news',this.state.News);


 
return <div class="row">{this.state.News.articles.map((post,index) =>( 
  
  <div
  class="col-lg-4  col-md-6 d-flex align-items-stretch"
  data-aos="fade-up"
 >
  <article class="entry">
    <div class="entry-img">
      <img src={post.urlToImage} alt="" class="img-fluid" />
    </div>

    <h2 class="entry-title">
      <a href="blog-single.html">
       {post.title}
      </a>
    </h2>

    <div class="entry-meta">
      <ul>
        <li class="d-flex align-items-center">
          <i class="icofont-user"></i>{" "}
<a href="blog-single.html">{post.author != null? <div>{post.author}</div> : "unkown"}</a>
        </li>
        <li class="d-flex align-items-center">
          <i class="icofont-wall-clock"></i>{" "}
          <a href="blog-single.html">
<time datetime="2020-01-01">{this.dateformat(post.publishedAt)}</time>
          </a>
        </li>
      </ul>
    </div>

    <div class="entry-content">
      <p>
       {post.description}
      </p>
      <div class="read-more">
        <a href={post.url}>Read More</a>
      </div>
    </div>
  </article>
</div>

  ))}
    


</div>

      
    


}
    

    render() {
        return (
      
 <div class="container">

<div class="row">

{this.state.News != null ?  <div>{this.LoadArticles()}</div> :  <div>loading....</div>}

   </div>
            </div>
        )
    }
}


export default NewsFeed;