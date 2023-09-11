import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchRocket, getRocketSelector } from "../services/slice/rocket/allRocket";

const Rocket = () => {

  const dispatch = useDispatch();

  const rocket = useSelector(getRocketSelector)

  console.log({rocket})

  useEffect(() => {
    async function getRocket() {
      try {
          await dispatch(fetchRocket())
      } catch (e) {
        console.log(e)
      }
    }
    getRocket()
  }, [dispatch])
  return (
    <div>Rocket</div>
  )
}

export default Rocket