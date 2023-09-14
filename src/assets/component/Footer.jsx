
const Footer = () => {
  return (
    <div className=" py-20 flex flex-col items-center justify-center">
      <h2 className="text-[10px] text-[#ffffff80] font-bold">Created by &#10084; Chime Juliet.</h2>
      <h4 className="text-[14px] text-[#ffffff80]">{new Date().toLocaleString('en-us', { dateStyle: "medium", timeStyle: 'medium' })}</h4>
    </div>
  )
}

export default Footer