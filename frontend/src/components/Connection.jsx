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
        } catch (error) {
            console.error("Failed to fetch connections:", error);
        }

    }

    useEffect(() => {
        fetchConnection()
        
    }, [])

    if (!connections) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <span className="loading loading-dots loading-lg text-primary"></span>
                <p className="text-sm text-base-content/60">Loading your network...</p>
            </div>
        );
    }

    if (connections.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center text-3xl shadow-inner mb-4">
                    🤝
                </div>
                <h2 className="text-2xl font-bold">No Connections Yet</h2>
                <p className="text-base-content/70 mt-2 max-w-sm text-sm">
                    Head over to the feed and connect with fellow developers to expand your network!
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-base-200">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Your Connections</h1>
                    <p className="text-sm text-base-content/70 mt-1">
                        Developers you have successfully connected with ({connections.length})
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {connections.map((c) => {
                    const { _id, name, photoUrl, about, skills } = c;
                    const skillsArray = Array.isArray(skills)
                        ? skills
                        : typeof skills === "string" && skills.trim().length > 0
                        ? skills.split(",").map((s) => s.trim()).filter(Boolean)
                        : [];

                    return (
                        <div
                            key={_id}
                            className="card bg-base-200/60 hover:bg-base-200 border border-base-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                        >
                            <div className="card-body p-5">
                                <div className="flex items-center gap-4">
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-full ring-2 ring-primary/20 overflow-hidden">
                                            <img
                                                alt={name || "developer"}
                                                src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="overflow-hidden">
                                        <h2 className="font-bold text-lg truncate">{name}</h2>
                                        <span className="badge badge-success badge-sm gap-1 text-xs font-semibold">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Connected
                                        </span>
                                    </div>
                                </div>

                                {about && (
                                    <p className="text-sm text-base-content/80 mt-3 line-clamp-2 italic">
                                        "{about}"
                                    </p>
                                )}

                                {skillsArray.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-base-300/60">
                                        {skillsArray.slice(0, 4).map((skill, index) => (
                                            <span
                                                key={index}
                                                className="badge badge-ghost badge-sm text-xs font-medium"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {skillsArray.length > 4 && (
                                            <span className="badge badge-ghost badge-sm text-xs opacity-60">
                                                +{skillsArray.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 