import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import authentication from './authentication'
import registration from './registration'

const rootReducer = combineReducers({
  authentication,
  registration,
  routing
})

export default rootReducer
