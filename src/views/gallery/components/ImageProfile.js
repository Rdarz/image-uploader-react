import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'

const ImageProfile = () => {
  const [images, setImages] = useState([])
  const storedImages = useSelector((state) => state.home.uploadedImage)
  useEffect(() => {
    loadImages()
    console.log('storedImages===>>>', storedImages)
  }, [])
  const loadImages = async () => {
    let uploadedImages = await localStorage.getItem('uploadedImages')
    await setImages(JSON.parse(uploadedImages))
  }
  return (
    <div className='galleryContainer container'>
      <Row>
        {images &&
          images.map((data) => {
            return (
              <div className='imageContainer' key={data.asset_id}>
                <div>
                  <h4>{`Preview (${data.width} x ${data.height})`}</h4>
                  <img className='image' src={data.url} />
                </div>
              </div>
            )
          })}
      </Row>
    </div>
  )
}

export default ImageProfile
