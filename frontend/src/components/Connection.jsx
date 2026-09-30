import { addConnection } from "../utils/connectionSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Connection() {
    const connections = useSelector((store) => store.connections)
    const dispatch = useDispatch()

    async function fetchConnection() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/connections`, {
                method: "GET",
                credentials: "include"
             }) 
              if (!res.ok) return;
            const data = await res.json();
           
            dispatch(addConnection(data.data))
            console.log(data);
            
            
        } catch (error) {
            
        }

    }

    useEffect(() => {
        fetchConnection()
        
    }, [])
    if(!connections)return 
    if(connections.length === 0) return <div>No connections</div>


    return <div>
        <h1>Connection</h1>
        {connections.map((c)=>{
            const {name, photoUrl, about, skills} = c
            return <div key={c._id}>
                <img alt ="photo" src={photoUrl}/>
                <div>{name}</div>
                <div>{about}</div>
                <div>{skills}</div>

            </div>
        }
        )}
    </div>

} 