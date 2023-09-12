/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { capitalizeFLetter } from '../../../utils/dataFormat'
import { parseDate } from '../../../utils/dateFormat'
import dragon1 from '../../image/dragon1.jpg'
import dragon2 from '../../image/dragon2.jpeg'
import dragon3 from '../../image/dragon3.jpg'
import dragon4 from '../../image/dragon4.jpg'
import SpaceItem from './SpaceItem'

const CapsuleItem = ({ item, ...props }) => {
  const imgSrc = item?.type === 'Dragon 1.0' ? dragon1 : item?.type === 'Dragon 1.1' ? dragon2 : item?.type === 'Dragon 2.0' ? dragon3 : dragon4
  return (
    <div className='w-full md:w-56 lg:w-[240px] xl:w-[240px] border-[1px] border-[#ffffff4d] rounded-md cursor-pointer'{...props}>
      <div className='w-full h-[130px]'>
        <img src={imgSrc} alt="dragon" className='rounded-t-md h-full w-full' />
      </div>
      <div className='flex justify-between p-3'>
        <div>
          <SpaceItem title={'Capsule_serial'} value={item?.capsule_serial} />
          <SpaceItem title={'Date launch'} value={parseDate(item?.original_launch, { separator: '/', iso: true })} />
        </div>
        <div>
          <SpaceItem title={'Type'} value={item?.type} />
          <SpaceItem title={'Status'} value={capitalizeFLetter(item?.status)} />
        </div>
      </div>
    </div>
  )
}

export default CapsuleItem