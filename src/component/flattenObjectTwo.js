import React from 'react';

import Portfolio from './Dashboard/NestedComponentDemo/Portfolio';
import Blogs from './Dashboard/NestedComponentDemo/Blogs';
import Contact from './Dashboard/NestedComponentDemo/Contact';
import Account from './E-KYC/Simplified/Account';


import RoleCreate from './E-KYC/Role/CreateRole';
import RoleApprove from './E-KYC/Role/ApproveRole';
import RoleList from './E-KYC/Role/RoleList';
import UpdateRole from './E-KYC/Role/UpdateRole'
import Target from './Dashboard/NestedComponentDemo/Target';
import Vission from './Dashboard/NestedComponentDemo/Vission';
import Achievement from './Dashboard/NestedComponentDemo/Achievement';

//User Management
import CreateUser from './E-KYC/User/CreateUser';
import UserList from './E-KYC/User/UserList';
import UserApproval from './E-KYC/User/UserApproval';
import UpdateUser from './E-KYC/User/UpdateUser';

//Profile Management
import ChangePassword from './E-KYC/Profile/ChangePass';
import GetProfile from './E-KYC/Profile/GetProfile';

//Ekyc List and Search
import EkycListSearch from './E-KYC/ekyc-list/EkycListSearch'
import EkycListUser from './E-KYC/ekyc-list/EkycListUser'


// //EKYC Simplified
// import FaceOrFinger from './E-KYC/Simplified/FaceOrFinger'

const cloneDeep = require('lodash.clonedeep');

























export const allRoutes = [
    {
        items: {
            "key": "1",
            'isShowing': true,
            "featureName": "Role",
            "className": "fas fa-home",
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "1.1",
                    'isShowing': true,
                    "featureName": "Create Role",
                    "path": "/role-create",
                    "exact": true,
                    "component": <RoleCreate />
                }


            },
            {
                items: {
                    "key": "1.2",
                    'isShowing': true,
                    "featureName": "Approve Role",
                    "path": "/role-approve",
                    "exact": true,
                    "component": <RoleApprove />
                }
            },
            {
                items: {
                    "key": "1.3",
                    'isShowing': false,
                    "featureName": "Update Role",
                    "path": "/update-role",
                    "exact": true,
                    "component": <UpdateRole />
                }
            },
            {
                items: {
                    "key": "1.4",
                    'isShowing': false,
                    "featureName": "Update Approve Role",
                    "path": "/role-update-approve",
                    "exact": true,
                    "component": ""
                }
            },
            {
                items: {
                    "key": "1.5",
                    'isShowing': true,
                    "featureName": "Role List",
                    "path": "/role-list",
                    "exact": true,
                    "component": <RoleList />
                }
            },
            {
                items: {
                    "key": "1.6",
                    'isShowing': false,
                    "featureName": "Delete Role",
                    "path": "/role-delete",
                    "exact": true,
                    "component": <Vission />
                }
            }

        ]
    },



    {
        items: {
            "key": "2",
            'isShowing': true,
            "featureName": "User",
            "className": "fas fa-user",
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "2.1",
                    'isShowing': true,
                    "featureName": "Create User",
                    "path": "/user-create",
                    "exact": true,
                    "component": <CreateUser />
                }

            },
            {
                items: {
                    "key": "2.2",
                    'isShowing': true,
                    "featureName": "Approve User",
                    "path": "/user-approve",
                    "exact": true,
                    "component": <UserApproval />
                }
            },
            {
                items: {
                    "key": "2.3",
                    'isShowing': false,
                    "featureName": "Update User",
                    "path": "/user-update",
                    "exact": true,
                    "component": <UpdateUser />
                }
            },
            {
                items: {
                    "key": "2.4",
                    'isShowing': false,
                    "featureName": "Update Approve User",
                    "path": "/user-update-approve",
                    "exact": true,
                    "component": <Achievement />
                }
            },
            {
                items: {
                    "key": "2.5",
                    'isShowing': true,
                    "featureName": "User List",
                    "path": "/user-list",
                    "exact": true,
                    "component": <UserList />
                }
            },
            {
                items: {
                    "key": "2.6",
                    'isShowing': false,
                    "featureName": "Delete User",
                    "path": "/user-delete",
                    "exact": true,
                    "component": <Vission />
                }
            }

        ]
    },



    {
        items: {
            "key": "3",
            'isShowing': true,
            "featureName": "Profile",
            "className": "fas fa-address-card",
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "3.1",
                    'isShowing': true,
                    "featureName": "Profile Data",
                    "path": "/profile-data",
                    "exact": true,
                    "component": <GetProfile />
                }

            },
            {
                items: {
                    "key": "3.2",
                    'isShowing': false,
                    "featureName": "Update",
                    "path": "/profile-update",
                    "exact": true,
                    "component": <Target />
                }

            },
            {
                items: {
                    "key": "3.3",
                    'isShowing': false,
                    "featureName": "Picture Update",
                    "path": "/profile-picture-update",
                    "exact": true,
                    "component": <Vission />
                }
            },
            {
                items: {
                    "key": "3.4",
                    'isShowing': true,
                    "featureName": "Password Change",
                    "path": "/password-change",
                    "exact": true,
                    "component": <ChangePassword />
                }
            }
        ]
    },
    {
        items: {
            "key": "4",
            'isShowing': true,
            "featureName": "Setting",
            "className": "fas fa-project-diagram",
            "path": "/portfolio",
            "exact": true,
            "component": <Portfolio />
        },
        nested: [
            {
                items: {
                    "key": "4.1",
                    'isShowing': true,
                    "featureName": "App Setting",
                    "path": "/app-setting",
                    "exact": true,
                    "component": <Target />
                }

            },
            {
                items: {
                    "key": "4.2",
                    'isShowing': true,
                    "featureName": "TP Setting",
                    "path": "/tp-setting",
                    "exact": true,
                    "component": <Target />
                },
                nested: [
                    {
                        items: {
                            "key": "4.2.1",
                            'isShowing': true,
                            "featureName": "Create TP",
                            "path": "/create-tp",
                            "exact": true,
                            "component": <Target />
                        }

                    },
                    {
                        items: {
                            "key": "4.2.2",
                            'isShowing': true,
                            "featureName": "List TP",
                            "path": "/list-tp",
                            "exact": true,
                            "component": <Vission />
                        }

                    }
                    

                ]

            }


        ]
    },


    {
        items: {
            "key": "5",
            'isShowing': true,
            "featureName": "E-KYC",
            "className": "fas fa-blog",
            "path": "/blogs",
            "exact": true,
            "component": <Blogs />
        },
        nested: [
            {
                items: {
                    "key": "5.1",
                    'isShowing': true,
                    "featureName": "Simplified",
                    "path": "/e-kyc-simplified",
                    "exact": true,
                    "component": <Target />
                },
                nested: [
                    {
                        items: {
                            "key": "5.1.1",
                            'isShowing': true,
                            "featureName": "Create",
                            "path": "/simplified-create",
                            "exact": true,
                            "component": <Account />
                        }

                    },
                    {
                        items: {
                            "key": "5.1.2",
                            'isShowing': true,
                            "featureName": "Review",
                            "path": "/simplified-review",
                            "exact": true,
                            "component": <Vission />
                        }

                    },
                    {
                        items: {
                            "key": "5.1.3",
                            'isShowing': true,
                            "featureName": "Upgrade",
                            "path": "/simplified-upgrade",
                            "exact": true,
                            "component": <Target />
                        }

                    },

                ]

            },
            {
                items: {
                    "key": "5.2",
                    'isShowing': true,
                    "featureName": "Regular",
                    "path": "/e-kyc-regular",
                    "exact": true,
                    "component": <Target />
                },
                nested: [
                    {
                        items: {
                            "key": "5.2.1",
                            'isShowing': true,
                            "featureName": "Create",
                            "path": "/regular-create",
                            "exact": true,
                            "component": <Target />
                        }

                    },
                    {
                        items: {
                            "key": "5.2.2",
                            'isShowing': true,
                            "featureName": "Review",
                            "path": "/regular-review",
                            "exact": true,
                            "component": <Target />
                        }

                    }


                ]

            },
            {
                items: {
                    "key": '5.3',
                    'isShowing': true,
                    "featureName": "List & Search",
                    "path": "/e-kyc-list-&-search",
                    "exact": true,
                    "component": <EkycListSearch />
                },

            },
            {
                items: {
                    "key": "5.4",
                    'isShowing': true,
                    "featureName": "List For User",
                    "path": "/e-kyc-list-for-user",
                    "exact": true,
                    "component": <EkycListUser />
                },

            }

        ]
    },


    {
        items: {
            "key": "6",
            'isShowing': true,
            "featureName": "Report",
            "className": "fas fa-address-book",
            "path": "/contact",
            "exact": true,
            "component": <Contact />
        },
        nested: [
            {
                items: {
                    "key": "6.1",
                    'isShowing': true,
                    "featureName": "Statistics",
                    "path": "/report-statistics",
                    "exact": true,
                    "component": <Target />
                }

            },
            {
                items: {
                    "key": "6.2",
                    'isShowing': true,
                    "featureName": "Access Log",
                    "path": "/reposrt-access-log",
                    "exact": true,
                    "component": <Vission />
                }
            },
            {
                items: {
                    "key": "6.3",
                    'isShowing': true,
                    "featureName": "Activity Log",
                    "path": "/reposrt-activity-log",
                    "exact": true,
                    "component": <Vission />
                }
            }


        ]
    },
    {
        items: {
            "key": "7",
            'isShowing': true,
            "featureName": "Product",
            "className": "fas fa-blog",
            "path": "/blogs",
            "exact": true,
            "component": <Blogs />
        },
        nested: [
            {
                items: {
                    "key": "7.1",
                    'isShowing': true,
                    "featureName": "Create Product",
                    "path": "/create-product",
                    "exact": true,
                    "component": <Target />
                }
            },
            {
                items: {
                    "key": "7.2",
                    'isShowing': true,
                    "featureName": "Product List",
                    "path": "/product-list",
                    "exact": true,
                    "component": <Target />
                }
            },
            {
                items: {
                    "key": "7.3",
                    'isShowing': false,
                    "featureName": "Product Update",
                    "path": "/product-update",
                    "exact": true,
                    "component": <Target />
                }
            },
            {
                items: {
                    "key": "7.4",
                    'isShowing': false,
                    "featureName": "Product Delete",
                    "path": "/product-delete",
                    "exact": true,
                    "component": <Target />
                }
               

            }
        ]
    }






];







/**
 * Recursive functions for navigator and authorization
 */

export function getFlatRouteArray(routes) {
    let flattenRoutes = [];
    function recursiveFlat(objArr) {
        for (let i = 0; i < objArr.length; i++) {
            if (objArr[i] === undefined) continue;
            flattenRoutes.push(objArr[i].items);
            if ("nested" in objArr[i]) {
                recursiveFlat(objArr[i].nested);
            }
        }
        return;
    }
    recursiveFlat(routes);
    return flattenRoutes;
}


//
export function pruneRouteArray(featureArray) {

    let pruneRoutes = cloneDeep(allRoutes);
    
    function recursivePrune(objArr) {
        //console.log("Obj Array", objArr)
        for (let i = 0; i < objArr.length; i++) {
            if ('nested' in objArr[i]) {
                recursivePrune(objArr[i].nested);
                if (objArr[i].nested.every(i => i === undefined)) {
                    objArr[i] = undefined;
                }
            }
            else {
                if (featureArray.indexOf(objArr[i].items.key) === -1) {
                    objArr[i] = undefined;
                }
            }
        }
        return;
    }
    recursivePrune(pruneRoutes);
    return pruneRoutes;
}

// console.log(getFlatRouteArray(allRoutes))
// console.dir(pruneRoutes, {depth: null});

// const pr = pruneRouteArray(['Target', 'Vission', 'Goal']);
// console.dir(pr, { depth: null });
// flatArr = getFlatRouteArray(pr);
// console.log(flatArr);




