import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";



export default function EditProfile() {
     const user = useSelector((store) => store.user)
      const [name, setName] = useState(user?.name);
      const [skills, setSkills] = useState(user?.skills);
      const [about, setAbout] = useState(user?.about);
      const [url, setUrl] = useState(user?.photoUrl)
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [message, setMessage] = useState("");
     
   
     
      const dispatch = useDispatch()

      useEffect(() => {
        if (user) {
            setName(user.name || "");
            setSkills(Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "");
            setAbout(user.about || "");
            setUrl(user.photoUrl || "");
        }
    }, [user])
     


      async function onSubmit(e) {
        e.preventDefault();
        setMessage('');
        try {
            const userId = user?._id;
            setIsSubmitting(true);
            setMessage("");
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile/edit/${userId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ name, skills, about, photoUrl: url }),
          });
          const data = await res.json();
          dispatch(addUser(data.user))
          setMessage(data.msg);
        } catch (error) {
          setMessage(error.message);
        } finally {
          setIsSubmitting(false);
        }
      }
        

        return<div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-10">
        <div className="card w-full max-w-md bg-base-200 shadow-xl">
            <div className="card-body">
            <div className="text-center">
                <p className="text-4xl">👩‍💻</p>
                <h1 className="card-title justify-center text-3xl mt-2">Edit Details</h1>
                <p className="text-base-content/70 mt-1">Edit your info</p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                <label className="form-control w-full">
                <span className="label-text mb-1">Name</span>
                <input
                    type="text"
                    placeholder="name"
                    className="input input-bordered w-full"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    
                />
                </label>
                <label className="form-control w-full">
                <span className="label-text mb-1">Skills</span>
                <input
                    type="text"
                    placeholder="skills"
                    className="input input-bordered w-full"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    
                />
                </label>
                <label className="form-control w-full">
                <span className="label-text mb-1">About</span>
                <input
                    type="text"
                    placeholder="about"
                    className="input input-bordered w-full"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    
                />
                </label>

                <label className="form-control w-full">
                <span className="label-text mb-1">Photo URL</span>
                <input
                    type="text"
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    
                />
                </label>

                {message && (
                <div className="alert alert-info text-sm">
                    <span>{message}</span>
                </div>
                )}

                <button className="btn btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                    <span className="loading loading-spinner" />
                ) : "Save details"}
                </button>
            </form>

            
            </div>
        </div>
        </div>
}