import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import Card from "./Card";


export default function Feed() {
    const dispatch = useDispatch();
    const feed = useSelector(store =>store.feed)
     

   const getFeed = (async()=>{
    
        if(feed) return;
        try {
            const res  = await fetch(`${import.meta.env.VITE_BASE_URL}/feed`,{
                method: "GET",
                credentials:"include"
            })
            if(!res.ok) return
            const data = await res.json();
            console.log(data);
            
            dispatch(addFeed(data));
            
        } catch (error) {
            console.log(error);
            
            
        }
    })
   

    useEffect(()=> {
        getFeed();
    }, [])
      if (!feed) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    // Guard 2: Empty state if no users returned
    if (feed.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-lg text-base-content/70">No new users in feed!</p>
            </div>
        );
    }




    return <div className="flex items-center justify-center ">
        <Card user={feed[0]}></Card>
    </div>
}