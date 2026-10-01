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
            <div className="flex flex-col items-center justify-center min-h-[65vh] gap-3">
                <span className="loading loading-dots loading-lg text-primary"></span>
                <p className="text-sm text-base-content/60">Finding developers nearby...</p>
            </div>
        );
    }

    // Guard 2: Empty state if no users returned
    if (feed.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[65vh] px-4 text-center">
                <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center text-3xl shadow-inner mb-4">
                    🔍
                </div>
                <h2 className="text-2xl font-bold">You're all caught up!</h2>
                <p className="text-base-content/70 mt-2 max-w-sm text-sm">
                    No new developers to show right now. Check back soon or refine your profile to get discovered!
                </p>
                <button
                    className="btn btn-primary btn-sm mt-6 rounded-full px-6"
                    onClick={() => {
                        dispatch(addFeed(null));
                        getFeed();
                    }}
                >
                    Refresh Feed
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 px-4">
            <div className="mb-4 text-center">
                <span className="text-xs uppercase tracking-widest font-semibold text-primary/80">
                    Discover Developers
                </span>
            </div>
            <Card user={feed[0]} />
        </div>
    );
}