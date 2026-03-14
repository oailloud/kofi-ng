export type Coffee = {
  id: string;
  name: string;
  description: string;
  origin: string;
  price: number;
  roaster?: string;
  process?: string;
  tastingNotes?: string[];
  imageUrl?: string;
  roastLevel?: string;
  isDecaf?: boolean;
};