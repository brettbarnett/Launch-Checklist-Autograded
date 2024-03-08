// Write your helper functions here!

require("cross-fetch/polyfill");

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
  // Here is the HTML formatting for our mission target div.
  /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
   let missionTargetRef = document.getElementById("missionTarget");
   missionTargetRef.innerHTML = `<h2>Mission Destination</h2>
   <ol>
    <li>Name: ${name}</li>
    <li>Diameter: ${diameter}</li>
    <li>Star: ${star}</li>
    <li>Distance from Earth: ${distance}</li>
    <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">`;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (testInput === true || testInput === false) {
    return "Not a Number";
  } else if (isNaN(testInput)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    //This is the function you call upon submission
    //Is the cargo too large
    //Is the fuel too low
    //Is the copilot a string
    //Is the fuel a number

    //event.stopPropagation();
    let readyForLaunch = true;

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || 
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
          readyForLaunch = false;
          window.alert("All fields are required!");
    }
    if (validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number") {
      readyForLaunch = false;
      window.alert("Fuel Level and Cargo Mass need to be a number!");
    }
  
    let pilotStatusRef = document.getElementById("pilotStatus");
    let copilotStatusRef = document.getElementById("copilotStatus");
    let fuelStatusRef = document.getElementById("fuelStatus");
    let cargoStatusRef = document.getElementById("cargoStatus");
    let launchStatusRef = document.getElementById("launchStatus");

    pilotStatusRef.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatusRef.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    list.style.visibility = "visible";

    if (fuelLevel < 10000) {
        fuelStatusRef.innerHTML = "Fuel level too low for launch";
        readyForLaunch = false;
    }
    else {
      fuelStatusRef.innerHTML = "Fuel level high enough for launch";
    }
    if (cargoLevel > 10000) {
        cargoStatusRef.innerHTML = "Cargo mass too heavy for launch";
        readyForLaunch = false;
    }
    else {
      cargoStatusRef.innerHTML = "Cargo mass low enough for launch";
    }

    if (readyForLaunch !== true) {
        launchStatusRef.innerHTML = "Shuttle Not Ready for Launch";
        launchStatusRef.style.color = "red";
    }
    else {
        launchStatusRef.innerHTML = "Shuttle is Ready for Launch";
        launchStatusRef.style.color = "green";
    }
}

async function myFetch() {
    let planetsReturned;

    let url = "https://handlers.education.launchcode.org/static/planets.json";
    
    planetsReturned = await fetch(url).then(function (response) {
        return response.json();
    });
    
    return planetsReturned;
}

function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;