/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import SpaceItem from '../capsule/SpaceItem'

const RocketItem = ({ item, ...props }) => {
  return (
    <div className='w-full md:w-56 lg:w-[250px] xl:w-[250px] border-[1px] border-[#ffffff4d] rounded-md cursor-pointer pb-3'{...props}>
      <div className='w-full h-[130px] relative'>
        <img src={item?.flickr_images[0] || item?.flickr_images[1]} alt={item?.rocket_name} className='rounded-t-md h-full w-full' />
        <p className={`absolute top-3 right-3 ${item?.active ? 'text-[#9ee9bd]' : 'text-[#e6cfcf]'} ${item?.active ? 'bg-[#00a67e]' : 'bg-[#fa113d]'} rounded-sm py-0 px-2`}>{item?.active ? 'Active' : 'Inactive'}</p>
      </div>
      <div className='flex justify-between px-3 mt-3'>
        <div>
          <SpaceItem title={'Rocket name'} value={item?.rocket_name} />
          <SpaceItem title={'Company'} value={item?.company} />
        </div>
        <div>
          <SpaceItem title={'Rocket Type'} value={item?.rocket_type} />
          <SpaceItem title={'First Flight'} value={item?.first_flight} />
        </div>
      </div>
      <div className='px-3'>
        <SpaceItem title={'Country'} value={item?.country} />
      </div>
    </div>
  )
}

export default RocketItem