import React, { useState } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { authenticate, isAuth } from "../../helpers/auth";
import { useForm } from "react-hook-form";
import Select from "react-select";
// import TextareaAutosize from 'react-textarea-autosize';
import TextareaAutosize from "react-autosize-textarea";
import "../Blogs/style.css";

const Create = () => {
  const colourOptions = [
    
    { value: "Post", label: "Post", color: "#0052CC" },
    { value: "Discussion", label: "Discussion", color: "#5243AA" },
    { value: "Feedback", label: "Feedback", color: "#FF5630" },
    { value: "Info", label: "Info", color: "#FF8B00" },
    { value: "NSFW", label: "NSFW", color: "#FFC400" },
    { value: "Question", label: "Question", color: "#36B37E" },
  ];
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");

  const _handleImageChange = async(e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "healit");

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/healit/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file1 = await res.json()
    setImage(file1.secure_url)
    console.log(file1);
  
  };

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
var Tags = [];
for(var tag of tags){
  Tags.push(tag.value);
}

    console.log(Title, Description, Tags, image);
  
    axios
      .post(`http://localhost:8000/posts/create`, {
        Title: Title,
        Description: Description,
        image: image,
        Tags: Tags,
        userid: isAuth()._id,
        Author: `${isAuth().firstname} ${isAuth().lastname}`
      })
      .then((res) => {
        console.log(res);
        alert(res.data, "submitted");
        
        history.push("/blogs");
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const handleChange = (selectedOption) => {
    console.log("tags", selectedOption);
    setTags(selectedOption);
  };
  const ImgUpload = () => {
    console.log(image);
    if (image != "") {
      return (
        <div class="col-lg-12 pt-3 pt-lg-0 content">
          <div class="entry-img">
            <img
              src={image}
              height="450"
              width="450"
              alt=""
              class="img-fluid"
            />
          </div>
          <p>{image.name}</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  return (
    <div>
      {!isAuth() ? <Redirect to="/" /> : ""}
      <br />
      <br />
      <section id="cta" class="cta">
        <div class="container" data-aos="fade-in">
          <div class="text-center">
            <h3>Do you have something on your mind?</h3>
            <p>share any infromation you want to others</p>
          </div>
        </div>
      </section>
      <section id="about" class="services about  section-bg ">
        <br />
        <br />
        <form onSubmit={handleSubmit} role="form">
          <div class="container" data-aos="fade-up">
            <br />
            <div style={{ padding: "2px" }}>
              <div class="row">
                <div class="col-lg-12  align-self-baseline">
                  <h2 style={{ color: "#3aac48" }}>Create Post</h2>
                  <hr />
                </div>
                <br />
                <div class="col-lg-12  align-self-baseline">
                  <input
                    type="text"
                    class="form-control"
                    name="Title"
                    id="Title"
                    placeholder="Title"
                    data-rule="name"
                    onChange={(evt) => setTitle(evt.currentTarget.value)}
                    value={Title}
                  />
                </div>
                
                <hr />
                <div class="col-lg-12  align-self-baseline">
                  <div class="input-group mb-3">
                    <div class="custom-file">
                      <input
                        type="file"
                        style={{ backgroundColor: "#3aac48", color: "white" }}
                        accept="image/png, image/jpeg"
                        class="custom-file-input"
                        id="customFile"
                        onChange={(e) => _handleImageChange(e)}
                      />
                      <label class="custom-file-label" for="customFile">
                        Choose an image
                      </label>
                    </div>
                  </div>
                </div>
                {ImgUpload()}
                <br />
                <br />
                <br />
                <div class="col-lg-4 pt-3 pt-lg-0 content">
                  <h4>Select tags for your Post</h4>
                </div>
                <div class="col-lg-6 pt-3 pt-lg-0 content"></div>
                <div class="col-lg-2 pt-3 pt-lg-0 content"></div>
                <div class="col-lg-12 pt-3 pt-lg-0 content">
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    options={colourOptions}
                    onChange={handleChange}
                  />
                </div>
                <br /> <br />

                <div class="col-lg-12 pt-3 pt-lg-0 content">
                  <div class=" form-group">
                    <TextareaAutosize
                      style={{ minHeight: 100, maxHeight: 500 }}
                      name="comment"
                      class="form-control textarea"
                      placeholder="Enter your thoughts"
                      onChange={(evt) =>
                        setDescription(evt.currentTarget.value)
                      }
                      value={Description}
                    />
                  </div>
                </div>
                <br />
                <br />
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
          <br />
          <br />
          <br />
          <br />
        </form>
      </section>
    </div>
  );
};
export default Create;
