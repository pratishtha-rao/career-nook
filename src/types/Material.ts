export type MaterialType =
  | "Resume"
  | "Cover Letter"
  | "Portfolio"
  | "Other";


export type Material = {

  id:number;

  name:string;

  type:MaterialType;

  description?:string;

  link?:string;

  createdAt:string;

  userId:string;

};



export type CreateMaterial = {

  name:string;

  type:MaterialType;

  description?:string;

  link?:string;

};