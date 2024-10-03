import React, { useState } from 'react'
import login from '../assets/Images/login.webp';
import Button from '../components/core/Homepage/Button';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import frame from '../assets/Images/frame.png'
import { Link } from 'react-router-dom';

const Login = () => {

    function formSubmitHandler(event) {
        event.preventDefault();
    }

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    function changeHandler(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        console.log(formData);
    }

    const [visible, setVisible] = useState(false);

    function handleVisibility() {
        setVisible(!visible);
    }

    return (
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <div className='flex justify-between text-white  pt-[10rem] items-center'>
                <div className='flex flex-col gap-5 w-[35%]'>
                    <h2 className='font-semibold text-3xl'>Welcome Back</h2>
                    <div>
                        <p className='text-richblack-100 text-lg font-medium'>Build skills for today, tomorrow and beyond.</p>
                        <p className='italic text-[#47a5c5] font-edu-sa font-bold'>Education to future-proof your career.</p>
                    </div>
                    <form onSubmit={formSubmitHandler} className='flex flex-col gap-5'>
                        <label className='flex flex-col gap-1 relative'>
                            <span className='text-sm text-richblack-25 font-medium'>Email Address <sup className='text-pink-200'>*</sup></span>
                            <input className=' outline-none  rounded-md bg-richblack-700 inputBoxShadow  placeholder:text-richblack-300 py-3 px-3' type='email' name='email' placeholder='Enter email address' onChange={changeHandler} value={formData.email} required/>
                        </label>

                        <label className=' flex flex-col gap-1 relative'>
                            <span className='text-sm text-richblack-25 font-medium'>Password <sup className='text-pink-200'>*</sup></span>
                            <input className='outline-none  rounded-md bg-richblack-700 inputBoxShadow  placeholder:text-richblack-300 py-3 px-3' type={`${visible ? "text" : "password"}`} name='password' placeholder='Enter Password' onChange={changeHandler} value={formData.password} required/>
                            <span className='absolute right-3 bottom-[1rem] ' onClick={handleVisibility}>
                                {
                                    visible ? <IoEyeOff size={'1.4rem'} color='white' /> : <IoEye size={'1.4rem'} color='white' />
                                }


                            </span>
                            <Link to={"/forgotpassword"}><span className='absolute right-0 text-xs text-[#47a5c5]'>Forgot Password</span></Link>
                        </label>

                        <div className='mt-10 text-lg'><Button active={true} linkTo={"/signup"}>Sign In</Button></div>
                    </form>
                </div>

                <div className='relative flex justify-center items-center'>
                    <img src={login} alt='Login' className='absolute login z-10' />
                    <img src={frame} alt='Frame' className='translate-x-5 translate-y-5' />
                </div>
            </div>
        </div>
    )
}

export default Login