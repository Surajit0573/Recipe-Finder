import logo from '../assets/logo.png';
import {useState,useEffect,useContext} from 'react';
import { AppContext } from '../AppContext';
import { NavLink } from 'react-router-dom';
export default function Navbar(){
    const [isLog,setIsLog] = useState(false);
    const {isLoggedin} = useContext(AppContext);
    useEffect(() => {
        async function fetchData(){
        const curr = await isLoggedin();
        console.log(curr);
        setIsLog(curr);
        }
        fetchData();
      }, []);

      const handleLogout = async () => {
        // Handle user logout
        try {
          const response = await fetch('http://localhost:3000/api/user/logout', {
            credentials: "include",
            withCredentials: true,
          });
          if (!response.ok) {
            console.error('Failed to logout');
          } else {
            setIsLog(false);
            window.location.href = '/';
          }
          // localStorage.removeItem('token');
    
          // Clear user data in application state
    
        } catch (e) {
          console.error('Failed to logout:', e);
        }
      };

    return(<>
        <nav className="flex items-center justify-between w-full h-16 bg-[#003031] mb-4 px-4">
        <div className="flex items-center">
        <img src={logo} className="w-16 h-16 mx-auto my-4"/>
        <p className="h2">RecipeFinder</p>
        <p className="h2" >My Recipes</p>
        <p className="h2">Browse Ingredients</p>
        <p className="h2">Browse Country</p>
        </div>
        <div className='flex items-center'>
             <i className="fa-solid fa-heart text-red-600 text-2xl"></i>
            {isLog?<button className="w-fit mx-4" onClick={handleLogout}>LogOut</button>:<NavLink to={"/login"}><button className="w-fit mx-4">Login</button></NavLink>}

        </div>
        </nav>
    </>);
}