import ImageContext from "./imageContext";
import React, { useState } from 'react';
import axios from 'axios';


const ImageState = (props) => {
  const imagesInitial = []

  const host = "http://localhost:7000";
  const [images, setImages] = useState(imagesInitial);

  //add an image
  const addImage = async (formData, setProgress) => {
    const response = await axios({
      method: "post",
      url: "http://localhost:7000/api/images/addimage",
      data: formData,
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "auth-token": localStorage.getItem('token')
      }
    });
    console.log(response)
    const image = await response.data;
    setImages(images.concat(image));
  }

  //get all images
  const getImages = async () => {
    const response = await axios(`${host}/api/images/fetchallimages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });

    const data = await response.data;
    setImages(data)
  }


  //delete an image
  const deleteImage = async (id) => {
    //Api call to delete
    const response = await axios(`${host}/api/images/deleteimage/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });

    const result = await response.data;
   console.log(result)

    //Clint side code
    const newImages = images.filter((image) => {
      return image._id !== id
    });
    setImages(newImages)
  }

  return (
    <ImageContext.Provider value={{ images, getImages, addImage, deleteImage }}>
      {props.children}
    </ImageContext.Provider>
  )
}

export default ImageState