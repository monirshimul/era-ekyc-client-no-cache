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


// Check userId,email, mobile no
export const checkUserId = hostIp + `user/check`
export const checkUserMobile = hostIp + `user/check`
export const checkUserEmail = hostIp + `user/check`

//Logout
export const logoutUser = hostIp + `user/logout`;
