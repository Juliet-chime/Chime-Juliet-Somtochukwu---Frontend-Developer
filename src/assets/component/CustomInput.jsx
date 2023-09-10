/* eslint-disable react/prop-types */

const CustomInput = (props) => {
  const { label, labelstyle } = props;
  return (
    <div className="">
      {!!label && <label className={labelstyle}>{label}</label>}
      <input {...props} className="border-0 bg-transparent outline-none h-full w-full"/>
    </div>
  );
};


export default CustomInput