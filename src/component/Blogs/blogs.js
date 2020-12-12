import React, { Component } from "react";
import PropTypes from "prop-types";
import { components } from "react-select";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
class BlogsPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Posts: null,
    };
  }

  async loadquote() {
    console.log(this.state.Posts, "post");

    let res = await axios.get(`http://localhost:8000/posts/`);

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
  componentDidMount() {
    this.loadquote();
    console.log("blog is here");
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
  render() {
    return (
      <main id="main">
        <section id="breadcrumbs" class="breadcrumbs">
          <div class="breadcrumb-hero">
            <div class="container">
              <div class="breadcrumb-hero">
                <h2>Blog</h2>
                <p>
                  Est dolorum ut non facere possimus quibusdam eligendi
                  voluptatem. Quia id aut similique quia voluptas sit quaerat
                  debitis. Rerum omnis ipsam aperiam consequatur laboriosam nemo
                  harum praesentium.{" "}
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
