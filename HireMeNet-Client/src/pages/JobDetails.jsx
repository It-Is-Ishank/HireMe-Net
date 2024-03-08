import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PageHeader from "../components/PageHeader";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faLocation,
  faSackDollar,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const reduxData = useSelector((state) => state.user);
  console.log(reduxData);

  useEffect(() => {
    fetch(`/api/employee/job/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  const handleApply = async () => {
    const userRole = reduxData.data.user.role;
    if (userRole === "employee") {
      const { value: url } = await Swal.fire({
        input: "url",
        inputLabel: "Resume Link",
        inputPlaceholder: "Enter the Link to your Resume",
      });

      if (url) {
        const userId = reduxData.data.user._id;

        try {
          // Send the user's application data to the backend
          const response = await fetch(`/api/employee/apply/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              resumeUrl: url,
            }),
          });

          const responseData = await response.json();
          console.log("Response Data from Backend:", responseData);

          if (response.ok) {
            if (responseData.message.includes("successfully")) {
              // Application added successfully
              Swal.fire({
                icon: "success", // FontAwesome class for success (check-circle)
                title: "Applied Successfully",
                text: `You have applied for the job. Resume URL: ${url}`,
              });
            } else {
              // Handle other scenarios
              Swal.fire("Error applying for the job. Please try again later.");
            }
          } else {
            // Handle other error scenarios
            if (
              responseData.error &&
              responseData.error.includes("already applied")
            ) {
              // User has already applied for this job
              Swal.fire({
                icon: "warning",
                title: "Already Applied",
                text: "You have already applied for this job.",
              });
            } else {
              Swal.fire("Error applying for the job. Please try again later.");
            }
          }
        } catch (error) {
          console.error("Error in fetch operation:", error);
          Swal.fire("Error applying for the job. Please try again later.");
        }
      }
    } else {
      Swal.fire("Only employees can apply for jobs");
    }
  };

  /** @todo Add in hyperlinks to all categories like location/job type etc., to apply for jobs with that category.
   * Possibly linked to the main home page in some way? */
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-8">
      <PageHeader title="Job Details" path="job-data" />
      <div className="flex flex-row justify-between">
        <div className="flex items-center mb-6">
          <img
            src={job.companyLogo}
            alt={job.companyName}
            className="h-16 w-16 mr-4"
          />
          <div>
            <span className="text-2xl font-bold">
              {job.jobTitle}
              <span className="text-xl text-blue">@{job.companyName}</span>
            </span>
          </div>
        </div>
        <div className="my-6 flex flex-row justify-between">
          <h2 className="text-2xl font-bold"></h2>
          <div className="mx-4">
            <strong>
              <FontAwesomeIcon icon={faLocation} className="text-center" />
            </strong>{" "}
            {job.jobLocation}
          </div>
          <div className="mx-4">
            <strong>
              <FontAwesomeIcon icon={faUserDoctor} className="text-center" />
            </strong>{" "}
            {job.experienceLevel}
          </div>
          <div className="mx-4">
            <strong>
              <FontAwesomeIcon icon={faAddressCard} className="text-center" />
            </strong>{" "}
            {job.employmentType}
          </div>
          <div className="mx-4">
            <strong>
              <FontAwesomeIcon icon={faSackDollar} className="text-center" />
            </strong>{" "}
            ${job.minPrice} - ${job.maxPrice} {job.salaryType}
          </div>
          <div className="mx-4">
            <strong>
              <FontAwesomeIcon icon={faCalendar} className="text-center" />
            </strong>{" "}
            {moment(job.postingDate).format("YYYY-MM-DD")}
          </div>
        </div>
      </div>
      <button
        className="bg-blue px-8 py-3 text-white rounded"
        onClick={handleApply}
      >
        Apply Now
      </button>
      <div className="flex flex-row">
        <div className="my-6">
          <h2 className="text-2xl font-bold">Job Description</h2>
          <p className="text-lg">{job.description}</p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
