import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ahaSsoLogin } from "app/hooks/auth/authManager";

const Invite = (props: any) => {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    ahaSsoLogin();
  }, [id]);

  return null;
};
export default Invite;
