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
import { fetchPastCapsule, getPastCapsuleSelector } from "../services/slice/capsule/pastCapsule";
import CustomModal from "../assets/component/modal";
import CapsuleModal from "../assets/component/modal/capsule/CapsuleModal";


let PageSize = 10;
let original_launch=''

const Capsule = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [capsuleSerial, setCapsuleSerial] = useState('');
  const [open, setOpen] = useState(false);

  const capsule = useSelector(getCapsuleSelector)
  const upcomingCapsule = useSelector(getUpcomingCapsuleSelector)
  const pastCapsule = useSelector(getPastCapsuleSelector)
  const totalCount = capsule?.capsules?.length

  const onHandleType = (e) => {
    const type = e.target.value
    setType(type)
  }

  const onHandleStatus = (e) => {
    const status = e.target.value
    setStatus(status)
  }

  const onHandleDateChange = (date) => {
    setLaunchDate(new Date(date))
  }

  if(launchDate){
     let x = (new Date(launchDate)).getTimezoneOffset() * 60000; 
     let dy=  new Date(launchDate).getTime()
    original_launch = new Date(dy - x).toISOString()
  }

  const onHandleSearch = async () => {
      await dispatch(fetchCapsule({ status, type,original_launch }))
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
    setCapsuleSerial(id)
    setOpen(true)
  }

  const onClearDateFilter = () => {
    setLaunchDate('')
    original_launch=''
  }

  const [allCapsule] = useCurrentData(updatedCapsule(), currentPage, PageSize)
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
    <>
    <CustomModal open={open}
     onClose={()=>setOpen(false)}
     modalBody={<CapsuleModal id={capsuleSerial}/>}
     />
    <div className="w-[95%] xl:w-[85%] m-auto">
      <div className="bg-[#14171f] w-[100%] md:w-[65%] p-4 md:mx-auto mt-10 rounded-md grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#040D12] rounded-md">
          <CustomSelect options={capsuleType} placeholder='filter by type' onChange={onHandleType} />
        </div>
        <div className="bg-[#040D12] rounded-md">
          <CustomSelect options={capsuleStatus} placeholder='filter by status' onChange={onHandleStatus} />
        </div>
        <div className="bg-[#040D12] rounded-md">
        <CustomDatePicker selected={launchDate} value={launchDate} onChange={onHandleDateChange} placeholderText='Select a date' >
          <button className="bg-[#14171f] p-2 rounded-sm text-[white] cursor-pointer font-semibold" onClick={onClearDateFilter}>Clear filter</button>
        </CustomDatePicker>
        </div>
        <CustomButton text='Apply Filter' onClick={onHandleSearch} />
      </div>

      <>
        <TitleHeader title='Discover Capsules' />
        {
          allCapsule.length > 0 ? <>
            {capsule?.loading ? <Loader /> : <div>
              <div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
                {
                  allCapsule.map((item, idx) => <CapsuleItem key={idx} item={item} onClick={() => navigateOneCapsule(item?.capsule_serial)} />)
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
              <div>
              <Pagination
                currentPage={currentPage}
                totalCount={pastCapsule?.pastCapsules?.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
              </div>
            </div>}
          </> : <EmptyState name={`Capsules`} />
        }
      </>
    </div>
</>
  )
}

export default Capsule    