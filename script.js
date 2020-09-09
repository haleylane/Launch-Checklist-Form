// Write your JavaScript code here!
window.addEventListener("load", function() {
   //put fetch stuff in here
   fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
  response.json().then( function(json) {
     const div = document.getElementById("missionTarget");
     // Add HTML that includes the JSON data
     div.innerHTML = `
     <h2>Mission Destination</h2>
     <ol>
        <li>Name: ${json[3].name}</li>
       <li>Diameter: ${json[3].diameter}</li>
       <li>Star: ${json[3].star}</li>
       <li>Distance from Earth: ${json[3].distance}</li>
       <li>Number of Moons: ${json[3].moons}</li>
   </ol>
   <img src="${json[3].image}">
     `;
  });
});
   //end of fetch stuff
   
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
       let pilot = document.querySelector("input[name=pilotName]")
       //alert("Pilot name: " + pilot.value);
       let copilot = document.querySelector("input[name=copilotName")
       //alert("Copilot name: " + copilot.value);
       let fuel = document.querySelector("input[name=fuelLevel]")
       //alert("Fuel level: " + fuel.value);
       let mass = document.querySelector("input[name=cargoMass]")

       //function to update pilot and co pilot values
       let inputs = []; 
       function storeInfo (event) {
           //event.preventDefault();
           let pilotState = document.getElementById("pilotStatus");
           let copilotState = document.getElementById("copilotStatus");
           let boxToDisplay = document.getElementById('faultyItems');
           boxToDisplay.style.visibility = 'visible';
           const statusOfPilot = document.getElementById('pilotStatus');
           statusOfPilot.innerHTML = `${pilot.value} is ready`;
           const statusOfCopilot = document.getElementById('copilotStatus');
           statusOfCopilot.innerHTML = `${copilot.value} is ready`;

       }
       function validate(str) {
           let strValue = str.value;
           var objRegExp  = /^[A-Za-z]+$/;
           let a = objRegExp.test(strValue);
           if (a) {
               return 1;
           } else if (a !== 1) {return false;}
       }
       
       
       if (pilot.value === "" || copilot.value === "" || fuel.value === "" || fuel.value=== null || mass.value === "" || mass.value === null) {
           alert("All fields are required!");
           event.preventDefault();
       } else if (isNaN(fuel.value) || isNaN(mass.value)) {
           alert("Fuel level and cargo mass should only be specified in numbers!");
           event.preventDefault();
       } else if ((validate(pilot) !== 1)|| (validate(copilot) !== 1)) {
           alert("Pilot and Copilot names should only contain a-z letters!");
           event.preventDefault();
       } else if (fuel.value < 10000){
           event.preventDefault();
           storeInfo(event);
           const statusOfFuel = document.getElementById('fuelStatus');
           statusOfFuel.innerHTML = `Fuel level of ${fuel.value} is not high enough for launch`
           const heading = document.getElementById('launchStatus');
           heading.style.color = 'red';
           heading.innerHTML = `Shuttle not ready for launch`

       } else if (mass.value > 100000) {
           event.preventDefault();
           storeInfo(event);
           const statusOfMass = document.getElementById('cargoStatus');
           statusOfMass.innerHTML = `Cargo mass of ${mass.value} is too heavy for launch`
           const heading = document.getElementById('launchStatus');
           heading.style.color = 'red';
           heading.innerHTML = `Shuttle not ready for launch`
       } else {
           event.preventDefault();
           storeInfo(event);
           const heading = document.getElementById('launchStatus');
           heading.style.color = 'green';
           heading.innerHTML = `Shuttle is ready to launch!`
       } 
   })
})


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li id= missionName>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
