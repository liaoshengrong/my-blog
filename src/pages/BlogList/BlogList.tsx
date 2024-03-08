import React, { useEffect, useMemo, useState } from "react";
import useMyNav from "../../router/nav";
import list, { FilesProps } from "../../config/list";
import Header from "../components/Header/Header";
import "./BlogList.less";
import MDRender from "../components/MdRender/MdRender";
function BlogList() {
  const { go } = useMyNav();
  const [dList, setDList] = useState([]);
  const [total, setTotal] = useState(0);
  const [previewItem, setPreviewItem] = useState<FilesProps>();
  const cWidth = useMemo(() => window.innerWidth, []);
  const [isShowPreview, setIsShowPreview] = useState(window.innerWidth > 768);

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
    const defaultList = [];
    list.forEach((item) => {
      item.list.forEach((v) => {
        defaultList.push(v);
      });
    });
    setPreviewItem(defaultList[0]);
    const sortArr = [...defaultList].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setDList(sortArr);
    setTotal(sortArr.length);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsShowPreview(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="blogList" style={{ minWidth: cWidth * 0.5 }}>
      {/* <div className="topBg"></div> */}
      <Header isHide={!isShowPreview} />
      <div className="create">
        <p onClick={() => go("/blog-edit")}>创建</p>
      </div>
      <div className={isShowPreview ? "ctBox" : "ctBox ctBox2"}>
        <div className="ctContainer">
          <div className="leftList">
            <div className="tagTitle">文章标签</div>
            <div className="tabAll" onClick={() => selectTag("all")}>
              <span>全部</span>
              <span>{`(${total})`}</span>
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
          {isShowPreview && (
            <div className="previewContainer">
              {previewItem ? (
                <div className="preview">{<MDRender item={previewItem} />}</div>
              ) : (
                <div className="emojiIcon">😋🤑🤑👻👻😋</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlogList;
