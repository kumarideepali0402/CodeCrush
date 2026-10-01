import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

export default function Card({ user, isPreview = false }) {
    const dispatch = useDispatch();
    if (!user) return null;
    const { _id, name, skills, about, photoUrl } = user;

    const skillsArray = Array.isArray(skills)
        ? skills
        : typeof skills === "string" && skills.trim().length > 0
        ? skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [];

    async function handleSendRequest(status) {
        if (isPreview) return;
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
        <div className="card w-full max-w-sm sm:max-w-md bg-base-100 shadow-xl border border-base-200/80 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <figure className="relative h-72 sm:h-80 w-full overflow-hidden bg-base-300">
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt={name || "user"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                    }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-base-100/90 via-transparent to-transparent pointer-events-none" />
                {isPreview && (
                    <span className="absolute top-3 right-3 badge badge-primary badge-sm font-semibold shadow">
                        Live Preview
                    </span>
                )}
            </figure>

            <div className="card-body p-6 text-center">
                <h2 className="card-title text-2xl font-bold justify-center tracking-tight">
                    {name || "Anonymous Developer"}
                </h2>
                
                <p className="text-sm text-base-content/80 mt-1 line-clamp-3 leading-relaxed">
                    {about || "No bio added yet."}
                </p>

                {skillsArray.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                        {skillsArray.map((skill, index) => (
                            <span
                                key={index}
                                className="badge badge-outline badge-primary text-xs px-2.5 py-1 font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {!isPreview && (
                    <div className="card-actions justify-center mt-6 gap-4">
                        <button
                            className="btn btn-outline btn-error rounded-full px-6 gap-2 hover:scale-105 transition-transform"
                            onClick={() => handleSendRequest("uninterested")}
                            title="Pass on profile"
                        >
                            <span>✕</span> Pass
                        </button>
                        <button
                            className="btn btn-primary rounded-full px-6 gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                            onClick={() => handleSendRequest("interested")}
                            title="Send connection request"
                        >
                            <span>💖</span> Interested
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}