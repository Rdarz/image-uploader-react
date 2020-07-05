import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import HomeReducer from './../views/home/HomeReducer'
import GalleryReducer from './../views/gallery/GalleryReducer'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: HomeReducer,
    gallery: GalleryReducer
  })
export default createRootReducer
