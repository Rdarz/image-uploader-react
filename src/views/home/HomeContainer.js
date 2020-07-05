import React, { useLayoutEffect, useState } from 'react'
import './HomeStyle.scss'
import Header from 'views/partials/header'
import DataList from './components/DataList'

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <DataList />
    </React.Fragment>
  )
}

export default Home
