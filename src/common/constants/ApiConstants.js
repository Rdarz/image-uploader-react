//@flow
export default {
  // flow constants
  //Add id on route dynamically
  uploadImage: `/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
  getImage: `http://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/fetch`,
  getImages: `https://${process.env.REACT_APP_CLOUDINARY_API_KEY}:${process.env.REACT_APP_CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/resources/image`
}
