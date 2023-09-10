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


let PageSize = 10;
const Capsule = () => {

  const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [date, setDate] = useState(new Date());

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

    const onHandleSearch = async() => {

      if(type === 'all' || status === 'all'){
        await dispatch(fetchCapsule())
      } else{
        await dispatch(fetchCapsule({status,type}))
      }

       }

const capsule = useSelector(getCapsuleSelector)
const upcomingCapsule = useSelector(getUpcomingCapsuleSelector)
const totalCount = capsule?.capsules?.length

console.log(capsule,'uppp')

const updatedCapsule = () => {
  const data = capsule?.capsules.map((datas)=>{
    return {
      ...datas,
      original_launch: datas?.original_launch ? datas.original_launch : new Date()
    }
  })

  return sortData(data,{ascending:false})
}


const updatedUpComingCapsule = () => {
  const data = upcomingCapsule?.upcomingCapsules.map((datas)=>{
    return {
      ...datas,
      original_launch: datas?.original_launch ? datas.original_launch : new Date()
    }
  })

  return sortData(data,{ascending:false})
}

const [currentTableData] = useCurrentData(updatedCapsule(), currentPage,PageSize)

    useEffect(()=>{
      async function getCapsule(){
   try{
         await Promise.allSettled(
           [
            dispatch(fetchCapsule()),
            dispatch(fetchUpcomingCapsule())
         ]
           )
   } catch(e){
     console.log(e)
   }
       }
       getCapsule()
     },[dispatch])

  return (
     <div className="w-[95%] xl:w-[85%] m-auto">
     <div className="bg-[#14171f] w-[100%] md:w-[60%] p-4 md:mx-auto mt-10 rounded-md grid grid-cols-2 md:grid-cols-4 gap-4">      
    <div className="bg-[#040D12] rounded-md">
        <CustomSelect options={capsuleType} placeholder='filter by type' onChange={onHandleType}/>
    </div>
    <div className="bg-[#040D12] rounded-md">
        <CustomSelect options={capsuleStatus} placeholder='filter by status' onChange={onHandleStatus}/>
    </div>
    <div className="bg-[#040D12] rounded-md">
      <CustomDatePicker selected={date} onChange={(date) => {
        console.log(date)
        setDate(date)
      }}/>
    </div>
        <CustomButton onClick={onHandleSearch}/>
    </div>
   
   <>
   <TitleHeader title='Discover Capsules'/>
{
 currentTableData.length > 0 ? <>
 {capsule?.loading? <Loader/>:<div>
    <div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
    {
        currentTableData.map((item, idx)=> <CapsuleItem key={idx} item={item}/>)
    }
   </div>
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
  </div>}
 </> : <EmptyState name={ `Capsules` }/>
}
    </>

   <>
   {updatedUpComingCapsule().length > 0 ?     <>
    <TitleHeader title='Upcoming Capsules'/>
<div className="grid grid-cols-2 max-[300px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 p-2 gap-3">
    {
        updatedUpComingCapsule().map((item, idx)=> <CapsuleItem key={idx} item={item}/>)
    }
   </div>
   </> :null}
   </>
   </div>
    
  )
}

export default Capsule    