import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import PageHeader from '../components/PageHeader';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faLocation, faSackDollar, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState([])

    useEffect(()=>{
        fetch(`/api/employee/job/${id}`).then( res => res.json()).then(data => setJob(data))
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
            <div className="flex flex-row justify-between">
                <div className="flex items-center mb-6">
                    <img src={job.companyLogo} alt={job.companyName} className="h-16 w-16 mr-4" />
                    <div>
                        <h1 className="text-4xl font-bold">{job.jobTitle}</h1>
                        <p className="text-xl text-gray-500">{job.companyName}</p>
                    </div>
                </div>
                <div className="my-6 flex flex-row justify-between">
                    <h2 className="text-2xl font-bold"></h2>
                        <div className='mx-4'><strong><FontAwesomeIcon icon={faLocation} className='text-center' /></strong> {job.jobLocation}</div>
                        <div className='mx-4'><strong><FontAwesomeIcon icon={faUserDoctor} className='text-center' /></strong> {job.experienceLevel}</div>
                        <div className='mx-4'><strong><FontAwesomeIcon icon={faAddressCard} className='text-center' /></strong> {job.employmentType}</div>
                        <div className='mx-4'><strong><FontAwesomeIcon icon={faSackDollar} className='text-center' /></strong> ${job.minPrice} - ${job.maxPrice} {job.salaryType}</div>
                        <div className='mx-4'><strong><FontAwesomeIcon icon={faCalendar} className='text-center' /></strong> {moment(job.postingDate).format('YYYY-MM-DD')}</div>
                </div>
            </div>
            <button className="bg-blue px-8 py-3 text-white rounded" onClick={handleApply}>
                Apply Now
            </button>
            <div className="flex flex-row">
                <div className="my-6">
                    <h2 className="text-2xl font-bold">Job Description</h2>
                    <p className="text-lg w-[600px]">
                        { job.description }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default JobDetails