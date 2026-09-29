import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router";

export default function Body(){
    return <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
        
    </div>
}