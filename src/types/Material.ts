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

archived:boolean;

};