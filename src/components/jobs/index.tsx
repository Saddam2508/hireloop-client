"use client";
import React, { useState, useMemo } from "react";
import JobCard from "@/components/jobs/jobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { Job } from "@/components/jobs/jobsTypes";
import { JobType, JobCategory } from "@/components/jobs/jobsTypes";

type Props = {
  initialJobs: Job[];
};

export default function JobListingContainer({ initialJobs }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<JobType>("all");
  const [selectedCategory, setSelectedCategory] = useState<JobCategory>("all");
  const [isRemoteOnly, setIsRemoteOnly] = useState<boolean>(false);

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job: Job) => {
      const matchesSearch =
        job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requirements?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "all" || job.jobType === selectedType;
      const matchesCategory =
        selectedCategory === "all" || job.jobCategory === selectedCategory;
      const matchesRemote = !isRemoteOnly || job.isRemote === true;

      return matchesSearch && matchesType && matchesCategory && matchesRemote;
    });
  }, [searchQuery, selectedType, selectedCategory, isRemoteOnly, initialJobs]);

  return (
    <>
      <JobFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isRemoteOnly={isRemoteOnly}
        setIsRemoteOnly={setIsRemoteOnly}
      />

      <div className="max-w-7xl mx-auto mb-6 text-sm text-zinc-500">
        Showing {filteredJobs.length} position{filteredJobs.length !== 1 && "s"}
      </div>

      {filteredJobs.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {filteredJobs.map((jobItem: Job) => (
            <JobCard
              key={
                typeof jobItem._id === "object" &&
                jobItem._id !== null &&
                "$oid" in jobItem._id
                  ? jobItem._id.$oid
                  : (jobItem._id as string)
              }
              job={jobItem}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-zinc-800 rounded-[32px] max-w-7xl mx-auto">
          <p className="text-zinc-500 text-lg">
            No positions match your search criteria.
          </p>
        </div>
      )}
    </>
  );
}
