let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function convertIso(data){
 let date = data.toString();
 let convertDate = new Date(date).toISOString();
 return convertDate; 
}

export function absDateFormat(data){
    let date = data.split("-");
    let year = date[0];
    let monthNumber = data[1];
    let day = data[2];
    let month = monthNames[monthNumber-1];
    return day+"-"+month+"-"+year;
}