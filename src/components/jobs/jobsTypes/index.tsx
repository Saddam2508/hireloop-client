type JobId =
  | {
      $oid?: string;
    }
  | string;

export type Job = {
  _id: JobId;
  companyLogo?: string;
  companyName?: string;
  jobTitle: string;
  deadline: string;
  responsibilities?: string;
  jobCategory?: JobCategory;
  location?: string;
  isRemote?: boolean;
  jobType?: string;
  minSalary?: string | number;
  maxSalary?: string | number;
  requirements?: string;
  benefits?: string;
};

export type ButtonVariant =
  | "danger"
  | "danger-soft"
  | "ghost"
  | "outline"
  | "primary"
  | "secondary"
  | "tertiary";

export type JobType = "all" | "full-time" | "part-time" | "contract";
export type JobCategory = "all" | "engineering" | "design" | "product" | string;

export type Props = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedType: JobType;
  setSelectedType: (key: JobType) => void;
  selectedCategory: JobCategory;
  setSelectedCategory: (key: JobCategory) => void;
  isRemoteOnly: boolean;
  setIsRemoteOnly: (value: boolean) => void;
};
