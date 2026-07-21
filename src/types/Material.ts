export type Material = {

id:number;

name:string;

type:string;

description?:string;

link?:string;

createdAt:string;

userId:string;

};



export type CreateMaterial = {

name:string;

type:string;

description?:string;

link?:string;

};