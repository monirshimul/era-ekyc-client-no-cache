import {getProduct} from '../E-KYC/Url/ApiList';
import axios from 'axios';

export let ProductCodeGetName= async(code)=>{
    try{
    const config = {
        headers: {
            'x-auth-token': JSON.parse(sessionStorage.getItem('x-auth-token'))
        }
    };

    let apiCall = await axios.post(getProduct,"",config);
    let fillData = apiCall.data.data.filter(fill => fill.code === code);
    let ProductName=fillData[0].name;
    return ProductName;
    }catch(err){
        return null;
    }
}


export function JointOperatorType(data){
    let text;
    switch(data){
        case "M":
            text="Mandatory";
            break;
        case "O":
            text="Optional";
            break;
    }
    return text;
}




export function EkycProfileStatus(data){
    let text;
    switch(data){
        case "A":
            text="Active";
            break;
        case "P":
            text="Pending";
            break;
    }
    return text;
}
export function AccountVerificationStatus(data){
    let text;
    switch(data){
        case "V":
         text ="Verified";
         break;
     case "N":
         text= "Not Verified";
         break;
      case "P":
          text = "Pending";
          break;
    }
    return text;
}

export function ResourceStatus(data){
    let text;
    switch(data){
        case "A":
        text="Active";
        break;
      case "I":
        text="Inactive";
        break;
    }
    return text;
}

export function ProductCategoryType(data){
    let text;
    switch(data){
        case "S0":
            text="Savings Account";
            break;
          case "C0":
            text= "Current Account";
            break;
          case "TD":
            text ="Term Deposit";
            break;
          case "RD":
            text ="Recurring Deposit";
            break;
    }
    return text;
}

export function AccountType(data){
    let text;
    switch(data){
         case "S":
        text="Single";
        break;
      case "J":
        text="Joint";
        break;
    }
    return text;
}

  export function EkycType(data){
    let text;
    switch(data){
      case "S":
        text= "Simplified";
        break;
      case "R":
        text= "Regular";
        break;
    }
    return text;
  }

  export function RoleAndUserStatus(data){
      let text;
      switch(data){
          case "A":
              text = "Approved";
              break;
          case "R":
              text = "Rejected";
              break;
          case "P":
              text= "Pending";
              break;
          case "D":
              text="Archived";
              break;
      }
      return text;
  }
  

  export function GenderForm(data){
      let text;
      switch(data){
          case "M":
              text= "Male";
              break;
          case "F":
              text="Female";
              break;
      }
      return text;
  }