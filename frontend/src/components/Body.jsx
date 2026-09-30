import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function Body(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)
    async function fetchUserDetails() {
        if(userData) return

        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile/view`, {
                method:"GET",
                credentials: "include"

            })
            if(res.status == 401) navigate("/login")
            if(!res.ok) return;
            const data = await res.json()
            dispatch(addUser(data))
            
        } catch (error) {
            
            console.log(error)
            
        } 

       
    }
    useEffect(()=> {
        
        fetchUserDetails()
    },[])
    return <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
        
    </div>
}