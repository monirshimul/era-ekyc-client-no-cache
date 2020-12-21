let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function convertIso(data) {
  let date = data.toString();
  let convertDate = new Date(date).toISOString();
  return convertDate;
}

export function absDateFormat(data) {
  let date = data.split("-");
  let year = date[0];
  let monthNumber = date[1];
  let day = date[2];
  let month = monthNames[monthNumber - 1];
  return day + "-" + month + "-" + year;
}



// ////////// data Picker ///////////

export function showDate(date) {
  try {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear().toString();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    // return [day, month, year].join('/');
    return [year, month, day].join('-');
  } catch (error) {
    return date;
  }
}

export function datePickerPrefiilConv(data) {
  let convDate = data.split("-");
  //console.log(convDate);
  let year = convDate[0];
  let month = convDate[1];
  let day = convDate[2];
  let value = [year, month, day].join(',');
  return new Date(value);
}


export function dayMonthYearFormat(data) {
  if (data) {
    let date = data.split("-");
    let year = date[0];
    let month = date[1];
    let day = date[2];

    return day + "-" + month + "-" + year;
  }
  return "";

}

export function DateFul(data) {
  let date = data.split("-");
  if (date[0].length === 4 && date[1].length === 2 && date[2].length === 2) {
    return true;
  } else {
    return false;
  }
}



//   for age check 
export function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}