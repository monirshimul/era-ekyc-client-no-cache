import { hostIp } from './IpAdd';

//User Management
export const getRoleWithFilter = hostIp + `role/get/`;
export const createUserWithRole = hostIp + `user`;
export const getUserWithStatus = hostIp + `user/get/`;
export const userApprovalAPI = hostIp + `user/status`;
export const getAllUser = hostIp + `user/get/`;
export const searchUser = hostIp + `user/get/`;
export const getupdateUser = hostIp + `user/get/`;
export const userUpdate = hostIp + `user/`;
export const userDeleteAPI = hostIp + `user/status`;
//Login
export const loginAPI = hostIp + `user/login`;

//2FA Login
export const twoFALogin = hostIp + `user/2fa`;

//Profile Management
export const changePassword = hostIp + `profile/change-password`;
export const getProfile = hostIp + `profile/`;
export const imageUpdate = hostIp + `profile/picture`;
export const dataUpdate = hostIp + `profile/`;

// face Verification

export const faceValidate = hostIp + `ai/face-verification`;

// Finger Verification

export const fingerValidate = hostIp + `integration/fingerprint-verification`;


// Check userId,email, mobile no
export const checkUserId = hostIp + `user/check`
export const checkUserMobile = hostIp + `user/check`
export const checkUserEmail = hostIp + `user/check`

//Logout
export const logoutUser = hostIp + `user/logout`;

// confirm Api Simplied Single
export const confirmApi = hostIp +`ekyc/simplified`;

//e-kyc api
export const ekycWithFilter = hostIp +`ekyc/get/`;
export const ekycFullProfile = hostIp +`ekyc/full/get`;
export const ekycForUser = hostIp +`ekyc/user/get/`;
//API for JOINT Account
export const simplifiedJointAPI = hostIp + `ekyc/simplified/joint`;
export const simplifiedJointAddAPI = hostIp + `ekyc/simplified/joint/add`;
export const simplifiedJointConfirmAPI = hostIp + `ekyc/simplified/joint/confirm`;

// product Api 
export const createProduct = hostIp +`product`;
