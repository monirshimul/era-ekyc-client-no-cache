import React from 'react';

import { FaUser, FaIndent, FaAddressCard, FaTools, FaBookReader, FaAddressBook, FaMicrochip, FaUserCircle } from "react-icons/fa";

//import Portfolio from './Dashboard/NestedComponentDemo/Portfolio';
//import Blogs from './Dashboard/NestedComponentDemo/Blogs';
//import Contact from './Dashboard/NestedComponentDemo/Contact';

import Account from './E-KYC/Simplified/Account';
import AccountSimp from './E-KYC/Simplified/SimFace/AccountSimp';
import AccountReg from './E-KYC/Regular/AccountReg';

import RoleCreate from './E-KYC/Role/CreateRole';
import RoleApprove from './E-KYC/Role/ApproveRole';
import RoleList from './E-KYC/Role/RoleList';
import UpdateRole from './E-KYC/Role/UpdateRole'
import Target from './Dashboard/NestedComponentDemo/Target';
import Vission from './Dashboard/NestedComponentDemo/Vission';
import Achievement from './Dashboard/NestedComponentDemo/Achievement';


import UnderDev from './UnderDev/UnderDev';



//User Management
import CreateUser from './E-KYC/User/CreateUser';
import UserList from './E-KYC/User/UserList';
import UserApproval from './E-KYC/User/UserApproval';
import UpdateUser from './E-KYC/User/UpdateUser';
// Product
import CreateProduct from './E-KYC/Product/CreateProduct';
import GetProduct from './E-KYC/Product/GetProduct';
import UpdateProduct from './E-KYC/Product/UpdateProduct';

//Profile Management
import ChangePassword from './E-KYC/Profile/ChangePass';
import GetProfile from './E-KYC/Profile/GetProfile';

//Ekyc List and Search
import EkycListSearch from './E-KYC/ekyc-list/EkycListSearch'
import EkycListUser from './E-KYC/ekyc-list/EkycListUser'

// Transaction Profile
import CreateTP from './E-KYC/TP/CreateTP';
import TPList from './E-KYC/TP/TPList';
import UpdateTP from './E-KYC/TP/UpdateTP';

// RiskGrading
//import RiskGrading from './E-KYC/Regular/RiskGrading';

// convert sim to reg Upgrade
import SimUpgradeReg from './E-KYC/Upgrade-ekyc/SimUpgradeReg';

// //EKYC Simplified
// import FaceOrFinger from './E-KYC/Simplified/FaceOrFinger'

import PendingAccount from './E-KYC/Account/PendingAccount';
import AccessLog from './E-KYC/AccessLog/AccessLog'

// Statistics
import AllStatistics from './E-KYC/Statistics/AllStatistics'


const cloneDeep = require('lodash.clonedeep');

























export const allRoutes = [
    {
        items: {
            "key": "1",
            'isShowing': true,
            "featureName": "Role",
            "className": <FaIndent />,
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
            "className": <FaUser />,
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
            "className": <FaAddressCard />,
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
            "className": <FaTools />,
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "4.1",
                    'isShowing': true,
                    "featureName": "App Setting",
                    "path": "/app-setting",
                    "exact": true,
                    "component": <UnderDev />
                }

            },
            {
                items: {
                    "key": "4.2",
                    'isShowing': true,
                    "featureName": "TP Setting",
                    "path": "",
                    "exact": true,
                    "component": ""
                },
                nested: [
                    {
                        items: {
                            "key": "4.2.1",
                            'isShowing': true,
                            "featureName": "Create TP",
                            "path": "/create-tp",
                            "exact": true,
                            "component": <CreateTP />
                        }

                    },
                    {
                        items: {
                            "key": "4.2.2",
                            'isShowing': true,
                            "featureName": "List TP",
                            "path": "/list-tp",
                            "exact": true,
                            "component": <TPList />
                        }

                    },
                    {
                        items: {
                            "key": "4.2.3",
                            'isShowing': false,
                            "featureName": "Update TP",
                            "path": "/update-tp",
                            "exact": true,
                            "component": <UpdateTP />
                        }

                    },


                    {
                        items: {
                            "key": "4.2.4",
                            'isShowing': false,
                            "featureName": "Delete TP",
                            "path": "/delete-tp",
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
            "className": <FaBookReader />,
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "*",
                    'isShowing': true,
                    "featureName": "Create e-KYC",
                    "path": "/create-ekyc",
                    "exact": true,
                    "component": <Account />
                }
            },

            {

                items: {
                    "key": "5.1",
                    'isShowing': true,
                    "featureName": "Simplified",
                    "path": "",
                    "exact": true,
                    "component": ""
                },
                nested: [
                    {
                        items: {
                            "key": "5.1.1",
                            'isShowing': true,
                            "featureName": "Create",
                            "path": "/simplified-create",
                            "exact": true,
                            "component": <AccountSimp />
                        }

                    },
                    {
                        items: {
                            "key": "5.1.2",
                            'isShowing': true,
                            "featureName": "Review",
                            "path": "/simplified-review",
                            "exact": true,
                            "component": <UnderDev />
                        }

                    },
                    {
                        items: {
                            "key": "5.1.3",
                            'isShowing': true,
                            "featureName": "Upgrade",
                            "path": "/simplified-upgrade",
                            "exact": true,
                            "component": <SimUpgradeReg />
                        }

                    },

                ]

            },
            {
                items: {
                    "key": "5.2",
                    'isShowing': true,
                    "featureName": "Regular",
                    "path": "",
                    "exact": true,
                    "component": ""
                },
                nested: [
                    {
                        items: {
                            "key": "5.2.1",
                            'isShowing': true,
                            "featureName": "Create",
                            "path": "/regular-create",
                            "exact": true,
                            "component": <AccountReg />
                        }

                    },
                    {
                        items: {
                            "key": "5.2.2",
                            'isShowing': true,
                            "featureName": "Review",
                            "path": "/regular-review",
                            "exact": true,
                            "component": <UnderDev />
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
            "className": <FaAddressBook />,
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "6.1",
                    'isShowing': true,
                    "featureName": "Statistics",
                    "path": "/statistics",
                    "exact": true,
                    "component": <AllStatistics />
                }

            },
            {
                items: {
                    "key": "6.2",
                    'isShowing': true,
                    "featureName": "Access Log",
                    "path": "/reposrt-access-log",
                    "exact": true,
                    "component": <AccessLog />
                }
            },
            {
                items: {
                    "key": "6.3",
                    'isShowing': true,
                    "featureName": "Activity Log",
                    "path": "/reposrt-activity-log",
                    "exact": true,
                    "component": <UnderDev />
                }
            }


        ]
    },


    {
        items: {
            "key": "7",
            'isShowing': true,
            "featureName": "Product",
            "className": <FaMicrochip />,
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "7.1",
                    'isShowing': true,
                    "featureName": "Create Product",
                    "path": "/create-product",
                    "exact": true,
                    "component": <CreateProduct />
                }
            },
            {
                items: {
                    "key": "7.2",
                    'isShowing': true,
                    "featureName": "Product List",
                    "path": "/product-list",
                    "exact": true,
                    "component": <GetProduct />
                }
            },
            {
                items: {
                    "key": "7.3",
                    'isShowing': false,
                    "featureName": "Product Update",
                    "path": "/product-update",
                    "exact": true,
                    "component": <UpdateProduct />
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
    },


    {
        items: {
            "key": "8",
            'isShowing': true,
            "featureName": "Account",
            "className": <FaUserCircle />,
            "path": "",
            "exact": true,
            "component": ""
        },
        nested: [
            {
                items: {
                    "key": "8.1",
                    'isShowing': true,
                    "featureName": "Account List",
                    "path": "/account-list",
                    "exact": true,
                    "component": <PendingAccount />
                }
            },
            {
                items: {
                    "key": "8.2",
                    'isShowing': false,
                    "featureName": "Reopen",
                    "path": "/account-reopen",
                    "exact": true,
                    "component": <UnderDev />
                }
            },
            {
                items: {
                    "key": "8.3",
                    'isShowing': false,
                    "featureName": "Discard",
                    "path": "/account-discard",
                    "exact": true,
                    "component": <UnderDev />
                }
            },

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
                if (featureArray.indexOf(objArr[i].items.key) === -1 && objArr[i].items.key !== "*") {
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




