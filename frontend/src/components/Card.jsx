import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

export default function Card({ user }) {
    if (!user) return null;
    const { _id, name, skills, about, photoUrl } = user;
    const dispatch = useDispatch();

    async function handleSendRequest(status) {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/request/${status}/${_id}`, {
                method: "POST",
                credentials: "include"
            });
            if (!res.ok) return;

            dispatch(removeFeed(_id));
        } catch (error) {
            console.error(`Failed to send ${status} request:`, error);
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure className="h-64 overflow-hidden">
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={name || "user"}
                    className="w-full h-full object-cover"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                {about && <p className="text-center text-sm text-base-content/70">{about}</p>}
                {skills && (
                    <p className="text-center text-sm text-primary">
                        {Array.isArray(skills) ? skills.join(", ") : skills}
                    </p>
                )}
                <div className="card-actions justify-center mt-4 gap-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleSendRequest("uninterested")}
                    >
                        Uninterested
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleSendRequest("interested")}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    );
}