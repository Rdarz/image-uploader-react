export const UPLOAD_IMAGE = 'UPLOAD_IMAGE'

// -------------------Auth Loading Actions--------------------

export const uploadImageSuccess = (payload) => {
  return {
    type: UPLOAD_IMAGE,
    payload
  }
}
