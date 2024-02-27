import React from "react";
import InputField from "../components/InputField";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>

      <div>
        <InputField
          handleChange={handleChange}
          value=""
          title="All"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="delhi"
          title="Delhi"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="bangalore"
          title="Bangalore"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="hyderabad"
          title="Hyderabad"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="noida"
          title="Noida"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
