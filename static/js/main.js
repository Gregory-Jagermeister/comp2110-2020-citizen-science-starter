import { Model } from "./model.js";
import {
  displayObservations,
  displayListView,
  displayDetailView,
  displayForm,
} from "./views.js";
import { split_hash, copy } from "./util.js";

function redraw() {
  //Get the List of users and observations from the JSON/Database/API thing??
  //and upload it to the model object.
  Model.update_observations();
  Model.update_users();
}

//listen for when the model updates.
window.addEventListener("modelUpdated", function (e) {
  //Variables for Information to be displayed.
  let obsData = Model.get_observations();
  let toptenUsers = Model.get_topTen();
  let recentObsdata = Model.get_recent_observations(10);
  let users = Model.get_users();
  let currentHash = split_hash(window.location.hash);

  //if the url is /#!/users/ then Displays the list of users
  // or if the url is /#!/users/<id> then display the detailed view for that
  // user.
  if (currentHash.path === "submit") {
    displayForm("othercontent");
  } else if (currentHash.path === "users") {
    displayListView("othercontent", users);

    if (typeof currentHash.id !== "undefined") {
      let userInfo = copy(Model.get_user(currentHash.id));
      let userObs = Model.get_user_observations(currentHash.id);

      // if the user info is not listed as 'undefined' then it must have
      // data associated with it and if so then add a property 'observations'
      // and append the users observations to it.
      if (typeof userInfo !== "undefined") {
        userInfo.observations = userObs;
      }
      displayDetailView("othercontent", userInfo);
    }
    // if the url is /#!/observations/ then display the list of observations
    // or if the url is /#!/observations/<id> then display a detailed view of
    // that observation.
  } else if (currentHash.path === "observations") {
    displayListView("othercontent", obsData);

    if (typeof currentHash.id !== "undefined") {
      let obsInfo = Model.get_observation(currentHash.id);
      displayDetailView("othercontent", obsInfo);
    }
    //displays the homepage.
  } else {
    displayObservations("othercontent", recentObsdata, toptenUsers);
  }
});

window.onload = function () {
  //when the window load draws the page
  redraw();
};

window.onhashchange = function () {
  // everytime the page hash changes then redraw the page.
  redraw();
};
