import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneCapsule, getOneCapsuleSelector } from '../services/slice/capsule/oneCapsule';
import { useDispatch, useSelector } from 'react-redux';
import dragon1 from '../assets/image/dragon1.jpg';
import dragon2 from '../assets/image/dragon2.jpeg';
import dragon3 from '../assets/image/dragon3.jpg';
import dragon4 from '../assets/image/dragon4.jpg';
import { capitalizeFLetter } from '../utils/dataFormat';
import { parseDate } from '../utils/dateFormat';
import TitleHeader from '../assets/component/TitleHeader';
import SpaceItem from '../assets/component/capsule/SpaceItem';

const DetailCapsule = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const capsule = useSelector(getOneCapsuleSelector);

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
  return (
    <div className="p-5 lg:p-14 xl:p-20">
      <TitleHeader title={`Capsule ${id}`} />
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-16">
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
            {capsule?.missions ? (
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

export default DetailCapsule;
