import React, { useEffect, useMemo, useState } from "react";
import useMyNav from "../../router/nav";
import list, { FilesProps } from "../../config/list";
import Header from "../components/Header/Header";
import "./BlogList.less";
import MDRender from "../components/MdRender";
function BlogList() {
  const { go } = useMyNav();
  const [dList, setDList] = useState([]);
  const [previewItem, setPreviewItem] = useState<FilesProps>();
  const cWidth = useMemo(() => window.screen.width, []);
  const selectTag = (type) => {
    const newList = [];

    if (type === "all") {
      list.forEach((item) => {
        item.list.forEach((v) => {
          newList.push(v);
        });
      });

      setDList(newList);
      return;
    }

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
    if (item.name === previewItem?.name) {
      setPreviewItem(null);
      return;
    }
    setPreviewItem(item);
  };
  useEffect(() => {
    const defaultlist = [];
    list.forEach((item) => {
      item.list.forEach((v) => {
        defaultlist.push(v);
      });
    });
    setPreviewItem(defaultlist[0]);
    setDList(defaultlist);
  }, []);

  return (
    <div className="blogList" style={{ minWidth: cWidth * 0.5 }}>
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
              <span>全部</span>
              <span>{`(${list.length})`}</span>
            </div>
            {list.map((item, index) => (
              <div
                className="tagItem"
                key={index}
                onClick={() => selectTag(item?.name)}
              >
                <span>{item?.name}</span>
                <span>{`(${item.list.length})`}</span>
              </div>
            ))}
          </div>
          <div className="listContainer">
            {dList.map((item, index) => (
              <div
                className={`listItem ${
                  item.name === previewItem?.name ? "listItemActive" : ""
                }`}
                onClick={(e) => onPreview(e, item)}
                key={index}
              >
                <p className="title">{item?.name}</p>
                <p className="desc">{item?.desc}</p>
                <div className="bottomBox">
                  <p className="date">{item?.date}</p>
                  <div className="btnBox">
                    <p
                      className="read"
                      onClick={() => go("/blog?path=" + item.path)}
                    >
                      阅读全文
                    </p>
                    <p className="preview" onClick={(e) => onPreview(e, item)}>
                      预览
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="previewContainer">
            {previewItem && <MDRender item={previewItem} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogList;
