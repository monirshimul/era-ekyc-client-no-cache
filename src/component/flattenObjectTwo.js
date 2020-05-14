import React from 'react';
import Home from './Dashboard/NestedComponentDemo/Home';
import Profile from './Dashboard/NestedComponentDemo/Profile';
import About from './Dashboard/NestedComponentDemo/About';
import Portfolio from './Dashboard/NestedComponentDemo/Portfolio';
import Blogs from './Dashboard/NestedComponentDemo/Blogs';
import Contact from './Dashboard/NestedComponentDemo/Contact';
import Account from './E-KYC/Simplified/Account';
import Test from './E-KYC/Role/Test'

import RoleCreate from './E-KYC/Role/CreateRole';
import RoleApprove from './E-KYC/Role/ApproveRole';
import RoleUpdate from './E-KYC/Role/UpdateRole';
import Target from './Dashboard/NestedComponentDemo/Target';
import Vission from './Dashboard/NestedComponentDemo/Vission';
import Goal from './Dashboard/NestedComponentDemo/Goal';
import Achievement from './Dashboard/NestedComponentDemo/Achievement';

//User Management
import CreateUser from './E-KYC/User/CreateUser';
import UserList from './E-KYC/User/UserList';
import UserApproval from './E-KYC/User/UserApproval';
import UpdateUser from './E-KYC/User/UpdateUser';

//Profile Management
 import ChangePassword from './E-KYC/Profile/ChangePass';




const allRoutes = [
    {
        items: {
            "key": 1,
            "featureName": "Role",
            "className": "fas fa-home",
            "path": "/home",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": 1.1,
                    "featureName": "Create Role",
                    "path": "/role-create",
                    "exact": true,
                    "component": <RoleCreate />
                }


            },
            {
                items: {
                    "key": 1.2,
                    "featureName": "Approve Role",
                    "path": "/role-approve",
                    "exact": true,
                    "component": <RoleApprove />
                }
            },
            {
                items: {
                    "key": 1.3,
                    "featureName": "Update Role",
                    "path": "/role-update",
                    "exact": true,
                    "component": <RoleUpdate />
                }
            },
            {
                items: {
                    "key": 1.4,
                    "featureName": "Update Approve Role",
                    "path": "/role-update-approve",
                    "exact": true,
                    "component": <Vission />
                }
            },
            {
                items: {
                    "key": 1.5,
                    "featureName": "Role List",
                    "path": "/role-list",
                    "exact": true,
                    "component": <Vission />
                }
            },
            {
                items: {
                    "key": 1.6,
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
            "key": 2,
            "featureName": "User",
            "className": "fas fa-user",
            "path": "/profile",
            "exact": true,
            "component": <Profile />
        },
        nested: [
            {
                items: {
                    "key": 2.1,
                    "featureName": "Create User",
                    "path": "/user-create",
                    "exact": true,
                    "component": <CreateUser />
                }

            },
            {
                items: {
                    "key": 2.2,
                    "featureName": "Approve User",
                    "path": "/user-approve",
                    "exact": true,
                    "component": <UserApproval />
                }
            },
            {
                items: {
                    "key": 2.3,
                    "featureName": "Update User",
                    "path": "/user-update",
                    "exact": true,
                    "component": <UpdateUser />
                }
            },
            {
                items: {
                    "key": 2.4,
                    "featureName": "Update Approve User",
                    "path": "/user-update-approve",
                    "exact": true,
                    "component": <Achievement />
                }
            },
            {
                items: {
                    "key": 2.5,
                    "featureName": "User List",
                    "path": "/user-list",
                    "exact": true,
                    "component": <UserList />
                }
            },
            {
                items: {
                    "key": 2.6,
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
            "key": 3,
            "featureName": "Profile",
            "className": "fas fa-address-card",
            "path": "/about",
            "exact": true,
            "component": <About />
        },
        nested: [
            {
                items: {
                    "key": 3.1,
                    "featureName": "Update",
                    "path": "/profile-update",
                    "exact": true,
                    "component": <Target />
                }

            },
            {
                items: {
                    "key": 3.2,
                    "featureName": "Picture Update",
                    "path": "/profile-picture-update",
                    "exact": true,
                    "component": <Vission />
                }
            },
            {
                items: {
                    "key": 3.3,
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
            "key": 4,
            "featureName": "Setting",
            "className": "fas fa-project-diagram",
            "path": "/portfolio",
            "exact": true,
            "component": <Portfolio />
        },
        nested: [
            {
                items: {
                    "key": 4.1,
                    "featureName": "App Setting",
                    "path": "/app-setting",
                    "exact": true,
                    "component": <Target />
                }

            }


        ]
    },


    {
        items: {
            "key": 5,
            "featureName": "E-KYC",
            "className": "fas fa-blog",
            "path": "/blogs",
            "exact": true,
            "component": <Blogs />
        },
        nested: [
            {
                items: {
                    "key": 5.1,
                    "featureName": "Simplified",
                    "path": "/e-kyc-simplified",
                    "exact": true,
                    "component": <Target />
                },
                nested: [
                    {
                        items: {
                            "key": 5.11,
                            "featureName": "Create",
                            "path": "/simplified-create",
                            "exact": true,
                            "component": <Account />
                        }

                    },
                    {
                        items: {
                            "key": 5.12,
                            "featureName": "Review",
                            "path": "/simplified-review",
                            "exact": true,
                            "component": <Target />
                        }

                    },
                    {
                        items: {
                            "key": 5.13,
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
                    "key": 5.2,
                    "featureName": "Regular",
                    "path": "/e-kyc-regular",
                    "exact": true,
                    "component": <Target />
                },
                nested: [
                    {
                        items: {
                            "key": 5.21,
                            "featureName": "Create",
                            "path": "/regular-create",
                            "exact": true,
                            "component": <Target />
                        }

                    },
                    {
                        items: {
                            "key": 5.22,
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
                    "key": 5.3,
                    "featureName": "List & Search",
                    "path": "/e-kyc-list-&-search",
                    "exact": true,
                    "component": <Target />
                },

            },
            {
                items: {
                    "key": 5.4,
                    "featureName": "List For User",
                    "path": "/e-kyc-list-for-user",
                    "exact": true,
                    "component": <Target />
                },

            }

        ]
    },


    {
        items: {
            "key": 6,
            "featureName": "Report",
            "className": "fas fa-address-book",
            "path": "/contact",
            "exact": true,
            "component": <Contact />
        },
        nested: [
            {
                items: {
                    "key": 6.1,
                    "featureName": "Statistics",
                    "path": "/report-statistics",
                    "exact": true,
                    "component": <Target />
                }

            },
            {
                items: {
                    "key": 6.2,
                    "featureName": "Access Log",
                    "path": "/reposrt-access-log",
                    "exact": true,
                    "component": <Vission />
                }
            },
            {
                items: {
                    "key": 6.3,
                    "featureName": "Activity Log",
                    "path": "/reposrt-activity-log",
                    "exact": true,
                    "component": <Vission />
                }
            }


        ]
    },


    // {
    //     items: {
    //         "id": 7,
    //         "featureName": "Map",
    //         "className": "fas fa-map-pin",
    //         "path": "/map",
    //         "exact": true,
    //         "component": <Map />
    //     },
    //     nested: [
    //         {
    //             items: {
    //                 "featureName": "Target",
    //                 "path": "/target",
    //                 "exact": true,
    //                 "component": <Target />
    //             }

    //         },
    //         {
    //             items: {
    //                 "featureName": "Vission",
    //                 "path": "/vission",
    //                 "exact": true,
    //                 "component": <Vission />
    //             }
    //         },
    //         {
    //             items: {
    //                 "featureName": "Goal",
    //                 "path": "/goal",
    //                 "exact": true,
    //                 "component": <Goal />
    //             }
    //         },

    //     ]
    // },
];






//
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
    let pruneRoutes = Object.assign([], allRoutes);
    function recursivePrune(objArr) {
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




