import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchRocket, getRocketSelector } from "../services/slice/rocket/allRocket";
import RocketItem from "../assets/component/rocket/RocketItem";
import useCurrentData from "../assets/hook/useCurrentData";
import Loader from "../assets/component/loader";
import Pagination from "../assets/component/pagination/CustomPagination";
import EmptyState from "../assets/component/emptyState";
import TitleHeader from "../assets/component/TitleHeader";
import { useNavigate } from "react-router-dom";

let PageSize = 10;

const Rocket = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rocket = useSelector(getRocketSelector)

  const [currentPage, setCurrentPage] = useState(1);

const [allRocket] = useCurrentData(rocket?.rockets, currentPage, PageSize)

  console.log({jjd:rocket?.rockets,allRocket})

  const navigateOneRocket = (id) => {
    navigate(`/rocket/${id}`)
  }

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
    < div className="w-[95%] xl:w-[85%] m-auto">
      <>
        <TitleHeader title='Discover Rockets' />
        {
          allRocket.length > 0 ? <>
            {rocket?.loading ? <Loader /> : <div>
              <div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
                {
                  allRocket.map((item, idx) => <RocketItem key={idx} item={item} onClick={() => navigateOneRocket(item?.rocket_id)}/>)
                }
              </div>
              <Pagination
                currentPage={currentPage}
                totalCount={rocket?.rockets.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>}
          </> : <EmptyState name={`Rockets`} />
        }
      </>
    </div>
  )
}

export default Rocket