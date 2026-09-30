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
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center mt-10 text-lg text-base-content/70">
                No requests found
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Requests</h1>
            <div className="space-y-4">
                {requests.map((c) => {
                    const { name, photoUrl, about, skills } = c.fromUserId || {};
                    return (
                        <div key={c._id} className="flex items-center justify-between bg-base-200 p-4 rounded-box shadow-sm">
                            <div className="flex items-center gap-4">
                                <img
                                    alt="photo"
                                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <div className="font-semibold text-lg">{name}</div>
                                    {about && <div className="text-sm text-base-content/70">{about}</div>}
                                    {skills && (
                                        <div className="text-sm text-primary mt-1">
                                            {Array.isArray(skills) ? skills.join(", ") : skills}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => reviewRequest("accepted", c._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm"
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