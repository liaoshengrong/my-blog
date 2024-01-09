import React from "react";
import useMyNav from "../../router/nav";
import list from "../../config/list";
function BlogList() {
  const { go } = useMyNav();
  return (
    <div>
      <div onClick={() => go("/blog-edit")}>create</div>
      {list.map((item, index) => (
        <div key={index}>
          <div>{item.name}</div>
          {item.list.map((v, i) => (
            <div key={v.name} onClick={() => go("/blog?path=" + v.path)}>
              {v.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default BlogList;
