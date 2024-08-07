import logo from '../assets/logo.png';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate, NavLink,useLocation } from 'react-router-dom';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLog, setIsLog] = useState(false);
  const { isLoggedin } = useContext(AppContext);
  useEffect(() => {
    async function fetchData() {
      try{
      const curr = await isLoggedin();
      console.log(curr);
      setIsLog(curr);
      }catch(e){
        toast.error('Something went wrong');
      }
    }
    fetchData();
  }, [location]);

  const handleLogout = async () => {
    // Handle user logout
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/logout`, {
        credentials: "include",
        withCredentials: true,
      });
      const result = await response.json();
      if (!result.ok) {
        console.error('Failed to logout');
        toast.error('Failed to logout');
      } else {
        setIsLog(false);
        toast.success(`${result.message}`);
       return navigate('/');
      }
    } catch (e) {
      console.error('Failed to logout:', e);
      toast.error('Failed to logout');
    }
  };

  return (<>
    <ToastContainer />
    <nav className="flex items-center justify-between w-full h-16 bg-[#003031] mb-4 px-4">
      <div className="flex items-center">
        <NavLink to={'/'} className="text-white"><img src={logo} className="w-16 h-16 mx-auto my-4" /></NavLink>
        <NavLink to={'/'} className="text-white"><p className="h2">RecipeFinder</p></NavLink>
        <NavLink to={'/myrecipes'} className="text-white"><p className="h2" >My Recipes</p></NavLink>
        <NavLink to={'/ingredient'} className="text-white"><p className="h2">Browse Ingredients</p></NavLink>
        <NavLink to={'/country'} className="text-white"><p className="h2">Browse Country</p></NavLink>
      </div>
      <div className='flex items-center'>
        <NavLink to={'/myRecipes#LikedRecipes'}><i className="fa-solid fa-heart text-red-600 text-2xl"></i></NavLink>
        {isLog ? <button className="w-fit mx-4" onClick={handleLogout}>LogOut</button> : <NavLink to={"/login"}><button className="w-fit mx-4">Login</button></NavLink>}

      </div>
    </nav>
  </>);
}