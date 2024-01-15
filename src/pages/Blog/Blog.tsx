import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MDRender from "../components/MdRender";

function Blog() {
  const location = useLocation();
  return (
    <div>
      <MDRender item={{ path: location.search.slice(6) }} />
    </div>
  );
}

export default Blog;
