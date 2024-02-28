import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";

const UpdateJob = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user);

  const {
    _id,
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    postingDate,
    experienceLevel,
    companyLogo,
    employmentType,
    description,
    skills,
  } = useLoaderData();

  //console.log(skills);

  const [selectedOption, setSelectedOption] = useState(skills);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    data.loggedIn = user.user.id.toString();
    console.log(data);

    fetch(`http://localhost:8080/api/employer/update-job/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res); // Log the response
        return res.json();
      })
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert("job Updated Successfully");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "React", label: "React" },
    { value: "Java", label: "Java" },
    { value: "JavaScript", label: "JavaScript" },
    { value: "Redux", label: "Redux" },
    { value: "MongoDB", label: "MongoDB" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-[#fafafa] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input
                type="text"
                placeholder="Enter job title"
                defaultValue={jobTitle}
                {...register("jobTitle")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input
                type="text"
                defaultValue={companyName}
                placeholder="Ex: Microsoft"
                {...register("companyName")}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="number"
                defaultValue={minPrice}
                placeholder="Enter Min. salary (in thousands)"
                {...register("minPrice")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="number"
                defaultValue={maxPrice}
                placeholder="Enter Max. salary (in thousands)"
                {...register("maxPrice")}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select
                defaultValue={salaryType}
                {...register("salaryType", { required: true })}
                className="create-job-input"
              >
                <option value="">Choose type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                defaultValue={jobLocation}
                placeholder="Ex : Delhi"
                {...register("jobLocation")}
                className="create-job-input"
              />
            </div>
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                defaultValue={postingDate}
                placeholder="Ex: 2024-01-26"
                {...register("postingDate")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select
                defaultValue={experienceLevel}
                {...register("experienceLevel", { required: true })}
                className="create-job-input"
              >
                <option value="">Choose required type</option>
                <option value="Internship">Internship</option>
                <option value="Any Experience">Any Experience</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Required Skill Set</label>
            <CreatableSelect
              defaultValue={skills}
              onChange={setSelectedOption}
              options={selectedOption}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="URL"
                defaultValue={companyLogo}
                placeholder="Paste your company logo URL"
                {...register("companyLogo")}
                className="create-job-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select
                defaultValue={employmentType}
                {...register("employmentType", { required: true })}
                className="create-job-input"
              >
                <option value="">Choose required type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div className=" w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              defaultValue={description}
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Enter the job description here "
              {...register("description")}
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer "
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
