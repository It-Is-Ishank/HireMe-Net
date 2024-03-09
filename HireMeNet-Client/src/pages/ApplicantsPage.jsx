import React, { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import moment from "moment";

const ApplicantsPage = () => {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const { jobTitle } = useLoaderData();

  useEffect(() => {
    console.log("jobId:", jobId);
    fetch(`/api/employer/applicants/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        setApplicants(data);
      })
      .catch((error) => {
        console.error("Error fetching applicants:", error);
      });
  }, [jobId]);

  const getStatusColor = (status) => {
    console.log("Status:", status); // Add this line to log the status
    switch (status) {
      case "inProgress":
        return "bg-yellow-300";
      case "approved":
        return "bg-green-300";
      case "rejected":
        return "bg-red-300";
      default:
        console.log("Unhandled status:", status);
        return "bg-gray-300";
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-8">
      <h1 className="text-3xl font-bold mb-4">
        Applicants for Job : {jobTitle}
      </h1>
      {Array.isArray(applicants) && applicants.length > 0 ? (
        applicants.map((applicant) => (
          <div
            key={applicant.userId}
            className="mb-8 border p-4 rounded-md shadow-md"
          >
            <div className="flex items-center mb-4">
              <div>
                <span className="text-xl font-bold">{applicant.fullName}</span>
              </div>
            </div>
            <div className="mb-4 border p-2 rounded-md">
              <div className="flex items-center mb-2">
                <strong>Status:</strong>
                <span
                  style={{
                    backgroundColor: `${getStatusColor(applicant.status)}`,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "0.25rem",
                    marginLeft: "0.5rem",
                  }}
                >
                  {applicant.status}
                </span>
              </div>
              <div className="flex items-center">
                <strong>Applied On:</strong>{" "}
                {moment(applicant.applicationDate).format("YYYY-MM-DD")}
              </div>
            </div>
            <div className="mb-4">
              <strong>Resume URL:</strong>{" "}
              <a
                href={applicant.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {applicant.resumeUrl}
              </a>
            </div>
            {/* You can include more details here */}
          </div>
        ))
      ) : (
        <p>No applicants found for this job.</p>
      )}
    </div>
  );
};

export default ApplicantsPage;
