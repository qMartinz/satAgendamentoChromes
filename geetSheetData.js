const getSheetData = ({ sheetID, sheetName, callback }) => {
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const url = `${base}&sheet=${encodeURIComponent(
      sheetName
    )}&tq=${encodeURIComponent('SELECT *')}`;
  
    fetch(url)
      .then((res) => res.text())
      .then((response) => {
        callback(responseToObjects(response));
      });
  
    function responseToObjects(res) {
      // credit to Laurence Svekis https://www.udemy.com/course/sheet-data-ajax/
      const jsData = JSON.parse(res.substring(47).slice(0, -2));
      //console.log(jsData);
      let data = [];
      const columns = jsData.table.cols;
      const rows = jsData.table.rows;
      let rowObject;
      let cellData;
      let propName;

      let labels = rows[0];
        
      for (let r = 1, rowMax = rows.length; r < rowMax; r++) {
          rowObject = {};
          for (let c = 0, colMax = columns.length; c < colMax; c++) {
              propName = labels["c"][c]["v"];
              cellData = rows[r]["c"][c];
              if (cellData === null) {
                  rowObject[propName] = "";
              } else if (typeof cellData["v"] == "string" && cellData["v"].startsWith("Date")) {
                  rowObject[propName] = new Date(cellData["v"]);
              } else {
                  rowObject[propName] = cellData["v"];
              }
          }
          data.push(rowObject);
      }
      //console.log(data);
      return data;
    }
  };