// src/pages/Home.tsx
import React from "react";
import { useAuthStore } from "../../auth/Login/model/store.ts";

import Profile2 from "../../../components/mypageprofile.tsx";

const Profile: React.FC = () => {
  const token = useAuthStore((state) => state.token);

  return (
    <div>
      <Profile2 />
    </div>
  );
};

export default Profile;
