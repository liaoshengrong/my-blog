import React, { useEffect, useState } from "react";
import useMyNav from "../../router/nav";
import list, { FilesProps } from "../../config/list";
import Header from "../components/Header/Header";
import "./BlogList.less";
import MDRender from "../components/MdRender";
function BlogList() {
  const { go } = useMyNav();
  const [dList, setDList] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [previewItem, setPreviewItem] = useState<FilesProps>();
  console.log(list, dList, "listlist");

  const selectTag = (type) => {
    if (type === "all") {
      setDList(list.map((v) => v.list));
      return;
    }

    const newList = [];
    list.forEach((item) => {
      if (item.name === type) {
        item.list.forEach((v) => {
          newList.push(v);
        });
      }
    });
    setDList(newList);
  };
  const onPreview = (e, item) => {
    e.stopPropagation();
    console.log(item, "onPreview");
    if (item.name === previewItem?.name) {
      setShowPreview(false);
      setPreviewItem(null);
      return;
    }
    setShowPreview(true);
    setPreviewItem(item);
  };
  useEffect(() => {
    const defaultlist = [];
    list.forEach((item) => {
      item.list.forEach((v) => {
        defaultlist.push(v);
      });
    });
    setDList(defaultlist);
  }, []);
  return (
    <div className="blogList">
      <div className="topBg"></div>
      <Header />
      <div className="create">
        <p onClick={() => go("/blog-edit")}>创建</p>
      </div>
      <div className="ctBox">
        <div className="ctContainer">
          <div className="leftList">
            <div className="tagTitle">文章标签</div>
            <div className="tabAll" onClick={() => selectTag("all")}>
              全部
            </div>
            {list.map((item, index) => (
              <div
                className="tagItem"
                key={index}
                onClick={() => selectTag(item?.name)}
              >
                {`${item?.name}(${item.list.length})`}
              </div>
            ))}
          </div>
          <div className="listContainer">
            {dList.map((item, index) => (
              <div
                // className="listItem"
                className={`listItem ${
                  item.name === previewItem?.name ? "listItemActive" : ""
                }`}
                onClick={() => go("/blog?path=" + item.path)}
                key={index}
              >
                <p className="title">{item?.name}</p>
                <p className="desc">{item?.desc}</p>
                <div className="bottomBox">
                  <p className="date">{item?.date}</p>
                  <div className="btnBox">
                    <p className="read">阅读全文</p>
                    <p className="preview" onClick={(e) => onPreview(e, item)}>
                      预览
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showPreview && (
            <div className="previewContainer">
              <MDRender item={previewItem} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
