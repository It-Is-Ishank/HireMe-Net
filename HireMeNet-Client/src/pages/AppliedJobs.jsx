import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const reduxData = useSelector((state) => state.user);
  const id = reduxData?.data.user._id;

  useEffect(() => {
    fetch(`https://hireme-net.onrender.com/api/employee/applied-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAppliedJobs(data);
      });
  }, []);

  console.log(appliedJobs);

  const getStatusColor = (status) => {
    switch (status) {
      case "inProgress":
        return "bg-yellow-300";
      case "approved":
        return "bg-green-300";
      case "rejected":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-8">
      <h1 className="text-3xl font-bold mb-4">Applied Jobs</h1>
      {appliedJobs.map((job) => (
        <Link to={`/job/${job._id}`} key={job._id}>
        <div key={job._id} className="mb-8 border p-4 rounded-md shadow-md">
          <div className="flex items-center mb-4">
            <img
              src={job.companyLogo}
              alt={job.companyName}
              className="h-12 w-12 mr-4"
            />
            <div>
              <span className="text-xl font-bold">{job.jobTitle}</span>
              <span className="text-sm text-blue">@{job.companyName}</span>
            </div>
          </div>
          {job.applicants
            .filter((applicant) => applicant.userId === reduxData.data.user._id)
            .map((applicant) => (
              <div
                key={applicant.userId}
                className="mb-4 border p-2 rounded-md"
              >
                <div className="flex items-center mb-2">
                  <strong>Status:</strong>
                  <span
                    style={{
                      backgroundColor: getStatusColor(
                        applicant.applicationStatus
                      ),
                      padding: "0.2rem 0.5rem",
                      borderRadius: "0.25rem",
                      marginLeft: "0.5rem",
                    }}
                  >
                    {applicant.applicationStatus}
                  </span>
                </div>
                <div className="flex items-center">
                  <strong>Applied On:</strong>{" "}
                  {moment(applicant.applicationDate).format("YYYY-MM-DD")}
                </div>
              </div>
            ))}
        </div>
        </Link>
      ))}
    </div>
  );
};

export default AppliedJobs;
