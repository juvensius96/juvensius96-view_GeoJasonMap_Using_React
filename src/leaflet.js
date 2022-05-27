import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "./geojson.json";

var custom_map = null;

const Map = () => {
  // const [map, setMap] = useState(null);

  const space = " = ";
  
  const addGeoJson = () => {
    let layer = L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        layer.addEventListener("click", () => {
          layer.bindPopup(feature.properties.name + space + feature.properties.pohon);
          TableFunction(feature, layer);
          
        }); 
      }
    });
    layer.addTo(custom_map); 
  };



  function TableFunction(feature, layer) {
    var x=feature.properties.kebun;
    var y=feature.properties.desa;
    document.getElementById("luas").value = feature.properties.name;
    document.getElementById("pohon").value = feature.properties.pohon;
    document.getElementById("bundes").value = "Kebun"+" "+x+" | "+"Desa"+" "+y;
    
  }

  useEffect(() => {
    custom_map = L.map("mapid").setView([-8.088, 113.626], 13);
    L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
      attribution:'PDP Kahyangan Jember',
      subdomains:['mt0','mt1','mt2','mt3'],
      name:'desa suci'
    }).addTo(custom_map);
  
    addGeoJson();
  }, []);

 
  return (
    <div>
      <div
        id="mapid"
        style={{
          width: "100%",
          height: "90vh" || window.screen.availHeight
        }}
      ></div>

      <div>



<input  type="text" id="bundes" class="form-control form-control-sm" readOnly></input>
<div class="table-responsive">
 <table class="table table-light table-striped table-sm">
  <thead class="table-light">
    <tr>
       <th>#</th>
       <th>Luas Area</th>
       <th>Jumlah Pohon</th>
     
     </tr>
   </thead>
   <tbody>
      <tr>
         <th scope="row">1</th>
         <td> <input  type="text" id="luas" readOnly></input></td>
         <td> <input type="text" id="pohon" readOnly></input></td>
        
      </tr>
    
    
   </tbody>
</table>
</div>
      </div>
    
    </div>
  );
};


export default Map;


