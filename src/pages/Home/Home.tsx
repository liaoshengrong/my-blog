/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import hot_0 from "./images/hot-0.png";
import hot_1 from "./images/hot-1.png";
import hot_2 from "./images/hot-2.png";
import hot_3 from "./images/hot-3.png";
import "./home.less";
// import styles from "./home.module.less";
// import './'
const imgList = [hot_0, hot_1, hot_2, hot_3];
function Home() {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const go = (path) => {
    navigate(path);
  };
  const openNav = () => {
    document.getElementById("myNav").classList.toggle("menu_width");
    document
      .querySelector(".custom_menu-btn")
      .classList.toggle("menu_btn-style");
  };
  const mapList = Array(4).fill("");
  return (
    <div className="home_container">
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="index.html">
                <img src={logo} alt="" />
                <span>BLOG</span>
              </a>

              <div className="navbar-collapse" id="">
                <div className="custom_menu-btn">
                  <button onClick={openNav}>
                    <span className="s-1"> </span>
                    <span className="s-2"> </span>
                    <span className="s-3"> </span>
                  </button>
                </div>
                <div id="myNav" className="overlay">
                  <div className="overlay-content">
                    <a href="" onClick={() => go("/home")}>
                      主页
                    </a>
                    <a href="">暂未开放</a>
                    <a href="">暂未开放</a>
                    <a href="">暂未开放</a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <section className=" slider_section position-relative">
          <div className="side_heading">
            <h5>T a k e E a s y</h5>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-md-4 offset-md-1">
                <div id="carouselExampleIndicators" className="carousel slide">
                  <ol className="carousel-indicators">
                    {mapList.map((_, index) => (
                      <li
                        key={index}
                        className={active === index ? "li_active" : ""}
                      >
                        0{index + 1}
                      </li>
                    ))}
                  </ol>
                  <div className="carousel-inner">
                    {mapList.map((_, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${
                          active === index ? "item_active" : ""
                        }`}
                      >
                        <div className={`img-box ${"b-" + (index + 1)}`}>
                          <img src={imgList[index]} alt="" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="carousel_btn-box">
                    <a
                      className="carousel-control-prev"
                      role="button"
                      data-slide="prev"
                    >
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="carousel-control-next"
                      role="button"
                      data-slide="next"
                    >
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className=" col-md-5 offset-md-1">
                <div className="detail-box">
                  <h1>
                    Personal <br />
                    space
                  </h1>
                  {/* <p>
                    欢迎来到个人空间站<br></br>
                    这里将会持续记录一些，关于本人对于前端一些有趣经历。
                  </p> */}
                  <p>
                    哈哈哈哈哈<br></br>
                    啦啦啦啦啦啦啦，诶~啦啦啦啦
                  </p>
                  <div className="btn-box">
                    <a className="btn-1" onClick={() => go("/blog-list")}>
                      BLOG LIST
                    </a>
                    <a className="btn-2">VITAE</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
