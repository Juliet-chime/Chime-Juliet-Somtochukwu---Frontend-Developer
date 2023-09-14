import { Link } from 'react-router-dom';
import { navMenu } from '../../constant';
import logo from '../image/logo.png';

const Header = () => {
  return (
    <div className={`bg-banner bg-no-repeat bg-left-top object-cover w-full h-[600px] py-10 flex flex-col`}>
      <div className="flex items-center justify-between pr-3 md:pr-40">
        <div className="h-[20px] w-[100px] md:w-[200px]">
          <img src={logo} alt="spacex-logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <ul className="flex items-center gap-5">
            {navMenu.map((nav, idx) => (
              <li key={idx} className="hover:text-[15px]">
                <Link to={nav.path}>{nav.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1 className="text-[3.2rem] md:text-[5rem] font-bold md:max-w-xl leading-[5rem] mt-[6rem] ml-2 md:ml-10">
        Explore Beyond Earth..
      </h1>
    </div>
  );
};

export default Header;
