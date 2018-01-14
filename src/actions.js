//actions
export const BANG = 'BANG'
export const UPDATE_DATA = 'UPDATE_DATA'
export const UPDATE_PARAMS = 'UPDATE_PARAMS'

//action creators
export function bang() {
  return { type: BANG }
}

export function updateData(newData) {
  return { type: UPDATE_DATA, payload:newData}
}

export function updateParams(newData) {
  return { type: UPDATE_PARAMS, payload:newData}
}
