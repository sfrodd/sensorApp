const http = require('http');
const WebSocket = require('ws');
const xlsx=require('xlsx')
const fs=require('fs')
// Create an HTTP server

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('WebSocket server is running\n');
});

// Create a WebSocket server by passing the HTTP server instance
const wss = new WebSocket.Server({ server });

// Event handler for WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected!!');
  const excelFilePath = 'd:/sensorData/device68.csv';

// Read the Excel file
const workbook = xlsx.readFile(excelFilePath);

// Choose the sheet you want to read
const sheetName = 'Sheet1'; // Change this to your sheet name

var sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON format
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Log the data
//console.log(jsonData);

// If you want to save the data to a new JSON file
//const jsonFilePath = 'path/to/your/output.json';
//fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

// Example: Accessing specific cell data


  var n=0;
  var j=2
  // Simulate sending updates at regular intervals (replace with your actual data source)
  const intervalId = setInterval(() => {
    // Generate or fetch your sensor data here
    n=10000;
    let myData1=[]
    let myData2=[]
    for(i=j;i<=n+j;i+=5)
    {
        myData1.push({label:"Time",value:sheet['A'+i].v })
        myData1.push({label:"SoC",value:sheet['I'+i].v})
        myData2.push({label:"Time",value:sheet['A'+i].v })
        myData2.push({label:"Temp",value:sheet['AE'+i].v})
    }
    var sensorData ={"SoC":myData1,"Temperature":myData2} 
    //console.log(myData1)
    //console.log(myData1.length)  
    
    
    // Send the data as JSON to connected clients
   ws.send(JSON.stringify(sensorData));
   // ws.send(JSON.stringify({myData1,myData2}))
    
j++
if(j>=7500) j=2;
}, 10); // Update interval in milliseconds

  // Event handler for WebSocket connection closing
  ws.on('close', () => {
    console.log('Client disconnected');
    clearInterval(intervalId);
  });
});

// Start the HTTP server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
