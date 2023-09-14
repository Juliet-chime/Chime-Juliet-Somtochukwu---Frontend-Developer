
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
  const { id } = useParams()

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

  return (
    <div className='p-5 lg:p-14 xl:p-20'>
      <TitleHeader title={`Rocket ${id}`} />
      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-16'>
        <div className='h-72 relative'>
          <img src={rocket?.flickr_images[0] || rocket?.flickr_images[1]} alt={rocket?.rocket_name} className='h-full w-full object-cover rounded-md' />
          <p className={`absolute top-3 right-3 ${rocket?.active ? 'text-[#9ee9bd]' : 'text-[#e6cfcf]'} ${rocket?.active ? 'bg-[#00a67e]' : 'bg-[#fa113d]'} rounded-sm py-0 px-2`}>{rocket?.active ? 'Active' : 'Inactive'}</p>
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
            rocket?.description !== null ? <div className='mt-4'>
              <SpaceItem title={'Description'} value={capitalizeFLetter(rocket?.description)} />
              <span>
                <a href={rocket?.wikipedia} target="_blank" rel="noreferrer" className="text-[#f690a3] text-[12px] font-bold">Read More</a>
              </span>
            </div> : null
          }
        </div>
      </div>
    </div>
  )
}

export default DetailRocket