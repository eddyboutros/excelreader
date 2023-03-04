const currYear = document.getElementById("year");
currYear.innerHTML = new Date().getFullYear().toString();

function showExcelFiles()
{
    fetch("http://localhost:8080/getAvailableExcelFiles")
        .then(response => response.json())
        .then(data =>
		{
            //[{"name":"users.xlsx"},{"name":"users_old.xlsx"}]
            var size = data.length;
            var obj;
            var files = document.getElementById("excelFiles");
            var fileName = document.createElement("option");

            for (let i = 0; i < size; i++)
            {
                obj = data[i].name;
                fileName.value = obj;
                fileName.innerHTML = obj;
                files.appendChild(fileName);
                fileName = document.createElement("option");
            }

        });
}

function onFileChange() {
    var tablesToClean = document.querySelectorAll("table");
  
    tablesToClean.forEach(function (tablesToClean) {
      tablesToClean.remove();
    });
  
    var fileName = document.getElementById("excelFiles").value;
    fetch("http://localhost:8080/readExcelData/" + fileName)
      .then((response) => response.json())
      .then((data) => {
        var size = data.length;
        var form = document.getElementById("formElement");
        var table = document.createElement("table");
        var td = document.createElement("td");
        var tr = document.createElement("tr");
  
        var innerSize = 0;
        var innerArray;
        var rowHeight = 30; // Set the height of each row in pixels
        var tableHeight = size * rowHeight; // Calculate the height of the table
  
        for (let i = 0; i < size; i++) {
          innerSize = data[i].length;
          innerArray = data[i];
  
          for (let j = 0; j < innerSize; j++) {
            td.innerHTML = innerArray[j];
            td.style.border = "1px solid black";
            tr.appendChild(td);
            td = document.createElement("td");
          }
  
          table.appendChild(tr);
          td = document.createElement("td");
          tr = document.createElement("tr");
  
          console.log(data[i]);
        }
  
        table.style.height = tableHeight + "px"; // Set the height of the table
        form.appendChild(table);
      });
  }