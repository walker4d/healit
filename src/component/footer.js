import React, { Component } from 'react'
import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';

 const Footer =()=> {
  const location = useLocation();
  // console.log(location.pathname);


  const footer = () => {
return (  <div>
  <footer id="footer">

  <div class="footer-top">

  <div class="container">
<div class="row">

<div class="col-lg-3 col-md-6 footer-info">
<h3>Serenity</h3>
<p>Cras fermentum odio eu feugiat lide p
 ar naso tierra. Justo eget nada terra vi
 dea magna derita valies darta donna mare f
 ermentum iaculis eu non diam phasellus. Scelerisq
 ue felis imperdiet proin fermentum leo. Amet volutpat co
 nsequat mauris nunc congue.</p>
</div>

<div class="col-lg-3 col-md-6 footer-links">
<h4>Useful Links</h4>
<ul>
<li><a href="#">Home</a></li>
<li><a href="#">About us</a></li>
<li><a href="#">Services</a></li>
<li><a href="#">Terms of service</a></li>
<li><a href="#">Privacy policy</a></li>
</ul>
</div>

















<div class="col-lg-3 col-md-6 footer-contact">

<h4>Contact Us</h4>
<p>
A108 Adam Street <br/>
New York, NY 535022<br/>
United States <br/>
<strong>Phone:</strong> +1 5589 55488 55<br/>
<strong>Email:</strong> info@example.com<br/>
</p>

<div class="social-links">
<a href="#" class="twitter"><i class="icofont-twitter"></i></a>
<a href="#" class="facebook"><i class="icofont-facebook"></i></a>
<a href="#" class="instagram"><i class="icofont-instagram"></i></a>
<a href="#" class="google-plus"><i class="icofont-skype"></i></a>
<a href="#" class="linkedin"><i class="icofont-linkedin"></i></a>
</div>

</div>

<div class="col-lg-3 col-md-6 footer-newsletter">
<h4>Our Newsletter</h4>
<p>Tamen quem nulla quae legam multos aute sint culpa 
 legam noster magna veniam enim veniam illum dolore
  legam minim quorum culpa amet magna export 
  quem marada parida nodela caramase seza.</p>
<form action="" method="post">
<input type="email" name="email"/>
<input type="submit" value="Subscribe"/>
</form>
</div>






















</div>
</div>

</div>

<div class="container">
<div class="copyright">
&copy; Copyright <strong><span>Serenity</span></strong>. All Rights Reserved
</div>
<div class="credits">
Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
</div>
</div>


  </footer>
</div>)
  }
  if(location.pathname != '/Auth'){
    
          footer();
        }
        
        if(location.pathname != 'password/forget'){
    
          footer();
        }
        if(location.pathname != 'password/activate'){
    
          footer();
        }
        
        
          return <div></div>
        
    }

    export default Footer;
