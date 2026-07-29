export type MaterialType =
  | "Resume"
  | "Cover Letter"
  | "Portfolio"
  | "Other";


export type Material = {
  id: number;
  name: string;
  type: MaterialType;
  description: string | null;
  link: string | null;
  createdAt: Date;     
  userId: string;
  archived: boolean;
};


export type CreateMaterial = {

  name:string;

  type:MaterialType;

  description?:string;

  link?:string;

};