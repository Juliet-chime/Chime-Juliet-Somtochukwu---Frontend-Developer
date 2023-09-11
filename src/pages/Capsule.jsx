import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from "../assets/component/CustomButton"
import CustomDatePicker from "../assets/component/CustomDatePicker"
import CustomSelect from "../assets/component/CustomSelect"
import CapsuleItem from "../assets/component/capsule/CapsuleItem"
import { capsuleStatus, capsuleType } from "../constant"
import Pagination from "../assets/component/pagination/CustomPagination";
import { fetchCapsule, getCapsuleSelector } from "../services/slice/capsule/allCapsule";
import useCurrentData from "../assets/hook/useCurrentData";
import TitleHeader from "../assets/component/TitleHeader";
import { sortData } from "../utils/dataFormat";
import { fetchUpcomingCapsule, getUpcomingCapsuleSelector } from "../services/slice/capsule/upcomingCapsules";
import EmptyState from "../assets/component/emptyState";
import Loader from "../assets/component/loader";
import { useNavigate } from "react-router-dom";
import { fetchPastCapsule, getPastCapsuleSelector } from "../services/slice/capsule/pastCapsule";


let PageSize = 10;

const Capsule = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [date, setDate] = useState(new Date());

  const capsule = useSelector(getCapsuleSelector)
  const upcomingCapsule = useSelector(getUpcomingCapsuleSelector)
  const pastCapsule = useSelector(getPastCapsuleSelector)
  const totalCount = capsule?.capsules?.length

  const onHandleType = (e) => {
    console.log(e.target.value)
    const type = e.target.value
    setType(type)
    // if(type==='all'){
    //   dispatch(fetchCapsule())
    // } else{
    //   dispatch(fetchCapsule({type}))
    // }
  }

  const onHandleStatus = (e) => {
    console.log(e.target.value)
    const status = e.target.value
    setStatus(status)
    // if(status ==='all'){
    //   dispatch(fetchCapsule())
    // } else{
    //   dispatch(fetchCapsule({status}))
    // }
  }

  const onHandleDateChange = (date) => {
    const newDate = new Date(date).toISOString()
    console.log(new Date(date).toISOString())
    setDate(new Date(newDate))
  }

  const original_launch = date.toISOString()

  const onHandleSearch = async () => {

    if (type === 'all' || status === 'all') {
      await dispatch(fetchCapsule())
    } else {
      await dispatch(fetchCapsule({ status, type, original_launch }))
    }

  }

  const updatedCapsule = () => {
    const data = capsule?.capsules.map((datas) => {
      return {
        ...datas,
        original_launch: datas?.original_launch ? datas.original_launch : new Date()
      }
    })

    return sortData(data, { ascending: false })
  }


  const updatedUpComingCapsule = () => {
    const data = upcomingCapsule?.upcomingCapsules.map((datas) => {
      return {
        ...datas,
        original_launch: datas?.original_launch ? datas.original_launch : new Date()
      }
    })

    return sortData(data, { ascending: false })
  }

  const updatedPastCapsule = () => {
    const data = pastCapsule?.pastCapsules.map((datas) => {
      return {
        ...datas,
        original_launch: datas?.original_launch ? datas.original_launch : new Date()
      }
    })

    return sortData(data, { ascending: false })
  }

  const navigateOneCapsule = (id) => {
    navigate(`/capsule/${id}`)
  }
  const [currentTableData] = useCurrentData(updatedCapsule(), currentPage, PageSize)
  const [pastCapsules] = useCurrentData(updatedPastCapsule(), currentPage, PageSize)

  useEffect(() => {
    async function getCapsule() {
      try {
        await Promise.allSettled(
          [
            dispatch(fetchCapsule()),
            dispatch(fetchUpcomingCapsule()),
            dispatch(fetchPastCapsule())
          ]
        )
      } catch (e) {
        console.log(e)
      }
    }
    getCapsule()
  }, [dispatch])

  return (
    <div className="w-[95%] xl:w-[85%] m-auto">
      <div className="bg-[#14171f] w-[100%] md:w-[65%] p-4 md:mx-auto mt-10 rounded-md grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#040D12] rounded-md">
          <CustomSelect options={capsuleType} placeholder='filter by type' onChange={onHandleType} />
        </div>
        <div className="bg-[#040D12] rounded-md">
          <CustomSelect options={capsuleStatus} placeholder='filter by status' onChange={onHandleStatus} />
        </div>
        <div className="bg-[#040D12] rounded-md">
          <CustomDatePicker selected={date} onChange={onHandleDateChange} placeholder='select date' />
        </div>
        <CustomButton text='Apply Filter' onClick={onHandleSearch} />
      </div>

      <>
        <TitleHeader title='Discover Capsules' />
        {
          currentTableData.length > 0 ? <>
            {capsule?.loading ? <Loader /> : <div>
              <div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
                {
                  currentTableData.map((item, idx) => <CapsuleItem key={idx} item={item} onClick={() => navigateOneCapsule(item?.capsule_serial)} />)
                }
              </div>
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>}
          </> : <EmptyState name={`Capsules`} />
        }
      </>

      <>
        {updatedUpComingCapsule().length > 0 ? <>
          <TitleHeader title='Upcoming Capsules' />
          <div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
            {
              updatedUpComingCapsule().map((item, idx) => <CapsuleItem key={idx} item={item} onClick={() => navigateOneCapsule(item?.capsule_serial)}/>)
            }
          </div>
        </> : null}
      </>

      <>
        <TitleHeader title='Past Capsules' />
        {
          pastCapsules.length > 0 ? <>
            {capsule?.loading ? <Loader /> : <div>
              <div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
                {
                  pastCapsules.map((item, idx) => <CapsuleItem key={idx} item={item} onClick={() => navigateOneCapsule(item?.capsule_serial)} />)
                }
              </div>
              <Pagination
                currentPage={currentPage}
                totalCount={pastCapsule?.pastCapsules?.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </div>}
          </> : <EmptyState name={`Capsules`} />
        }
      </>
    </div>

  )
}

export default Capsule    