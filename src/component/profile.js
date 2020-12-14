import React, {  Component } from 'react'
import { Link, Redirect, useHistory,useLocation,useRouteMatch } from 'react-router-dom';
import { authenticate, isAuth,signout, updateUser } from '../helpers/auth';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.user =  React.createRef();
    this.state = {
      
        firstname:'',
        lastname:'',
        gender:'',
        age:'',
        username:'',
        email:'',
        Posts: null,

    };
  }

  async loadPosts() {
  
    let res = await axios.get(`http://localhost:8000/posts/${isAuth()._id}`);

    this.state.Posts = res.data;

    console.log(this.state.Posts, "post");
    this.forceUpdate();
  }
  dateformat(date) {
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let d = new Date(date);
    var day = d.getDate();
    var monthIndex = d.getMonth();
    var year = d.getFullYear();

    console.log(d);
    return <div>{day + " " + monthNames[monthIndex] + " " + year}</div>;
  }
  componentDidMount(){
    
    this.loadPosts();
    console.log('post ',this.state.Posts);
    if(isAuth()){
     
this.setState({

 
    age:isAuth().age,
    gender:isAuth().gender,
    firstname:isAuth().firstname,
    lastname:isAuth().lastname,
    email:isAuth().email,
    username: isAuth().username






});

    }


  }
 
  Post() {
    return (
      <div class="row">
        {this.state.Posts.map((post, index) => (
          <div
            class="col-lg-4  col-md-6 d-flex align-items-stretch"
            data-aos="fade-up"
          >
            <article class="entry">
              <div class="entry-img">
                <img src={post.image} alt="" class="img-fluid" />
              </div>

              <h2 class="entry-title">
                <Link to={{ pathname: "/blog", post: post }}>{post.Title}</Link>
              </h2>

              <div class="entry-meta">
                <ul>
                  <li class="d-flex align-items-center">
                    <i class="icofont-user"></i>{" "}
                    <a href="blog-single.html">{post.Author}</a>
                  </li>
                  <li class="d-flex align-items-center">
                    <i class="icofont-wall-clock"></i>{" "}
                    <a href="blog-single.html">
                      <time datetime="2020-01-01">
                        {this.dateformat(post.createdAt)}
                      </time>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="entry-footer clearfix ">
                <div class="float-left">
                  

                  <i class="icofont-tags"></i>
                  <ul class="tags">
                   {
                    post.Tags.map((tag, index) => (

                      <li>
                      <a href="#">{tag}</a>
                    </li>
                    
                      ))
                   }
                   
                  
                  </ul>
                </div>
              </div>
              <hr />
              <br />
              <div class="entry-content">
                <p>{post.Description.substring(0, 250)}</p>
                <div class="read-more"></div>
              </div>

              <div class="entry-footer clearfix ">
                <div class="float-left">
                  <ul class="tags">
                    <li>
                      <a href="#">
                        {" "}
                        <i class="fas fa-arrow-up"></i>13
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i class="fas fa-arrow-down"></i> 12
                      </a>
                    </li>
                    <li>
                      {" "}
                      <Link to={{ pathname: "/blog", post: post }}>
                        <i class="icofont-comment"></i> {post.comments_amount != null? post.comments_amount:'0'} Comments
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }

  
  
    // console.log(user);
   
    
 
   handleInputChange = text => e => {
    
    // console.log(user,  e.target.value );
  
    // setUser({ ...user, [text]: e.target.value });
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
  e.preventDefault();
  toast.configure();
  if (this.state.age && this.state.firstname && this.state.lastname ) {
  
    axios
      .put(`http://localhost:8000/user/${isAuth()._id}`,  this.state )
      .then(res => {
        console.log(res.data);
        updateUser(res, ()=>{

  
          
          toast.success('Your Information has been updated...', {
            position:"bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

          this.setState({

            age:isAuth().age,
            gender:isAuth().gender,
            firstname:isAuth().firstname,
            lastname:isAuth().lastname,
            email:isAuth().email,
            username: isAuth().username
        
        
        
        
        
        
        });
         
        });
         
        
      })   
      .catch(err => {
      console.log(err);
       alert(err.response.data.error);
      });
  } else {
    
    toast.warn('Please fill all fields', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
}
  render() {
    
    if (isAuth() ){ 
    return (

      <div id="main">
        <ToastContainer />
      <section id="cta" class="cta" style={{height:'200px'}}>
<div class="container" data-aos="fade-in">

<div class="text-center">
    <h3>Your Profile</h3>

</div>

</div>
</section>


    <section id="about" class="about" style={{marginTop:'-100px'}}>
<div class="container" data-aos="fade-up">

<section id="portfolio" class="portfolio" >
<div class="container">

<div class="row">
<div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up">
 <ul id="portfolio-flters" style={{padding:'20px'}}>
   <li data-filter=".filter-settings"  style ={{padding:'20px'}} class="filter-active"> <i class="fas fa-user-cog"></i> profile settings </li>
   <li data-filter=".filter-app" style ={{padding:'20px'}}><i class="fas fa-clipboard"></i> Post</li>
   {/* <li data-filter=".filter-card" style ={{padding:'20px'}}> <i class="fas fa-search"></i> Recent Searches</li> */}
   <li data-filter=".filter-web" style ={{padding:'20px'}}> <i class="fas fa-star"></i> Favourites </li>
 </ul>
</div>
</div>

<div class="row portfolio-container" data-aos="fade-up">
 <div class="col-lg-12 col-md-12 portfolio-item filter-settings" >
 <section id="contact" class="contact">
     
<div class="container" style={{padding:'80px'}}>

<div class=""> 

{/* <iframe style="border:0; width: 100%; height: 270px;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe> */}
</div>

<div class="row">

<div class="col-lg-12" data-aos="fade-right"> <h3  style ={{marginTop:'-30px'}}>Edit OR update Your Profile</h3><hr/>
</div >

<div class="col-lg-4" data-aos="fade-right">
 <div class="info">
   <div class="address">
   <div class="blog-author clearfix">
   <img src="assets/img/blog-author.jpg" class="rounded-circle " alt="" style={{height:'100px', width:'100px', marginRight:'-40px'}}/><br/>
   <p>profile photo</p>
    
   </div>
   </div>

   <div class="email">
     <i class="icofont-envelope"></i>
     <h4>Email:</h4>
     <p>{isAuth().email} </p>
   </div>

 

 </div>

</div>

<div class="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left">
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

</div>

</div>
</section>

 </div>

<div class="col-lg-12 col-md-12 portfolio-item filter-app">
<section id="blog" class="blog">
          <div class="container">
            <h1> Your Posts</h1>
            <hr/>
            <div class="row">
              {this.state.Posts != null ? (
                <div>{this.Post()}</div>
              ) : (
                <div>No posts available</div>
              )}
            </div>
            </div>
            </section>
</div>

<div class="col-lg-4 col-md-6 portfolio-item filter-web">
 <div class="portfolio-wrap">
   <img src="assets/img/portfolio/portfolio-2.jpg" class="img-fluid" alt=""/>
   <div class="portfolio-info">
     <h4>Web 3</h4>
     <p>Web</p>
     <div class="portfolio-links">
       <a href="assets/img/portfolio/portfolio-2.jpg" data-gall="portfolioGallery" class="venobox" title="Web 3"><i class="bx bx-plus"></i></a>
       <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
     </div>
   </div>
 </div>
</div>

<div class="col-lg-4 col-md-6 portfolio-item filter-app">

</div>

<div class="col-lg-4 col-md-6 portfolio-item filter-web">
 <div class="portfolio-wrap">
   <img src="assets/img/portfolio/portfolio-5.jpg" class="img-fluid" alt=""/>
   <div class="portfolio-info">
     <h4>Web 2</h4>
     <p>Web</p>
     <div class="portfolio-links">
       <a href="assets/img/portfolio/portfolio-5.jpg" data-gall="portfolioGallery" class="venobox" title="Web 2"><i class="bx bx-plus"></i></a>
       <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
     </div>
   </div>
 </div>
</div>

<div class="col-lg-4 col-md-6 portfolio-item filter-app">
 
</div>


</div>

</div>
</section>

</div>
</section>

 </div>
    )
  }else{
   return <Redirect to='/' />
  }
}

       
    
}
