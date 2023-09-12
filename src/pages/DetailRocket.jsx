
import { useParams } from "react-router-dom";
import { fetchOneRocket, getOneRocketSelector } from "../services/slice/rocket/oneRocket";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import TitleHeader from "../assets/component/TitleHeader";
import SpaceItem from "../assets/component/capsule/SpaceItem";
import { capitalizeFLetter } from "../utils/dataFormat";

const DetailRocket = () => {

    const dispatch = useDispatch()
    const rocket = useSelector(getOneRocketSelector)
    const {id} = useParams()

    console.log(rocket)

    useEffect(() => {
        async function getOneRocket() {
          try {
            if (id) {
              await dispatch(fetchOneRocket(id))
            }
          } catch (e) {
            console.log(e)
          }
        }
        getOneRocket()
      }, [dispatch, id])
    console.log(id)
  return (
    <div className='p-5 lg:p-14 xl:p-20'>
    <TitleHeader title={`Rocket ${id}`} />
    <div className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-16'>
    <div className='h-72 relative'>
        <img src={rocket?.flickr_images[0] || rocket?.flickr_images[1]} alt={rocket?.rocket_name} className='h-full w-full object-cover rounded-md' />
        <p className={`absolute top-3 right-3 ${rocket?.active ? 'text-[#9ee9bd]' : 'text-[#e6cfcf]'} ${rocket?.active ? 'bg-[#00a67e]' : 'bg-[#fa113d]'} rounded-sm py-0 px-2`}>{rocket?.active ? 'Active': 'Inactive'}</p>
      </div>
      <div className='flex flex-col justify-center'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
   <SpaceItem title={'Rocket name'} value={rocket?.rocket_name} />
   <SpaceItem title={'Company'} value={rocket?.company} />
   <SpaceItem title={'Rocket Type'} value={rocket?.rocket_type} />
   <SpaceItem title={'First Flight'} value={rocket?.first_flight} />
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
   <SpaceItem title={'Cost Per Launch'} value={`$ ${rocket?.cost_per_launch}`} />
   <SpaceItem title={'Country'} value={rocket?.country} />
   <SpaceItem title={'Success Rate'} value={rocket?.success_rate_pct} />
   <SpaceItem title={'Mass'} value={`${rocket?.mass?.kg}kg , ${rocket?.mass?.lb}lb`} />
      </div>
      {
         rocket?.description !== null  ?  <div className='mt-4'>
          <SpaceItem title={'Description'} value={capitalizeFLetter(rocket?.description)} />
          <span>
            <a href={rocket?.wikipedia} target="_blank" rel="noreferrer" className="text-[#f690a3] text-[12px] font-bold">Read More</a>
          </span>
         </div>:null
        }
      </div>
    </div>
    {/* <div className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-16'>
      <div className=' h-72'>
        <img src={imgSrc} alt='capsule' className='h-full w-full object-cover rounded-md' />
      </div>
      <div className='flex flex-col justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <div>
            <SpaceItem title={'Capsule_serial'} value={capsule?.capsule_serial} />
          </div>
          <div>
            <SpaceItem title={'Type'} value={capsule?.type} />
          </div>
          <div>
            <SpaceItem title={'Landings'} value={capsule?.landings} />
          </div>
          <div>
            <SpaceItem title={'Date launch'} value={parseDate(capsule?.original_launch, { separator: '/', iso: true })} />
          </div>
          <div>
            <SpaceItem title={'Status'} value={capitalizeFLetter(capsule?.status)} />
          </div>
        </div>
        {
         capsule?.details !== null  ?  <div className='mt-4'>
          <SpaceItem title={'Details'} value={capitalizeFLetter(capsule?.details)} />
         </div>:null
        }
        <div>
          {capsule?.missions ? <>

            <h1 className='mb-2 mt-4 text-[12px] md:text-[20px] font-bold text-[#ffffff80]'>Misson</h1>
            {
              capsule?.missions?.map((item, idx) => <SpaceItem title={item.name} value={item?.flight} key={idx} />)
            }
          </> : null}
        </div>
      </div>
    </div> */}
  </div>
  )
}

export default DetailRocket