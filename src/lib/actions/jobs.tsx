"use server";
import { serverMutation } from "../core/server";
import { Job } from "@/components/jobs/jobsTypes";

export const createJob = async (newJobData: Partial<Job>): Promise<Job> => {
  return serverMutation<Job>("/api/jobs", newJobData);
};
