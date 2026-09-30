import EditProfile from "./EditProfile"
import ShowProfile from "./ShowProfile"


export default function Profile(){
    return <div className="flex justify-around">
        <EditProfile/>
        <ShowProfile/>
        
    </div>
}