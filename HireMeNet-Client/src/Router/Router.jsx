import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import PostJob from "../pages/PostJob";
import MyJobs from "../pages/MyJobs";
import EstSal from "../pages/EstSal";
import UpdateJob from "../pages/UpdateJob";
import Login from "../components/Login";
import JobDetails from "../pages/JobDetails";
import Signup from "../components/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
        {
          path : "/",
          element : <Home/>
        },
        {
          path : "/post-job",
          element : <PostJob/>
        },
        {
          path : "/about",
          element : <About/>
        },
        {
          path : "/my-job",
          element : <MyJobs/>
        },
        {
          path : "/salary",
          element : <EstSal/>
        },
        {
          path : "/edit-job/:id",
          element : <UpdateJob/>,
          loader: ({params}) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
        },
        {
          path : "/job/:id",
          element : <JobDetails/>
        }
    ]
  },
  {
    path: "/login",
    element : <Login/>
  },
  {
    path : "/sign-up",
    element : <Signup/>
  }
]);

export default router;
