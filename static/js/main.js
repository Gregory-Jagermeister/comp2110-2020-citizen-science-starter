import { Model } from "./model.js";
import {
  displayHome,
  displayListView,
  displayDetailView,
  displayForm,
  displayFormError,
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

  //if the url is /#!/submit/ then the user is requesting to access the
  //form to add an observation.
  if (currentHash.path === "submit") {
    let emptyDetail = document.getElementById("detailinside");
    if (emptyDetail !== null) {
      emptyDetail.innerHTML =
        "Fill out the Form and click Submit to add it to our tree database.";
    }
    //display the form
    displayForm("othercontent");
    //get the form
    let form = document.getElementById("submitForm");
    //when the form submits...
    form.onsubmit = function () {
      //Create formdata with the inputed information
      //this new observation is saved and then added to the JSON database
      let newob = new FormData(form);
      Model.add_observation(newob);
      return false;
    };
    //if the url is /#!/users/ then Displays the list of users
    // or if the url is /#!/users/<id> then display the detailed view for that
    // user.
  } else if (currentHash.path === "users") {
    let emptyDetail = document.getElementById("detailinside");
    if (emptyDetail !== null) {
      emptyDetail.innerHTML = "Please Select an observation or User to view.";
    }

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
      displayDetailView("detail", userInfo);
    }
    // if the url is /#!/observations/ then display the list of observations
    // or if the url is /#!/observations/<id> then display a detailed view of
    // that observation.
  } else if (currentHash.path === "observations") {
    let emptyDetail = document.getElementById("detailinside");
    if (emptyDetail !== null) {
      emptyDetail.innerHTML = "Please Select an observation or User to view.";
    }

    displayListView("othercontent", obsData);

    if (typeof currentHash.id !== "undefined") {
      let obsInfo = Model.get_observation(currentHash.id);
      displayDetailView("detail", obsInfo);
    }
    //displays the homepage.
  } else {
    let emptyDetail = document.getElementById("detailinside");
    if (emptyDetail !== null) {
      emptyDetail.innerHTML = "Please Select an observation or User to view.";
    }
    displayHome("othercontent", recentObsdata, toptenUsers);
  }
});

//if a form was sumbitted...
window.addEventListener("observationAdded", function (e) {
  //...and was a success submitting then navigate to user 0's page
  if (e.detail.status === "success") {
    window.location.href = "/#!/users/0";
    //...and was a fail submitting display an error.
  } else {
    displayFormError("detail", e.detail.errors);
  }
});

//when the Nav menu button is clicked...
document.getElementById("menu-butt").onclick = function () {
  //increase the width by 250 pixels
  document.getElementById("menu").style.width = "250px";
  //and then move the body of the document to the right 250 pixels
  document.body.style.marginRight = "250px";
};

//<<<<<<<<<<<<<< CSS ASSISTS >>>>>>>>>>>>>>>>>//

//when the close button is clicked
document.getElementById("closeButt").onclick = function () {
  //decrease the width of the nav to 0
  document.getElementById("menu").style.width = "0";
  //set the right margin of the body to 0
  document.body.style.marginRight = "0";
};

window.onload = function () {
  //when the window load draws the page
  redraw();
};

window.onhashchange = function () {
  // everytime the page hash changes then redraw the page.
  redraw();
};
