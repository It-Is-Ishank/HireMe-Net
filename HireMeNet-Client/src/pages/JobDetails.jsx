import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../components/PageHeader';
import moment from 'moment';

const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState([])

    useEffect(()=>{
        fetch(`http://localhost:8080/api/employee/job/${id}`).then( res => res.json()).then(data => setJob(data))
    },[])

    const handleApply = async() => {
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "Resume Link",
            inputPlaceholder: "Enter the Link to your Resume"
          });
          if (url) {
            Swal.fire(`Entered URL: ${url}`);
          }
    }
    return (
        <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-8">
            <PageHeader title="Job Details" path="job-data" />
            <div className="flex items-center mb-6">
                <img src={job.companyLogo} alt={job.companyName} className="h-16 w-16 mr-4" />
                <div>
                    <h1 className="text-4xl font-bold">{job.jobTitle}</h1>
                    <p className="text-xl text-gray-500">{job.companyName}</p>
                </div>
            </div>
            <div className="my-6">
                <h2 className="text-2xl font-bold">Job Description</h2>
                <p className="text-lg">{job.description}</p>
            </div>
            <div className="my-6">
                <h2 className="text-2xl font-bold">Job Details</h2>
                <p>
                    <strong>Location:</strong> {job.jobLocation}
                </p>
                <p>
                    <strong>Experience Level:</strong> {job.experienceLevel}
                </p>
                <p>
                    <strong>Employment Type:</strong> {job.employmentType}
                </p>
                <p>
                    <strong>Salary Range:</strong> ${job.minPrice} - ${job.maxPrice} {job.salaryType}
                </p>
                <p>
                    <strong>Posting Date:</strong> {moment(job.postingDate).format('YYYY-MM-DD')}
                </p>
            </div>
            <button className="bg-blue px-8 py-3 text-white rounded" onClick={handleApply}>
                Apply Now
            </button>
        </div>
    );
};

export default JobDetails