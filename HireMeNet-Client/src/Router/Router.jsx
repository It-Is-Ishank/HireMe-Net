import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import PostJob from "../pages/PostJob";
import MyJobs from "../pages/MyJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
        {path : "/",element : <Home/>,},
        {path : "/post-job",element : <PostJob/>,},
        {path : "/about",element : <About/>,},
        {path : "/my-job",element : <MyJobs/>,}
    ]
  },
]);

export default router;
