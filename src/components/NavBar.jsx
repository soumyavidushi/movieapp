import {Link} from 'react-router-dom';
import Logo from '../assets/logo.svg';

const NavBar = () => {
  return (
    <div className="flex space-x-5 items-center pl-3 py-4">
    <Link to="/"><img className="w-[50px]" src={Logo} alt="" /></Link>
    <Link to="/" className="text-blue-500 text-3xl font-bold space-x-8">Movies</Link>
    <Link to="/watchlist" className="text-blue-500 text-3xl font-bold">Watchlist</Link>
  </div>
  );
};
export default NavBar;
