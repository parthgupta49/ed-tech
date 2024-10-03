import React, { useEffect, useState } from 'react'

import logo from '../../assets/Logo/Logo-Full-Light.png'
import { NavbarLinks } from '../../data/navbar-links'
import { Await, Link, useLocation, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
const Navbar = () => {

    // const [currentPath,setCurrentPath] = useSearchParams
    const location = useLocation();

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart)


    const [subLinks,setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("data is : ",result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchSubLinks();
    },[])



    console.log("token is ", user);

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800'>
            <div className='w-11/12 max-w-maxContent mx-auto flex items-center justify-between '>
                <div>
                    {/* logo */}
                    <Link to={"/"}><img src={logo} alt='Studynotion logo' width={160} height={32} className='' /></Link>
                </div>

                <div>
                    <menu className='flex gap-6 items-center'>
                        {
                            NavbarLinks.map((element, index) => (
                                <Link key={index} to={element?.path}>
                                    {element.title === "Catalog" ? 
                                    <>
                                        <li className='text-white'>{element.title}</li>
                                    </> 
                                    : <li className={`${location.pathname === element.path ? 'text-yellow-50' : 'text-white'}`}>{element.title}</li>}
                                </Link>
                            ))
                        }
                    </menu>
                </div>
                {/* buttons - signup and login / dashboard */}
                {
                    token ?
                        <>

                        </> :
                        <div className='flex gap-4 items-center text-richblack-25' >
                            <Link to="/login"><button className='rounded-lg border p-2 px-3'>Log in</button></Link>
                            <Link to="/signup"><button className='rounded-lg border p-2 px-3'>Sign up</button></Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar