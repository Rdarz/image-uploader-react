import { UPLOAD_IMAGE } from './HomeActions'

const ACTION_HANDLERS = {
  [UPLOAD_IMAGE]: (state, action) => ({
    ...state,
    uploadedImage: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}

export default function HomeReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
