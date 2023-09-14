/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import dragon1 from '../../../../assets/image/dragon1.jpg';
import dragon2 from '../../../../assets/image/dragon2.jpeg';
import dragon3 from '../../../../assets/image/dragon3.jpg';
import dragon4 from '../../../../assets/image/dragon4.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneCapsule, getOneCapsuleSelector } from '../../../../services/slice/capsule/oneCapsule';
import TitleHeader from '../../TitleHeader';
import SpaceItem from '../../capsule/SpaceItem';
import { parseDate } from '../../../../utils/dateFormat';
import { capitalizeFLetter } from '../../../../utils/dataFormat';
import Loader from '../../loader';

const CapsuleModal = ({ id }) => {
  const dispatch = useDispatch();

  const capsule = useSelector(getOneCapsuleSelector);

  const loading = useSelector((state) => state.capsule.loading);

  const imgSrc =
    capsule?.type === 'Dragon 1.0'
      ? dragon1
      : capsule?.type === 'Dragon 1.1'
      ? dragon2
      : capsule?.type === 'Dragon 2.0'
      ? dragon3
      : dragon4;

  useEffect(() => {
    async function getOneCapsule() {
      try {
        if (id) {
          await dispatch(fetchOneCapsule(id));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getOneCapsule();
  }, [dispatch, id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mt-5">
      <TitleHeader
        title={`Capsule ${id}`}
        className="my-2 pb-2 text-[1rem] font-bold border-b-[0.1px] border-[#ffffff4d]"
      />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className=" h-72">
          <img src={imgSrc} alt="capsule" className="h-full w-full object-cover rounded-md" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SpaceItem title={'Capsule_serial'} value={capsule?.capsule_serial} />

            <SpaceItem title={'Type'} value={capsule?.type} />

            <SpaceItem title={'Landings'} value={capsule?.landings} />

            <SpaceItem
              title={'Date launch'}
              value={parseDate(capsule?.original_launch, { separator: '/', iso: true })}
            />

            <SpaceItem title={'Status'} value={capitalizeFLetter(capsule?.status)} />
          </div>
          {capsule?.details !== null ? (
            <div className="mt-4">
              <SpaceItem title={'Details'} value={capitalizeFLetter(capsule?.details)} />
            </div>
          ) : null}
          <div>
            {capsule?.missions?.length > 0 ? (
              <>
                <h1 className="mb-2 mt-4 text-[12px] md:text-[20px] font-bold text-[#ffffff80]">Misson</h1>
                {capsule?.missions?.map((item, idx) => (
                  <SpaceItem title={item.name} value={item?.flight} key={idx} />
                ))}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapsuleModal;
