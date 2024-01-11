import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import hot_0 from "./images/hot-0.png";
import hot_1 from "./images/hot-1.png";
import hot_2 from "./images/hot-2.png";
import hot_3 from "./images/hot-3.png";

function Home() {
  const navigate = useNavigate();
  const go = (path) => {
    navigate(path);
  };
  const openNav = () => {
    document.getElementById("myNav").classList.toggle("menu_width");
    document
      .querySelector(".custom_menu-btn")
      .classList.toggle("menu_btn-style");
  };
  return (
    <div>
      {/* <div onClick={() => go("/home")}>首页</div>
      <div onClick={() => go("/blog-list")}>Blog list</div> */}
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg custom_nav-container">
              <a className="navbar-brand" href="index.html">
                <img src={logo} alt="" />
                <span>Goid</span>
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
                    <a href="">主页</a>
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
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide "
                  data-ride="carousel"
                >
                  <ol className="carousel-indicators">
                    {Array(4)
                      .fill("")
                      .map((_, index) => (
                        <li
                          data-target="#carouselExampleIndicators"
                          data-slide-to={index}
                          className={index === 0 ? "active" : ""}
                        >
                          0{index + 1}
                        </li>
                      ))}
                  </ol>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <div className="img-box b-1">
                        <img src={hot_0} alt="" />
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="img-box b-2">
                        <img src={hot_1} alt="" />
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="img-box b-3">
                        <img src={hot_2} alt="" />
                      </div>
                    </div>
                    <div className="carousel-item">
                      <div className="img-box b-4">
                        <img src={hot_3} alt="" />
                      </div>
                    </div>
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
