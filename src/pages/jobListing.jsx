import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { State } from "country-state-city";
import { BarLoader } from "react-spinners";

import useFetch from "@/hooks/use-fetch";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [token, setToken] = useState(null);

  const { isLoaded } = useUser();
  const { getToken } = useAuth();

  const {
    data: companies,
    fn: fnCompanies,
  } = useFetch(getCompanies);

  const {
    loading: loadingJobs,
    data: jobs,
    fn: fnJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
    __token: token, // Make sure this matches the first param in getJobs
  });

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const userToken = await getToken();
        setToken(userToken);
      } catch (err) {
        console.error("Error fetching Clerk token:", err);
      }
    };

    if (isLoaded) {
      fetchUserToken();
      fnCompanies();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && token) {
      console.log("🔁 Fetching jobs with:", {
        location,
        company_id,
        searchQuery,
        token,
      });
      fnJobs();
    }
  }, [isLoaded, token, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get("search-query");
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="w-full px-4 sm:px-8 py-8">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <form
        onSubmit={handleSearch}
        className="h-14 flex flex-row w-full gap-2 items-center mb-4"
      >
        <Input
          type="text"
          placeholder="Search Jobs by Title..."
          name="search-query"
          className="h-full flex-1 px-4 text-md"
        />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => (
                <SelectItem key={id} value={String(id)}>
                  {name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button className="sm:w-1/2" variant="destructive" onClick={clearFilters}>
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job?.saved?.length > 0}
              />
            ))
          ) : (
            <div className="text-white text-lg mt-6">
              No jobs found 😢<br />
              Try changing filters or posting a new job.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
