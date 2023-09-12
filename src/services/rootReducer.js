import { combineReducers } from "redux";
import getCapsulesReducer from './slice/capsule/allCapsule'
import getUpcomingCapsulesReducer from './slice/capsule/upcomingCapsules'
import getOneCapsuleReducer from './slice/capsule/oneCapsule'
import getRocketReducer from './slice/rocket/allRocket'
import getPastCapsulesReducer from './slice/capsule/pastCapsule'
import getOneRocketReducer from './slice/rocket/oneRocket'

const rootReducer = combineReducers({
    capsules: getCapsulesReducer,
    upcomingCapsule: getUpcomingCapsulesReducer,
    capsule: getOneCapsuleReducer,
    pastCapsule: getPastCapsulesReducer,
    rockets: getRocketReducer,
    rocket:getOneRocketReducer
})

export default rootReducer