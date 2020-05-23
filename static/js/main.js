import { Model } from "./model.js";
import {
  displayObservations,
  displayTopTenUsers,
  displayListView,
  displayDetailView,
} from "./views.js";
import { split_hash, copy } from "./util.js";

function redraw() {
  Model.update_observations();
  Model.update_users();
}

window.addEventListener("modelUpdated", function (e) {
  let obsData = Model.get_observations();
  let toptenUsers = Model.get_topTen();
  let recentObsdata = Model.get_recent_observations(10);
  let users = Model.get_users();
  let currentHash = split_hash(window.location.hash);

  if (currentHash.path === "users") {
    displayListView("othercontent", users);

    if (typeof currentHash.id != "undefined") {
      let userInfo = copy(Model.get_user(currentHash.id));
      let userObs = Model.get_user_observations(currentHash.id);

      console.log(userObs);
      if (typeof userInfo !== "undefined") {
        userInfo.observations = userObs;
      }
      console.log(userInfo);
    }
  } else if (currentHash.path === "observations") {
    displayListView("othercontent", obsData);

    if (typeof currentHash.id !== "undefined") {
      let obsInfo = Model.get_observation(currentHash.id);
      console.log(obsInfo);
      displayDetailView("othercontent", obsInfo);
    }
  } else {
    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/api/observations'>List of Observations</a></li>";
    content += "<li><a href='/api/users'>List of Users</a></li>";
    content += "<li><a href='/api/users/1'>Detail of one user</a></li>";
    content +=
      "<li><a href='/api/observations/1'>Detail of one observation</a></li>";
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;

    displayObservations("othercontent", recentObsdata, toptenUsers);
    //displayTopTenUsers("topUsers", toptenUsers);
  }
});

window.onload = function () {
  redraw();
};

window.onhashchange = function () {
  redraw();
  //this.location.reload();
};
