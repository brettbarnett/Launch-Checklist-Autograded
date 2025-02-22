//const { validateInput } = require("./scriptHelper");

window.addEventListener("load", function () {
  let listedPlanets;
  // Set listedPlanetsResponse equal to the value returned by calling myFetch()
  let listedPlanetsResponse;
  listedPlanetsResponse = myFetch()
    .then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
    })
    .then(function () {
      console.log(listedPlanets);
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

      let planet = pickPlanet(listedPlanets);
      addDestinationInfo(
        document,
        planet.name,
        planet.diameter,
        planet.star,
        planet.distance,
        planet.moons,
        planet.image
      );
    });

  let myForm = document.querySelector("form");
  myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formSubmission(document, 
      document.getElementById("faultyItems"), 
      document.querySelector("input[name=pilotName]").value, 
      document.querySelector("input[name=copilotName]").value,
      document.querySelector("input[name=fuelLevel]").value,
      document.querySelector("input[name=cargoMass]").value
    );
  });
});
