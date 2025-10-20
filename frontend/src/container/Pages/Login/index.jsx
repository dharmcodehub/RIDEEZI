import { Input } from 'postcss'
import React, { useContext, useEffect, useState } from 'react'
import InputField from '../../../components/InputField'
import { User, LockKeyhole, ShieldUser } from 'lucide-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import LoginSignupHeader from '../../../components/LoginSignupHeader'
import PrimaryButton from '../../../components/PrimaryButton'
import DontOrHaveAccount from '../../../components/DontOrHaveAccount'
import SecondaryButton from '../../../components/SecondaryButton'
import { UserDataContext } from '../../../context/UserContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password , setPassword] = useState('');
  const {user,setUser} = useContext(UserDataContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const formSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: username,
      password: password,
    };

    if (!username || !password) {
      toast.error('Please fill in all fields.', { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!', { position: "top-right" });
        navigate('/ride');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, { position: "top-right" });
      } else {
        toast.error('Something went wrong. Please try again.', { position: "top-right" });
      }
    }

    setUsername('');
    setPassword('');
  };

  return (
    <>
       <div className='min-h-screen w-full bg-gray-200 flex justify-center items-center'>
        <div className='w-30 bg-white rounded'>
            <LoginSignupHeader header={"User Login"} Icon={ShieldUser} description={"Welcome back, Login to user Account"}/>
            <form className='w-full p-3 flex flex-col gap-3' onSubmit={(e)=>{
              formSubmit(e);
            }}>
              <InputField value={username} callback={setUsername} type={"email"} label='Email' Icon={User}/>
              <InputField value={password} callback={setPassword} type={"password"} label='Password' Icon={LockKeyhole}/>
              <div className='flex justify-between items-center'>
                <div>
                <input type="checkbox" name='remember me' className='mr-1 accent-primary-500' />
                <label htmlFor="remember me">Remember me</label>
                </div>
                <Link to='/forgot-password' className='text-primary-600'>Forgot Password?</Link>

              </div>
              <PrimaryButton content={'Login'}/>
              <DontOrHaveAccount content={"Don't have an Account ? "} link={'/signup'} heading={"Register"}/>


            </form>
              <SecondaryButton content={'Login as Driver'} link={'/captain-login'}/>
        </div>
      </div>
    </>
  )
}

export default Login
