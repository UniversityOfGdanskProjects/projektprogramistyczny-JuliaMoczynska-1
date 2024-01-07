import React, { useState } from "react";
import SideBar from "./SideBar";
import Uploder from "../../Components/Uploder";
import { Input } from "../../Components/UsedInputs";

function Profile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleUpdateAccount = () => {
        // Tutaj możesz dodać logikę aktualizacji konta
        console.log("Updating account...");
    };

    const handleDeleteAccount = () => {
        // Tutaj możesz dodać logikę usuwania konta
        console.log("Deleting account...");
    };

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <Uploder />
                <form>
                    <Input
                        label="FullName"
                        type="text"
                        placeholder="Enter your name"
                        bg={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        bg={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </form>
                <div className="flex justify-between">
                    <button
                        onClick={handleUpdateAccount}
                        className="bg-blue-500 hover:bg-main border border-blue-500 transitions text-white py-2 px-4 rounded "
                    >
                        Update Account
                    </button>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-500 hover:bg-main border border-red-500 transitions text-white py-2 px-4 rounded"
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </SideBar>
    );
}

export default Profile;
