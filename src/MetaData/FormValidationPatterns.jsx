// For Register account 
export const fullNamePattern1 = "^[a-zA-Z]{3,20}$";
export const fullNamePattern1ErrMsg = "Full name should only have 3-20 letters";

export const emailPatternErrMsg = "Email should be valid";

export const passwordPattern1 = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{12,20}";
export const passwordPatternErrMsg = "Password should have atleast 1 special character, 1 number and letters within 12-20 only";

export const confirmPasswordErrMsg = "Password don't match";

export const invalidPattern = "Invalid value";

//For creating projects
export const projectName1 = "^[a-zA-Z0-9]{6,40}$";
export const projectName1ErrMsg = "Project name should only have 6-40 letters or numbers";

export const departmentName1 = "^[a-zA-Z0-9]{4,15}$";
export const departmentName1ErrMsg = "Department name should only have 4-15 letters only";

export const projectDescription1 = "^[a-zA-Z0-9]{10,100}$";
export const projectDescription1ErrMsg = "Project description should only have 10-100 letters only";

//for creating tasks

