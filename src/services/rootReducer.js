import { combineReducers } from "redux";
import getCapsulesReducer from './slice/capsule/allCapsule'
import getUpcomingCapsulesReducer from './slice/capsule/upcomingCapsules'
import getOneCapsuleReducer from './slice/capsule/oneCapsule'

const rootReducer = combineReducers({
    capsules: getCapsulesReducer,
    upcomingCapsule: getUpcomingCapsulesReducer,
    capsule: getOneCapsuleReducer,
})

export default rootReducer