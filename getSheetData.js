/**
 * Captura os dados de uma página específica da planilha e roda a função especificada no parâmetro Dados.
 * @param {Object} Dados Objeto com o ID da planilha, nome da página e função para a utilização dos dados. 
 */
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
              } else if (!isNaN(Number(cellData["v"])) && cellData["v"] !== null) {
                  rowObject[propName] = Number(cellData["v"])
              } else {
                  rowObject[propName] = cellData["v"];
              }
          }
          data.push(rowObject);
      }
      return data;
    }
  };

/**
 * Callback para utilizar os dados da planilha
 * @callback sheetDataCallback
 * @param {Object[]} sheetData
 */

/**
 * Implementação de {@link getSheetData} para utilizar os dados de uma página especificada da planilha
 * @param {string} sheetName Título da página da planilha
 * @param {sheetDataCallback} sheetDataCallback Callback que utiliza os dados da planilha
 */
function getSheetDataCallback(sheetName, sheetDataCallback){
  const sheetDataHandler = (sheetData) => {
    sheetDataCallback(sheetData);
  }

  getSheetData({
    sheetID: "1XUVqK59o1nPMhZTG_eh8ghd0SArB2fZyk1pnOf_ne7A",
    sheetName: sheetName,
    callback: sheetDataHandler,
  });
}