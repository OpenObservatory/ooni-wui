const ACTION_HANDLERS = {
  'FOO': (state, action) => {
    return ({ ...action.payload })
  }
}

const initialState = {}
export function settingsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
