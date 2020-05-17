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

//Profile Management
export const changePassword = hostIp + `profile/change-password`;
export const getProfile = hostIp + `profile/`;
export const imageUpdate = hostIp + `profile/picture`;
export const dataUpdate = hostIp + `profile/`;
