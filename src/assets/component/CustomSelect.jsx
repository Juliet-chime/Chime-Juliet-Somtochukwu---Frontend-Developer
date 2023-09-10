/* eslint-disable react/prop-types */

const CustomSelect = (props) => {
    const {label,labelstyle, options, placeholder} = props
    return (
        <div className="">
          {!!label && <label className={labelstyle}>{label}</label>}
          <select className="border-0 bg-transparent outline-none w-full h-[48px] px-2 cursor-pointer" {...props}>
          <option value="" disabled selected className="bg-[#040D12]">{placeholder}</option>
            {options.map((item,idx)=><option value={item.value} key={idx} className="bg-[#040D12]">{item.label}</option>)}
          </select>
        </div>
      );
}

export default CustomSelect