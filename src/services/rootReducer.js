import { combineReducers } from "redux";
import getCapsulesReducer from './slice/capsule/allCapsule'
import getUpcomingCapsulesReducer from './slice/capsule/upcomingCapsules'

const rootReducer = combineReducers({
    capsule: getCapsulesReducer,
    upcomingCapsule: getUpcomingCapsulesReducer,
})

export default rootReducer