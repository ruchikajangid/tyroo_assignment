//used to extract data programatically

function doGet(file)
{
  var e = "https://docs.google.com/spreadsheets/d/1GdAvC7NkbBLbPOCXy-7lPsM8SSmt8NtQwibOVIkQkOo/edit#gid=148478614";
  var file = SpreadsheetApp.openByUrl(e);
  var sheet = file.getSheetByName("Data1");
  return getUsers(sheet);
  
}

function getUsers(sheet){
  var resultant = new Array(25);
  var output = 0;

  var rows = sheet.getRange(2,1,sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
  
  var len = rows.length;
  
  
  
  for(var i=0; i<25; i++)
  {
    
    var countArr = new Array(32);
    if(i==0)
    {
      countArr[0]="Hours";
      for(var j=1; j<32; j++)
      {
        countArr[j]=j+'-March';
      }
      resultant[i]=countArr;
      continue;
    }
    
    for(var j=0; j<32; j++)
    {
      if(j==0)
      {
        countArr[j] = i+'-Hours';
        continue;
      }
      countArr[j]=0;
    }
    resultant[i]=countArr;
  }
  
  
  
  for(key in rows)
  {
    if(rows[key][15] !== "FALSE")
    {
    var date = parseInt(rows[key][4].substring(8,10),10);
    var timeInitials = parseInt(rows[key][4].substring(11,13),10);
    resultant[timeInitials+1][date] = resultant[timeInitials+1][date]+1;
    }
  }
  
  
  output = resultant;
  var result = JSON.stringify(output);
  
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
  
}  
  
