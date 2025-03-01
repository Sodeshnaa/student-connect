import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react'; // Icon for user profiles

const Network = () => {
  const [filter, setFilter] = useState(""); // Filter state to switch between Alumni and Students
  const [networkData, setNetworkData] = useState({ alumni: [], students: [] });
  const [loading, setLoading] = useState(true);

  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchNetworkData = async () => {
      try {
        // const res = await fetch('http://localhost:8080/api/network');
        const res = await fetch('http://localhost:8080/api/network', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        console.log("res data is consoled here ---->>>" , data);
        setNetworkData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchNetworkData();
  }, []);

  const filteredData = filter
    ? networkData[filter]
    : [...networkData.alumni, ...networkData.students]; // Show both Alumni and Students when no filter is selected

  if (loading) {
    return <div className="text-center text-xl text-primary">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-primary">Network</h1>
        <div className="space-x-4">
          <button
            className={`py-2 px-4 rounded-lg ${!filter ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setFilter("")}
          >
            All
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${filter === "alumni" ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setFilter("alumni")}
          >
            Alumni
          </button>
          <button
            className={`py-2 px-4 rounded-lg ${filter === "students" ? 'bg-secondary text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setFilter("students")}
          >
            Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((person, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4 border border-gray-200 hover:shadow-lg">
            <div className="flex-shrink-0">
              {person.profilePhoto ? (
                <img
                  src={person.profilePhoto}
                  alt={person.fullName}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-blue-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{person.fullName}</h2>
              {person.fieldOfStudy && (
                <p className="text-gray-600">{person.fieldOfStudy}</p>
              )}
              <p className="text-sm text-gray-500">Graduation Year: {person.graduationYear}</p>
            
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm mt-2 inline-block"
                >
                  View LinkedIn
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Network;