//DO POPRAWY



import React, { useState } from "react";
import SideBar from "./SideBar";
 import { Input } from "../../Components/UsedInputs";

function Password() {
    const [password, setPassword] = useState("");


    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <form>
                    <Input
                        label="Previous"
                        type="password"
                        placeholder="Enter your previous password"
                        bg={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="New"
                        type="password"
                        placeholder="Enter your new password"
                        bg={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        label="Confirm"
                        type="password"
                        placeholder="Confirm password"
                        bg={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        // onClick={handleDeleteAccount}
                        className="bg-red-500 text-white py-2 px-4 rounded"
                    >
                        Change Password
                    </button>
                </form>
                
            </div>
        </SideBar>
    );
}

export default Password;
