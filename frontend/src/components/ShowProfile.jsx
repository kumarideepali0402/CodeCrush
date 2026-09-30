
import { useSelector } from "react-redux";



export default function ShowProfile() {
      const user = useSelector((store) => store.user)
       if (!user) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
      

    return<div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="text-center">
            <p className="text-4xl">👩‍💻</p>
            <h1 className="card-title justify-center text-3xl mt-2">Your Details</h1>
           
          </div>
          <div>
            <div>
                <img src={user.photoUrl} alt="avatar" />
            </div>
            <div>
                <div>{user.name}</div>
                <div>{user.about}</div>
                <div>{user.skills}</div>
            </div>
          </div>

          

         
        </div>
      </div>
    </div>
}