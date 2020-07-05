import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Alert, Row, Col, Button, Tabs, Tab } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { uploadImage } from './../HomeApi'
import { getBase64, getCroppedImg } from 'common/utils/utility'

import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const DataList = () => {
  let history = useHistory()
  const dispatch = useDispatch()

  const [imageFile, setImage] = useState()
  const [imageDataUrl, setImageAsDataUrl] = useState()

  const [previewFileHrz, setPreviewHrz] = useState({
    width: 755,
    height: 450
  })
  const [previewFileVrt, setPreviewVrt] = useState({
    width: 365,
    height: 450
  })
  const [previewFileHrzSmall, setPreviewHrzSmall] = useState({
    width: 365,
    height: 212
  })
  const [previewFileGallery, setPreviewGallery] = useState({
    width: 380,
    height: 380
  })

  const [isLoading, setLoading] = useState(false)
  const [completedCrop, setCompletedCrop] = useState({})

  const handleClick = (event) => {
    document.getElementById('hiddenFileInput').click()
  }
  const handleChange = (event) => {
    let fileData = event.target.files[0]

    let img = new Image()
    img.src = URL.createObjectURL(event.target.files[0])
    img.onload = () => {
      if (img.width === 1024 && img.height === 1024) {
        setImage(URL.createObjectURL(fileData))
        setImageAsDataUrl(fileData)
      } else {
        alert(
          `Sorry, this image doesn't look like the size we wanted. It's ${img.width} x ${img.height} but we require 1024 x 1024 size image.`
        )
      }
    }
  }

  const onUpload = async () => {
    await toggleLoading(true)
    let uploadedImages = []
    await (completedCrop &&
      Object.keys(completedCrop).map(async (key, i) => {
        let tagName = imageDataUrl.name.split('.')[0]
        const req = await {
          file: completedCrop[key],
          // api_key: '266747332731839',
          // timestamp: Math.floor(Date.now() / 1000),
          tags: [tagName],
          upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET
        }
        await dispatch(uploadImage(req)).then(async (res) => {
          console.log('DISPATCH RESPONSE', res)
          await uploadedImages.push(res.data)
          if (i === Object.keys(completedCrop).length - 1) {
            toggleLoading(false)
            await localStorage.setItem(
              'uploadedImages',
              JSON.stringify(uploadedImages)
            )
            await history.push('/gallery')
          }
        })
      }))
  }

  const toggleLoading = (value) => setLoading(value)

  const onCropComplete = async (cropped, preview) => {
    await getBase64(imageDataUrl, async (result) => {
      const croppedImage = await getCroppedImg(result, cropped)

      let imagePreviews = await completedCrop
      imagePreviews[preview] = await croppedImage

      await setCompletedCrop(completedCrop)
    })
  }

  return (
    <Container className='homeContainer container'>
      {imageFile ? (
        <Row>
          <Col sm={12}>
            <Alert variant='info'>
              <p>Note:</p>
              <ol className='orderList'>
                <li>
                  Check the preview of given resoultion and crop the image
                  according to that.
                </li>
                <li>
                  Click on upload button on top right corner after previewing
                  all images.
                </li>
              </ol>
            </Alert>
          </Col>
          <Col sm={12} className='d-flex flex-row-reverse uploadButton'>
            <Button variant='primary' disabled={isLoading} onClick={onUpload}>
              {isLoading ? 'Uploading…' : 'Upload'}
            </Button>
          </Col>
          <Col sm={12}>
            <Tabs
              defaultActiveKey='preview1'
              transition={false}
              id='noanim-tab-example'
            >
              <Tab eventKey='preview1' title='Preview (755 x 450)'>
                {imageFile && (
                  <div className='previewBox'>
                    <ReactCrop
                      src={imageFile}
                      locked={true}
                      crop={previewFileHrz}
                      onChange={(c) => setPreviewHrz(c)}
                      onComplete={(c) => onCropComplete(c, 'previewFileHrz')}
                    />
                  </div>
                )}
              </Tab>
              <Tab eventKey='preview2' title='Preview (365 x 450)'>
                <div className='previewBox'>
                  <ReactCrop
                    src={imageFile}
                    locked={true}
                    crop={previewFileVrt}
                    onChange={(c) => setPreviewVrt(c)}
                    onComplete={(c) => onCropComplete(c, 'previewFileVrt')}
                  />
                </div>
              </Tab>
              <Tab eventKey='preview3' title='Preview (365 x 212)'>
                <div className='previewBox'>
                  <ReactCrop
                    src={imageFile}
                    locked={true}
                    crop={previewFileHrzSmall}
                    onChange={(c) => setPreviewHrzSmall(c)}
                    onComplete={(c) => onCropComplete(c, 'previewFileHrzSmall')}
                  />
                </div>
              </Tab>
              <Tab eventKey='preview4' title='Preview (380 x 380)'>
                <div className='previewBox'>
                  <ReactCrop
                    src={imageFile}
                    locked={true}
                    crop={previewFileGallery}
                    onChange={(c) => setPreviewGallery(c)}
                    onComplete={(c) => onCropComplete(c, 'previewFileGallery')}
                  />
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col sm={12}>
            <div className='uploadBox' onClick={handleClick}>
              {imageFile ? (
                <img src={imageFile} />
              ) : (
                <React.Fragment>
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    size='5x'
                    color={'#A9A9A9'}
                  />

                  <p>Upload image here</p>
                </React.Fragment>
              )}
            </div>
          </Col>
        </Row>
      )}

      <input
        type='file'
        id='hiddenFileInput'
        accept='image/x-png,image/gif,image/jpeg'
        onChange={(e) => handleChange(e)}
        style={{ display: 'none' }}
      />
    </Container>
  )
}

export default DataList
