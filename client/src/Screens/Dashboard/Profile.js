import { useContext } from "react";
import SideBar from "./SideBar";
import { UserContext } from "../../Context/Context";

function Profile() {
  const { userInfo } = useContext(UserContext);

  const fullName = userInfo?.fullName;
  const email = userInfo?.email;

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Welcome, {fullName}!</h2>
        <p className="text-lg">Your email: {email}</p>
      </div>
    </SideBar>
  );
}

export default Profile;
