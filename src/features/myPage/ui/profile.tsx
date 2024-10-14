// src/pages/Home.tsx
import React from "react";
import { useAuthStore } from "../../auth/Login/model/store.ts";
import Profile3 from "../../../components/TestTokenProfile.tsx";

const Profile: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <div>
      <Profile3 />
    </div>
  );
};

export default Profile;
