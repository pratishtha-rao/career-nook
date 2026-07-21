export function getAuthErrorMessage(error:string){

if(error.includes("Invalid login credentials")){

return "Email or password is incorrect.";

}


if(error.includes("Email not confirmed")){

return "Please confirm your email before logging in.";

}


if(error.includes("User already registered")){

return "An account already exists with this email.";

}


if(error.includes("Password should be at least")){

return "Password does not meet the minimum requirements.";

}


if(error.includes("Unable to validate email address")){

return "Please enter a valid email address.";

}


return "Something went wrong. Please try again.";

}