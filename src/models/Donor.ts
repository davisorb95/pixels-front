export class Donor {
  photo: string;
  fullName: string;
  url: string;
  contribute: number;
  currency?: string;
  created?: string;
}

export interface DonorResult {
  donors: Donor[];
  total: number;
}
