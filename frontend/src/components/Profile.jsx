import EditProfile from "./EditProfile";

export default function Profile() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold tracking-tight">Your Profile</h1>
                <p className="text-sm text-base-content/70 mt-1">
                    Customize your profile and see how other developers discover you
                </p>
            </div>
            <EditProfile />
        </div>
    );
}