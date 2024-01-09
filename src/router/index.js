import Blog from "../pages/Blog/Blog";
import BlogList from "../pages/BlogList/BlogList";
import Home from "../pages/Home/Home";
import BlogEdit from "../pages/BlogEdit/BlogEdit";

const config = [
  {
    path: "/",
    element: <Home />,
  },
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "blog-list",
    path: "/blog-list",
    element: <BlogList />,
  },
  {
    name: "blog",
    path: "/blog",
    element: <Blog />,
  },
  {
    name: "blog-edit",
    path: "/blog-edit",
    element: <BlogEdit />,
  },
];

export default config;
