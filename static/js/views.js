export {
  displayObservations,
  displayTopTenUsers,
  displayListView,
  displayDetailView,
};
import { split_hash, copy } from "./util.js";

function applyTemplate(targetid, templateid, data) {
  //<<PARTIAL TEMPLATES>>//
  Handlebars.registerPartial(
    "recentObs",
    document.getElementById("observationsRecent").innerHTML
  );
  Handlebars.registerPartial(
    "topTen",
    document.getElementById("userList").innerHTML
  );

  //Modified Stackoverflowv Code from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
  Handlebars.registerHelper("counter", function (index) {
    let i = index + 1;
    let j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  });

  Handlebars.registerHelper("datetime", function (date) {
    return new Date(date).toDateString();
  });

  let target = document.getElementById(targetid);

  let template = Handlebars.compile(
    document.getElementById(templateid).textContent
  );
  target.innerHTML = template(data);
}

function displayObservations(targetid, obData, userData) {
  let data = obData.concat(userData);
  console.log(data);
  applyTemplate(targetid, "HomePage", { content: data });
}

function displayTopTenUsers(targetid, data) {
  applyTemplate(targetid, "userList", { user: data });
}

function displayListView(targetid, data) {
  let pathObj = split_hash(window.location.hash);

  if (pathObj.path === "users") {
    applyTemplate(targetid, "listusercontent", { content: data });
  } else if (pathObj.path === "observations") {
    applyTemplate(targetid, "listobscontent", { content: data });
  }
}

function displayDetailView(targetid, data) {
  applyTemplate(targetid, "obsdetailed", data);
}
