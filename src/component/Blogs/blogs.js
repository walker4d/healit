import React, { Component } from "react";
import PropTypes from "prop-types";
import { components } from "react-select";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
import { isAuth } from "../../helpers/auth";
class BlogsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
     Blog: null,
    };
  }

  async loadPosts() {
    //le.log(this.state.Posts, "post");

    let res = await axios.get(`http://localhost:8000/posts/`);

    this.state.Posts = res.data;

    //le.log(this.state.Posts, "post");
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

    //le.log(d);
    return <div>{day + " " + monthNames[monthIndex] + " " + year}</div>;
  }
  componentDidMount() {
    this.loadPosts();
  
  }
  checkifLike(){
    if(isAuth()!= null){

    }
  }
Likes (index){

  var dislikes =[];
  var likes =[];
  dislikes =  this.state.Posts[index].Likes.filter(like => like.type == 'dislike' );
  likes =   this.state.Posts[index].Likes.filter(like => like.type == 'like' );

  return (
  <div class="entry-footer clearfix ">
  <div class="float-left">
    <ul class="tags">
      <li>
        <a href="#" style={{color:'green'}} onClick={(e) => this.Like(index,'like')}>
          {" "}
          <i class="fas fa-arrow-up" ></i> {likes.length}
        </a>
      </li>
      <li>
        <a href="#"   onClick={(e) => this.Like(index,'dislike')} > 
          {" "}
          <i class="fas fa-arrow-down" ></i> {dislikes.length}
        </a>
      </li>
      <li>
        {" "}
        <Link to={{ pathname: "/blog", post: this.state.Posts[index] }}>
          <i class="icofont-comment"></i> {this.state.Posts[index].comments_amount != null? this.state.Posts[index].comments_amount:'0'} Comments
        </Link>
      </li>
    </ul>
  </div>
</div>);
  
}
  Like = (index,type)=>{

    //le.log(index,type,this.state.Posts[index]._id);
if(isAuth()!= null){

 var user_likes =  this.state.Posts[index].Likes.filter(like => like.userid == isAuth()._id );
 var isliked ;

 if(user_likes.length < 1){
   //le.log('not equla to 1');
   isliked = true;
 } else 
 {
   //le.log('equal to 1');

if(user_likes[0].type == type){ isliked = false};

 }

   

    axios
    .put(`http://localhost:8000/posts/like/${this.state.Posts[index]._id}`,  {
      userid:isAuth()._id, 
     Post_id:this.state.Posts[index]._id,
     isliked:isliked,
     type:type
   } )
    .then(res => {
      console.log(res.data);
      if(isliked == true){
 this.state.Posts[index].Likes.push(res.data);
      }else{
     
    if(  this.state.Posts[index].Likes.length > 0);
         this.state.Posts[index].Likes.pop();
      }
      this.forceUpdate();
    })   
    .catch(err => {
    //le.log(err);
     alert(err.response.data);
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
                <p>{post.Description.substring(0, 250)}...</p>
                <div class="read-more"></div>
              </div>

            {this.Likes(index)}
            </article>
          </div>
        ))}
      </div>
    );
  }
  render() {
    return (
      <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="breadcrumb-hero">
            <div class="container">
              <div class="breadcrumb-hero">
                <h2>Health topics by users</h2>
                <p>
                  create blog, comment on blog or even learn new information related to health.{" "}
                </p>
              </div>
            </div>
          </div>
          <div class="container">
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Blog</li>
            </ol>
          </div>
        </section>

        <section id="blog" class="blog">
          <div class="container">
            <div class="row">
              {this.state.Posts != null ? (
                <div>{this.Post()}</div>
              ) : (
                <div>loading...</div>
              )}
            </div>

            <div class="blog-pagination" data-aos="fade-up">
              <ul class="justify-content-center">
                <li class="disabled">
                  <i class="icofont-rounded-left"></i>
                </li>
                <li>
                  <a href="#">1</a>
                </li>
                <li class="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">
                    <i class="icofont-rounded-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
export default BlogsPost;
