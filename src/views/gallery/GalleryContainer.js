import React, { useLayoutEffect, useState } from 'react'
import './GalleryStyle.scss'
import Header from 'views/partials/header'
import ImageProfile from './components/ImageProfile'

import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()

  return (
    <React.Fragment>
      <Header />
      <ImageProfile />
    </React.Fragment>
  )
}

export default Profile
