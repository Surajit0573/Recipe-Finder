import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/SignUp.css'
import { AppContext } from "../AppContext";
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const { isLoggedin } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData(){
      const curr=await isLoggedin();
    if(curr){
      toast.warn("Your already logged in");
      return navigate('/');
    }
  }
  fetchData();
  }, []);
  const styles =
  {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
      '& input': {
        color: 'white',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
  }

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
      if (result.ok) {
        toast.success(`${result.message}`);
       return navigate('/');
      } else if (!result.ok) {
        toast.error(`${result.message}`);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };


  return (

    <>
      <div className="signup">
        <form onSubmit={handleSubmit}>
          <div className="signup-form">
            <p className='text-3xl font-semibold mb-4'>Login to your RecipeBook</p>
            <TextField id="outlined-basic" label="Full Name" name='username' value={formData.username} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <TextField id="outlined-basic" label="Password" name='password' value={formData.password} onChange={handleChange} variant="outlined" sx={styles} className='inputtext' />
            <Button type='submit' variant="contained" size="medium">Log In</Button>
            <p>Doesn't have an account? <NavLink to='/signup'>Sign Up</NavLink></p>
          </div>
        </form>
      </div>
    </>
  )
}