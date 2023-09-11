import Capsule from "./pages/Capsule";
import DetailCapsule from "./pages/DetailCapsule";
import Rocket from "./pages/Rocket";

export const routes = [
    { path: '/', component: Capsule },
    { path: '/rocket', component: Rocket },
    { path: '/capsule/:id', component:DetailCapsule },
]