import { Link, Redirect, useHistory,useLocation } from 'react-router-dom';

 const Interview =(props)=> {

  const  handleSubmit = e => {
  
        
    }
    return(
    <div>
<div class="col-lg-12 mt-5 mt-lg-0" data-aos="fade-left">
<form  onSubmit={handleSubmit} role="form" class="php-email-form">
 interview
</form>

</div>


<hr/>
<div class="row">

<div class="col-lg-3">
<div class="text-center"><button class="btn btn-success"  type="submit"  disabled={props.isFirst()} onClick={props.prev}><i class="fas fa-pencil-alt"></i> back </button></div>

</div>

<div class="col-lg-6">
  
</div>

<div class="col-lg-3">
<div class="text-center" >
    <button class="btn btn-success"  type="submit"  disabled={props.isLast()} onClick={props.next} ><i class="fas fa-pencil-alt"></i> next </button>
</div>

</div>
</div>

    </div>
    )

 }

 
 export default Interview;