import React from 'react'
import InputField from '../components/InputField'

const JobPostingData = ({handleChange}) => {
    const now = new Date();

    const twentyFourHoursAgoDate = (new Date(now - 24*60*60*1000)).toISOString().slice(0,10);
    const sevenDaysAgoDate = (new Date(now - 7*24*60*60*1000)).toISOString().slice(0,10);
    const oneMonthAgoDate = (new Date(now - 30*24*60*60*1000)).toISOString().slice(0,10);
   
    console.log(sevenDaysAgoDate);
    
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of posting</h4>

      <div>
        <InputField
          handleChange={handleChange}
          value=""
          title="All"
          name="test3"
        />
        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 hours"
          name="test3"
        />
        <InputField
          handleChange={handleChange}
          value={sevenDaysAgoDate}
          title="Last week"
          name="test3"
        />
        <InputField
          handleChange={handleChange}
          value={oneMonthAgoDate}
          title="Last month"
          name="test3"
        />
        
      </div>
    </div>
  )
}

export default JobPostingData