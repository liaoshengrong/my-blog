import React from "react";
import { useNavigate } from "react-router-dom";

const useMyNav = () => {
  const navgaitor = useNavigate();
  const go = (path, state) => {
    navgaitor(path, { state });
  };
  return {
    go,
  };
};
export default useMyNav;
