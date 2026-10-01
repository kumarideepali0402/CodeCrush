import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Request() {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    async function fetchRequest() {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/requests/received`, {
                method: "GET",
                credentials: "include"
            });
            if (!res.ok) return;
            const data = await res.json();
            dispatch(addRequests(data.data));
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        }
    }

    async function reviewRequest(status, requestId) {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}/request/review/${status}/${requestId}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            if (!res.ok) return;
            // Remove request from Redux store so the card disappears immediately
            dispatch(removeRequests(requestId));
        } catch (error) {
            console.error("Failed to review request:", error);
        }
    }

    useEffect(() => {
        fetchRequest();
    }, []);

    if (!requests) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <span className="loading loading-dots loading-lg text-primary"></span>
                <p className="text-sm text-base-content/60">Fetching connection requests...</p>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center text-3xl shadow-inner mb-4">
                    📬
                </div>
                <h2 className="text-2xl font-bold">No Pending Requests</h2>
                <p className="text-base-content/70 mt-2 max-w-sm text-sm">
                    You're all caught up! When other developers show interest in connecting, you'll see them here.
                </p>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 max-w-3xl mx-auto py-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-base-200">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Connection Requests</h1>
                    <p className="text-sm text-base-content/70 mt-1">
                        Developers who would like to connect with you ({requests.length})
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {requests.map((c) => {
                    const { name, photoUrl, about, skills } = c.fromUserId || {};
                    const skillsArray = Array.isArray(skills)
                        ? skills
                        : typeof skills === "string" && skills.trim().length > 0
                        ? skills.split(",").map((s) => s.trim()).filter(Boolean)
                        : [];

                    return (
                        <div
                            key={c._id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between bg-base-200/70 border border-base-300 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all gap-4"
                        >
                            <div className="flex items-start sm:items-center gap-4">
                                <img
                                    alt={name || "developer"}
                                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-primary/20 shrink-0"
                                />
                                <div className="space-y-1">
                                    <div className="font-bold text-lg leading-tight">{name || "Anonymous Developer"}</div>
                                    {about && <p className="text-sm text-base-content/70 line-clamp-2">{about}</p>}
                                    {skillsArray.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {skillsArray.slice(0, 4).map((s, idx) => (
                                                <span key={idx} className="badge badge-outline badge-primary badge-xs py-2 px-2 font-medium">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex sm:flex-col sm:shrink-0 gap-2 w-full sm:w-auto">
                                <button
                                    className="btn btn-primary btn-sm flex-1 sm:w-28 rounded-lg shadow-sm font-semibold"
                                    onClick={() => reviewRequest("accepted", c._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-outline btn-error btn-sm flex-1 sm:w-28 rounded-lg font-semibold"
                                    onClick={() => reviewRequest("rejected", c._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
} 