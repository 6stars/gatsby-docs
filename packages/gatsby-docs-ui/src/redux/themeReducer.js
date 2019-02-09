import actionTypes from './actionTypes'

const initialState = { theme: { paletteType: 'dark' } }

const mapping = {
  [actionTypes.THEME_CHANGE_PALETTE_TYPE]: (state, action) => ({
    ...state,
    paletteType: action.payload.paletteType,
  }),
}

function themeReducer(state = initialState, action) {
  let newState = state

  if (mapping[action.type]) {
    newState = mapping[action.type](state, action)
  }

  return newState
}

export default themeReducer
