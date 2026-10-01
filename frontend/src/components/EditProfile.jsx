import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Card from "./Card";

export default function EditProfile() {
    const user = useSelector((store) => store.user);
    const [name, setName] = useState(user?.name || "");
    const [skills, setSkills] = useState(user?.skills || "");
    const [about, setAbout] = useState(user?.about || "");
    const [url, setUrl] = useState(user?.photoUrl || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setSkills(Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "");
            setAbout(user.about || "");
            setUrl(user.photoUrl || "");
        }
    }, [user]);

    async function onSubmit(e) {
        e.preventDefault();
        setMessage("");
        setIsSuccess(false);
        try {
            const userId = user?._id;
            setIsSubmitting(true);
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/profile/edit/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, skills, about, photoUrl: url }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || data.msg || "Failed to update profile");
            }
            dispatch(addUser(data.user));
            setMessage(data.msg || "Profile updated successfully!");
            setIsSuccess(true);
        } catch (error) {
            setMessage(error.message);
            setIsSuccess(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    const previewUser = {
        name: name || user?.name || "Your Name",
        about: about || user?.about || "Tell the community about yourself...",
        skills: skills || user?.skills || "JavaScript, React, Node.js",
        photoUrl: url || user?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Edit Form */}
            <div className="card bg-base-200/60 border border-base-300 shadow-xl rounded-3xl">
                <div className="card-body p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">✏️</span>
                        <div>
                            <h2 className="card-title text-2xl font-bold">Edit Profile</h2>
                            <p className="text-sm text-base-content/70">Update your public information</p>
                        </div>
                    </div>

                    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ada Lovelace"
                                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Skills (comma-separated)</span>
                            </label>
                            <input
                                type="text"
                                placeholder="React, Node.js, TypeScript, Python"
                                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary"
                                value={skills}
                                onChange={(e) => setSkills(e.target.value)}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Bio / About</span>
                            </label>
                            <textarea
                                placeholder="Write a short summary about yourself and what you're working on..."
                                className="textarea textarea-bordered w-full rounded-xl h-24 focus:ring-2 focus:ring-primary"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Avatar Image URL</span>
                            </label>
                            <input
                                type="url"
                                placeholder="https://example.com/avatar.jpg"
                                className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>

                        {message && (
                            <div className={`alert ${isSuccess ? "alert-success" : "alert-error"} text-sm rounded-xl`}>
                                <span>{message}</span>
                            </div>
                        )}

                        <button className="btn btn-primary w-full rounded-xl font-bold shadow-md shadow-primary/20" disabled={isSubmitting}>
                            {isSubmitting ? <span className="loading loading-spinner" /> : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Live Card Preview */}
            <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest font-semibold text-base-content/60 mb-3">
                    Live Profile Preview
                </span>
                <Card user={previewUser} isPreview={true} />
            </div>
        </div>
    );
}