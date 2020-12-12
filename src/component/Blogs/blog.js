import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, Redirect, useHistory,useLocation} from 'react-router-dom';
import { authenticate, isAuth } from '../../helpers/auth';
import TextareaAutosize from "react-autosize-textarea";
import axios from 'axios';


class Blog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            post:null,
            comments:null,
            message:''
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
console.log('post',this.props.location.post);
this.state.post = this.props.location.post;

    }

    async loadcomments(){
     

  
      let res = await axios.get(`http://localhost:8000/posts/comment/${this.props.location.post._id}`);
  
      this.state.comments = res.data;
  
      // console.log(this.state.comments, "comments");
       this.forceUpdate();
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
     handleSubmit = (e) => {
      e.preventDefault();

      console.log(this.state.message);

      if(isAuth()){
      
       
        axios
      .post(`http://localhost:8000/posts/comment/${this.props.location.post._id}`, {
        comments_amount:this.state.comments.length + 1,
        userid: isAuth()._id,
          Post_id: this.state.post._id ,
          message: this.state.message,  
      })
      .then((res) => {
        console.log(res);
        this.state.message = '';
        alert(res.data, "posted");

        this.forceUpdate();
      })
      .catch((err) => {
        console.log('error',err.data);
      });
      }else {

        alert('create an account');
      }
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
  
      return <div>{day + " " + monthNames[monthIndex] + " " + year}</div>;
    }
    comments(){
      this.loadcomments();
    return(  <div class="blog-comments">

      <h4 class="comments-count">{this.state.comments != null?this.state.comments.length:'0'} Comments</h4>

      {/* <div id="comment-1" class="comment clearfix">
        <img src="assets/img/comments-1.jpg" class="comment-img  float-left" alt=""/>
        <h5><a href="">Georgia Reader</a> <a href="#" class="reply"><i class="icofont-reply"></i> Reply</a></h5>
        <time datetime="2020-01-01">01 Jan, 2020</time>
        <p>
          Et rerum totam nisi. Molestiae vel quam dolorum vel voluptatem et et. Est ad aut sapiente quis molestiae est qui cum soluta.
          Vero aut rerum vel. Rerum quos laboriosam placeat ex qui. Sint qui facilis et.
        </p>

      </div> 

      <div id="comment-2" class="comment clearfix">
        <img src="assets/img/comments-2.jpg" class="comment-img  float-left" alt=""/>
        <h5><a href="">Aron Alvarado</a> <a href="#" class="reply"><i class="icofont-reply"></i> Reply</a></h5>
        <time datetime="2020-01-01">01 Jan, 2020</time>
        <p>
          Ipsam tempora sequi voluptatem quis sapiente non. Autem itaque eveniet saepe. Officiis illo ut beatae.
        </p>

        <div id="comment-reply-1" class="comment comment-reply clearfix">
          <img src="assets/img/comments-3.jpg" class="comment-img  float-left" alt=""/>
          <h5><a href="">Lynda Small</a> <a href="#" class="reply"><i class="icofont-reply"></i> Reply</a></h5>
          <time datetime="2020-01-01">01 Jan, 2020</time>
          <p>
            Enim ipsa eum fugiat fuga repellat. Commodi quo quo dicta. Est ullam aspernatur ut vitae quia mollitia id non. Qui ad quas nostrum rerum sed necessitatibus aut est. Eum officiis sed repellat maxime vero nisi natus. Amet nesciunt nesciunt qui illum omnis est et dolor recusandae.

            Recusandae sit ad aut impedit et. Ipsa labore dolor impedit et natus in porro aut. Magnam qui cum. Illo similique occaecati nihil modi eligendi. Pariatur distinctio labore omnis incidunt et illum. Expedita et dignissimos distinctio laborum minima fugiat.

            Libero corporis qui. Nam illo odio beatae enim ducimus. Harum reiciendis error dolorum non autem quisquam vero rerum neque.
          </p>

          <div id="comment-reply-2" class="comment comment-reply clearfix">
            <img src="assets/img/comments-4.jpg" class="comment-img  float-left" alt=""/>
            <h5><a href="">Sianna Ramsay</a> <a href="#" class="reply"><i class="icofont-reply"></i> Reply</a></h5>
            <time datetime="2020-01-01">01 Jan, 2020</time>
            <p>
              Et dignissimos impedit nulla et quo distinctio ex nemo. Omnis quia dolores cupiditate et. Ut unde qui eligendi sapiente omnis ullam. Placeat porro est commodi est officiis voluptas repellat quisquam possimus. Perferendis id consectetur necessitatibus.
            </p>

          </div> 

        </div>

      </div>

      <div id="comment-3" class="comment clearfix">
        <img src="assets/img/comments-5.jpg" class="comment-img  float-left" alt=""/>
        <h5><a href="">Nolan Davidson</a> <a href="#" class="reply"><i class="icofont-reply"></i> Reply</a></h5>
        <time datetime="2020-01-01">01 Jan, 2020</time>
        <p>
          Distinctio nesciunt rerum reprehenderit sed. Iste omnis eius repellendus quia nihil ut accusantium tempore. Nesciunt expedita id dolor exercitationem aspernatur aut quam ut. Voluptatem est accusamus iste at.
          Non aut et et esse qui sit modi neque. Exercitationem et eos aspernatur. Ea est consequuntur officia beatae ea aut eos soluta. Non qui dolorum voluptatibus et optio veniam. Quam officia sit nostrum dolorem.
        </p>

      </div> */}

      {  this.state.comments != null ?
      this.state.comments.map((comment, index) => (
      <div id="comment-4" class="comment clearfix">
        <img src="https://feedback.seekingalpha.com/s/cache/7c/f3/7cf3cb57636e1517bba1112c7303989d.png" class="comment-img  float-left" alt=""/>
      <h5><a href="">{comment.userid.firstname} {comment.userid.lastname}</a> <a href="#" class="reply"><i class="icofont-reply"></i> Reply</a></h5>
      <time datetime="2020-01-01">{this.dateformat(comment.created_ts)}</time>
        <p>
         {comment.message}
        </p>

      </div>
      ))
    :'loading..'
    }


    </div>)
    }

    likes(){


    }

    commenting(){
      return (
        <div >

              <section id="about" class="services about   ">
        <br />
        <br />  
         <h4>Leave a Reply</h4>
        <form role="form" onSubmit={this.handleSubmit}>
          <div class="" data-aos="fade-up">
            <br />
            <div style={{  }}>
              <div class="row">
            
                <div class="col-lg-12 pt-3 pt-lg-0 content">
                  <div class=" form-group">
                    <TextareaAutosize
                      style={{ minHeight: 100, maxHeight: 500 }}
                      name="comment"
                      class="form-control textarea"
                      placeholder="Enter your thoughts"
                      onChange={(evt) =>
                       this.setState({message:evt.currentTarget.value})
                      }
                      value={this.state.message}
                    />
                  </div>
                </div>
               
                <div class="col-lg-12 pt-3 pt-lg-0 content">
                  <div class=" form-group">
                    <button type="submit" class="btn btn-secodary">
                      <i class="fas fa-feather-alt"></i> Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </form>
      </section>
  </div>)
    }
    

    render() {
     

    
        return (
            <div>
      {this.props.location.post === undefined ? <Redirect to='/blogs' /> : ''}

  <main id="main">

    <section id="breadcrumbs" class="breadcrumbs">
      <div class="breadcrumb-hero">
        <div class="container">
          <div class="breadcrumb-hero">
            <h2>Blog</h2>
            <p>Est dolorum ut non facere possimus quibusdam eligendi voluptatem. Quia id aut similique quia voluptas sit quaerat debitis. Rerum omnis ipsam aperiam consequatur laboriosam nemo harum praesentium. </p>
          </div>
        </div>
      </div>
      <div class="container">
        <ol>
          <li><a href="/">Home</a></li>
          <li><a href="/blogs">Blog</a></li>
          <li>{this.props.location.post.Title}</li>
        </ol>
      </div>
    </section>
    <section id="blog" class="blog">
      <div class="container text-left" >

        <div class="row ">

          <div class="col-lg-8 entries">

            <article class="entry entry-single">

              <div class="entry-img">
                <img src={this.props.location.post.image} alt="" class="img-fluid"/>
              </div>

              <h2 class="entry-title">
                <a href="blog-single.html">{this.props.location.post.Title}</a>
              </h2>

              <div class="entry-meta">
                <ul>
        <li class="d-flex align-items-center"><i class="icofont-user"></i> <a href="blog-single.html">{this.props.location.post.Author}</a></li>
                  <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01"> {this.dateformat(this.props.location.post.createdAt)}</time></a></li>
                  <li class="d-flex align-items-center"><i class="icofont-comment"></i> <a href="blog-single.html">{this.state.comments != null?this.state.comments.length:'0' } Comments</a></li>
                </ul>
              </div>

              <div class="entry-content">
                <p>
                {this.props.location.post.Description}
                 </p>

                {/* <p>
                  Sit repellat hic cupiditate hic ut nemo. Quis nihil sunt non reiciendis. Sequi in accusamus harum vel aspernatur. Excepturi numquam nihil cumque odio. Et voluptate cupiditate.
                </p> */}

                {/* <blockquote>
                  <i class="icofont-quote-left quote-left"></i>
                  <p>
                    Et vero doloremque tempore voluptatem ratione vel aut. Deleniti sunt animi aut. Aut eos aliquam doloribus minus autem quos.
                  </p>
                  <i class="las la-quote-right quote-right"></i>
                  <i class="icofont-quote-right quote-right"></i>
                </blockquote> */}

                {/* <p>
                  Sed quo laboriosam qui architecto. Occaecati repellendus omnis dicta inventore tempore provident voluptas mollitia aliquid. Id repellendus quia. Asperiores nihil magni dicta est suscipit perspiciatis. Voluptate ex rerum assumenda dolores nihil quaerat.
                  Dolor porro tempora et quibusdam voluptas. Beatae aut at ad qui tempore corrupti velit quisquam rerum. Omnis dolorum exercitationem harum qui qui blanditiis neque.
                  Iusto autem itaque. Repudiandae hic quae aspernatur ea neque qui. Architecto voluptatem magni. Vel magnam quod et tempora deleniti error rerum nihil tempora.
                </p>

                <h3>Et quae iure vel ut odit alias.</h3>
                <p>
                  Officiis animi maxime nulla quo et harum eum quis a. Sit hic in qui quos fugit ut rerum atque. Optio provident dolores atque voluptatem rem excepturi molestiae qui. Voluptatem laborum omnis ullam quibusdam perspiciatis nulla nostrum. Voluptatum est libero eum nesciunt aliquid qui.
                  Quia et suscipit non sequi. Maxime sed odit. Beatae nesciunt nesciunt accusamus quia aut ratione aspernatur dolor. Sint harum eveniet dicta exercitationem minima. Exercitationem omnis asperiores natus aperiam dolor consequatur id ex sed. Quibusdam rerum dolores sint consequatur quidem ea.
                  Beatae minima sunt libero soluta sapiente in rem assumenda. Et qui odit voluptatem. Cum quibusdam voluptatem voluptatem accusamus mollitia aut atque aut.
                </p>
                <img src="assets/img/blog-inside-post.jpg" class="img-fluid" alt=""/>

                <h3>Ut repellat blanditiis est dolore sunt dolorum quae.</h3>
                <p>
                  Rerum ea est assumenda pariatur quasi et quam. Facilis nam porro amet nostrum. In assumenda quia quae a id praesentium. Quos deleniti libero sed occaecati aut porro autem. Consectetur sed excepturi sint non placeat quia repellat incidunt labore. Autem facilis hic dolorum dolores vel.
                  Consectetur quasi id et optio praesentium aut asperiores eaque aut. Explicabo omnis quibusdam esse. Ex libero illum iusto totam et ut aut blanditiis. Veritatis numquam ut illum ut a quam vitae.
                </p>
                <p>
                  Alias quia non aliquid. Eos et ea velit. Voluptatem maxime enim omnis ipsa voluptas incidunt. Nulla sit eaque mollitia nisi asperiores est veniam.
                </p> */}

              </div>

              <div class="entry-footer clearfix">
                <div class="float-left">
                

                  <i class="icofont-tags"></i>
                  <ul class="tags" style={{color:''}}>
                  {
                   this.props.location.post.Tags.map((tag, index) => (

                      <li>
                      <a href="#">{tag}</a>
                    </li>
                    
                      ))
                   }
                  </ul>
                </div>

                {/* <div class="float-right share">
                  <a href="" title="Share on Twitter"><i class="icofont-twitter"></i></a>
                  <a href="" title="Share on Facebook"><i class="icofont-facebook"></i></a>
                  <a href="" title="Share on Instagram"><i class="icofont-instagram"></i></a>
                </div> */}

              </div>

            </article> 
          
          
             <div class="blog-author ">
          
              
          {this.commenting()}
            </div>  


            {this.comments()}
          </div>

          <div class="col-lg-4">

            <div class="sidebar">

              <h3 class="sidebar-title">Search</h3>
              <div class="sidebar-item search-form">
                <form action="">
                  <input type="text"/>
                  <button type="submit"><i class="icofont-search"></i></button>
                </form>

              </div>

              <h3 class="sidebar-title">Categories</h3>
              <div class="sidebar-item categories">
                <ul>
                  <li><a href="#">General <span>(25)</span></a></li>
                  <li><a href="#">Lifestyle <span>(12)</span></a></li>
                  <li><a href="#">Travel <span>(5)</span></a></li>
                  <li><a href="#">Design <span>(22)</span></a></li>
                  <li><a href="#">Creative <span>(8)</span></a></li>
                  <li><a href="#">Educaion <span>(14)</span></a></li>
                </ul>

              </div> End sidebar categories

              <h3 class="sidebar-title">Recent Posts</h3>
              <div class="sidebar-item recent-posts">
                <div class="post-item clearfix">
                  <img src="assets/img/blog-recent-1.jpg" alt=""/>
                  <h4><a href="blog-single.html">Nihil blanditiis at in nihil autem</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div class="post-item clearfix">
                  <img src="assets/img/blog-recent-2.jpg" alt=""/>
                  <h4><a href="blog-single.html">Quidem autem et impedit</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div class="post-item clearfix">
                  <img src="assets/img/blog-recent-3.jpg" alt=""/>
                  <h4><a href="blog-single.html">Id quia et et ut maxime similique occaecati ut</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div class="post-item clearfix">
                  <img src="assets/img/blog-recent-4.jpg" alt=""/>
                  <h4><a href="blog-single.html">Laborum corporis quo dara net para</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

                <div class="post-item clearfix">
                  <img src="assets/img/blog-recent-5.jpg" alt=""/>
                  <h4><a href="blog-single.html">Et dolores corrupti quae illo quod dolor</a></h4>
                  <time datetime="2020-01-01">Jan 1, 2020</time>
                </div>

              </div>

              <h3 class="sidebar-title">Tags</h3>
              <div class="sidebar-item tags">
                <ul>
                  <li><a href="#">App</a></li>
                  <li><a href="#">IT</a></li>
                  <li><a href="#">Business</a></li>
                  <li><a href="#">Business</a></li>
                  <li><a href="#">Mac</a></li>
                  <li><a href="#">Design</a></li>
                  <li><a href="#">Office</a></li>
                  <li><a href="#">Creative</a></li>
                  <li><a href="#">Studio</a></li>
                  <li><a href="#">Smart</a></li>
                  <li><a href="#">Tips</a></li>
                  <li><a href="#">Marketing</a></li>
                </ul>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>

  </main>


  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

            </div>
        )
    }
}


export default Blog