/* eslint-disable react/prop-types */
import { DOTS, usePagination } from '../../hook/usePagination';
import {FiArrowRight, FiArrowLeft} from 'react-icons/fi'
import { active, arrowStyle, disabled } from './style';
import { useRef } from 'react';
const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const ref = useRef()

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
    className='border-[0.5px] border-[#ffffff4d] py-2 mt-4 rounded-md flex items-center justify-center gap-4'
    ref={ref}
    >
      <li
      className={`${arrowStyle} ${currentPage === 1?disabled:active} `}
        onClick={onPrevious}
      >
        <div>
        <FiArrowLeft/>
        </div>
      </li>
      {paginationRange.map((pageNumber,idx) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={idx}>&#8230;</li>;
        }

        return (
          <li
          key={idx}
          className={`cursor-pointer font-bold text-lg ${pageNumber === currentPage?'text-white':'text-[#ffffff80]'}`}
            onClick={() => {
            //  console.log(ref.current.contains(e.currentTarget))
            //  console.log(ref.current && !ref.current.contains(e.currentTarget))

            //  console.log(ref.current.childNodes[idx + 1])

              //  if(ref.current.childNodes[idx + 1] === e.currentTarget){
              //   // console.log(e.target)
              //   onPageChange(pageNumber)
              // }
              onPageChange(pageNumber)
            }}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
      className={`${arrowStyle} ${currentPage === lastPage ? disabled:active} `}
        onClick={onNext}
      >
        <div className="arrow right" >
          <FiArrowRight/>
        </div>
      </li>
    </ul>
  );
};

export default Pagination;
