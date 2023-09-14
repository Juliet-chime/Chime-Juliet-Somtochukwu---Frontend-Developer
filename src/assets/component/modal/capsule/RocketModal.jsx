import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOneRocket, getOneRocketSelector } from '../../../../services/slice/rocket/oneRocket'
import Loader from '../../loader'
import TitleHeader from '../../TitleHeader'
import SpaceItem from '../../capsule/SpaceItem'
import { capitalizeFLetter } from '../../../../utils/dataFormat'

const RocketModal = ({ id }) => {
  const dispatch = useDispatch()
  const rocket = useSelector(getOneRocketSelector)

  const loading = useSelector((state) => state.rocket.loading)

  const imgSrc = rocket?.flickr_images ? rocket?.flickr_images[0] : ''

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

  if (loading) {
    return <Loader />
  }

  return (
    <div className='mt-5'>
      <TitleHeader title={`Rocket ${id}`} className="my-2 pb-2 text-[1rem] font-bold border-b-[0.1px] border-[#ffffff4d]" />
      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-16'>
        <div className='h-72 relative'>
          <img src={imgSrc || rocket} alt={rocket?.rocket_name} className='h-full w-full object-cover rounded-md' />
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

export default RocketModal