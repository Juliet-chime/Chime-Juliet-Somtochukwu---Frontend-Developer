/* eslint-disable react/prop-types */

const SpaceItem = ({ title, value }) => {
  return (
    <div>
      <h2 className='mb-2 text-[12px] md:text-[14px] font-bold'>{title}<br />
        <span className={`text-[12px] font-bold ${value === 'Active' ? 'text-[#00a67e]' : value === 'Destroyed' ? 'text-[#FA113D]' : value === 'Retired' ? 'text-[#BECDE6]' : 'text-[#ffffff80] '}`}> {value}</span>
      </h2>
    </div>
  )
}

export default SpaceItem