const https = require("https");

let locat;
let location = [];

https
  .get(
    "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/nodes?type=list&key=0",
    (resp) => {
      let data = "";
      resp.on("data", (chunk) => {
        data += chunk;
      });
      resp.on("end", () => {
        console.log(JSON.parse(data));
        locat = JSON.parse(data).map((obj) => {
          return obj.vertex_name;
        });

        let test = JSON.parse(data).filter((obj) => {
          return obj.vertex_name === "E1-01-01";
        });

        console.log(test);
      });
    }
  )
  .on("error", (err) => {});

//*code a function that accepts the vertex name as the parameter and returns the vertex ID
// returnVertexID(name) {
//   if(name === obj.vertex_name){
//   return obj.vertex_id;
//   }else{
//   return 0;
//   }
// };

// https
//   .get(
//     "https://0997tcpnme.execute-api.us-east-1.amazonaws.com/testing/routes?start=1&end=5",
//     (resp) => {
//       let data = "";
//       resp.on("data", (chunk) => {
//         data += chunk;
//       });
//       resp.on("end", () => {
//         let directions;
//         console.log(JSON.parse(data));
//         directions = JSON.parse(data).map((obj) => {
//           return obj.edge_description;
//         });

//         console.log(directions);
//       });
//     }
//   )
//   .on("error", (err) => {});

// export default location;
