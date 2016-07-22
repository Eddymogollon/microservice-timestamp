var fs = require("fs");

var regex = /^[0-9]+$/;

function isTimestamp(time) {
  return /^[0-9]+$/.test(time);
}

function viewJSON(unix, natural) {
  var jsonContent = fs.readFileSync('./time.json', {
    encoding: "utf8"
  });

  jsonContent = jsonContent.replace("{{unix}}", unix);

  if (natural == null) {
    jsonContent = jsonContent.replace('"{{natural}}"', natural);
  }
  else {
    jsonContent = jsonContent.replace("{{natural}}", natural);
  }
  return jsonContent;
}


function fixMonth(month) {
  switch (month) {
    case "0":
      month = "January";
      break;
    case "1":
      month = "February";
      break;
    case "2":
      month = "March";
      break;
    case "3":
      month = "April";
      break;
    case "4":
      month = "May";
      break;
    case "5":
      month = "June";
      break;
    case "6":
      month = "July";
      break;
    case "7":
      month = "August";
      break;
    case "8":
      month = "September";
      break;
    case "9":
      month = "October";
      break;
    case "10":
      month = "November";
      break;
    case "11":
      month = "December";
      break;
    default:
      month = "Error";
      break;
  }

  return month;
}

function getDate(xDate) {
  var date = {
    day: xDate.getDate().toString(),
    month: xDate.getMonth().toString(),
    year: xDate.getFullYear().toString(),
    unixTime: Math.floor(xDate.getTime() / 1000),
    fullDate: ""
  }

  date.month = fixMonth(date.month);
  date.fullDate = date.month + " " + date.day + ", " + date.year;

  return date;
}

module.exports.isTimestamp = isTimestamp;
module.exports.fixMonth = fixMonth;
module.exports.viewJSON = viewJSON;
module.exports.getDate = getDate;