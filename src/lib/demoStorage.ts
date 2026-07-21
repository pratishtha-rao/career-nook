export function getDemoData<T>(key:string):T[] {

if(typeof window === "undefined"){
return [];
}


const data = localStorage.getItem(key);


if(!data){
return [];
}


try{

return JSON.parse(data);

}catch{

return [];

}

}




export function saveDemoData<T>(
key:string,
data:T[]
){

if(typeof window === "undefined"){
return;
}


localStorage.setItem(
key,
JSON.stringify(data)
);

}