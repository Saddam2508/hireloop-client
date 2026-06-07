import { serverFetch } from "@/lib/core/server";
import { Job } from "@/components/jobs/jobsTypes";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async (): Promise<Job[]> => {
  return serverFetch("/api/jobs");
};

export const getJobById = async (jobId: string): Promise<Job> => {
  return serverFetch(`/api/jobs/${jobId}`);
};

export const getCompanyJobs = async (
  companyId: string,
  status: string = "active",
): Promise<Job[]> => {
  const res = await fetch(
    `${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`,
  );
  return res.json();
};
