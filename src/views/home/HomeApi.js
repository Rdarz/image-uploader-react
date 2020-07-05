import { uploadImageSuccess } from './HomeActions'
import { get, post } from 'webservice/AxiosClient'
import api from 'common/constants/ApiConstants'
import axios from 'axios'

export const uploadImage = (request) => {
  return async (dispatch, getState) => {
    return await post(
      api.uploadImage,
      request,
      (onSuccessData) => {
        dispatch(uploadImageSuccess(onSuccessData))
        // setLoader(false)
      },
      (OnFailureData) => {
        // setLoader(false)
      },
      (error) => {
        console.log('INSIDE APP CONFIG', error)
        // setLoader(false)
      }
    )
  }
}

export const getImages = () => {
  return axios.get(api.getImages).then((res) => {
    console.log('RESPONSE')
  })
}
