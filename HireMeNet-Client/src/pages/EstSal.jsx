import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";

const EstSal = () => {
  const [searchText, setSearchText] = useState("");
  const [salary, setSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then((res) => res.json())
      .then((data) => {
        setSalary(data);
        setFilteredSalary(data);
      });
  }, [searchText]);


  const handleSearch = () => {
    const filter = salary.filter(
      (job) =>
        job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    console.log(filter);
    setFilteredSalary(filter);
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title="Estimated Salary" path="Salary" />

      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={handleSearch} className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4">
            Search
          </button>
        </div>
      </div>

      {/* Salary Cards */}

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {
            filteredSalary.map((data) => (
                <div key={data.id} className="shadow px-4 py-8">
                    <h4 className="font-semibold text-xl">{data.title}</h4>
                    <p className="my-2 font-medium text-blue text-lg">{data.salary}</p>
                    <div className="flex flex-warp gap-4">
                        <a href="/" className="underline">{data.status}</a>
                        <a href="/" className="underline">{data.skills}</a>
                    </div>
                    
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default EstSal;
