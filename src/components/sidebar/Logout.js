import Button from "@mui/material/Button";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import useAuth from "../../hooks/useAuth";
import { resetProductDetailState } from "../../redux/slices/product_detail";
import { resetAnalyticsState } from "../../redux/slices/store_analytics";

const Label = styled.span`
  color: #ffffff;
  font-size: 16px;
  padding-left: 5px;
`;

const LogoutButton = styled(Button)`
  background: #233044;
  border-radius: 0 !important;

  &:hover {
    background-color: #202d3f !important;
  }
`;

function Logout({ expanded }) {
  const dispatch = useDispatch();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    dispatch(resetAnalyticsState());
    dispatch(resetProductDetailState());

    await signOut();
    navigate("/auth/sign-in");
  };

  return (
    <LogoutButton onClick={handleSignOut} fullWidth>
      <FaSignOutAlt size={"1.5em"} color={"#eeeeee"} />
      {expanded && <Label> Logout</Label>}
    </LogoutButton>
  );
}

export default Logout;
