export interface Job {
  title: string;
  type: string;
  location: string;
  description: string;
  linkedinUrl: string;
}

// Add real job listings here when available.
// Each entry links to a LinkedIn job post.
export const jobs: Job[] = [];
