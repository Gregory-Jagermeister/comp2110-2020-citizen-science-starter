export {
  displayHome,
  displayFormError,
  displayForm,
  displayListView,
  displayDetailView,
};
import { split_hash } from "./util.js";

function applyTemplate(targetid, templateid, data) {
  //<<PARTIAL TEMPLATES>>//
  //these are used to construct the homepage
  Handlebars.registerPartial(
    "recentObs",
    document.getElementById("observationsRecent").innerHTML
  );
  Handlebars.registerPartial(
    "topTen",
    document.getElementById("userList").innerHTML
  );

  //Modified Stackoverflowv Code from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
  //gives an index a 'st', 'nd', 'rd' or 'th' suffix
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

  //Transforms the date into a human readable format
  Handlebars.registerHelper("datetime", function (date) {
    return new Date(date).toDateString();
  });
  //Get the Target element to insert the Template.
  let target = document.getElementById(targetid);
  //Compile the template using handlebars and by getting the element that
  //contains the physical template.
  let template = Handlebars.compile(
    document.getElementById(templateid).textContent
  );

  //insert the template into the target.
  target.innerHTML = template(data);
}

//applies the 'homepage' template
function displayHome(targetid, obData, userData) {
  applyTemplate(targetid, "HomePage", { obData, userData });
}

//applies the 'form' template
function displayForm(targetid) {
  applyTemplate(targetid, "form", null);
}

//applies either the user list view or observations list view depending
//on the hash object path.
function displayListView(targetid, data) {
  let pathObj = split_hash(window.location.hash);

  if (pathObj.path === "users") {
    applyTemplate(targetid, "listusercontent", { content: data });
  } else if (pathObj.path === "observations") {
    applyTemplate(targetid, "listobscontent", { content: data });
  }
}

//applies either the user detail view or the observation detail view
//depending on the hash object path and id.
function displayDetailView(targetid, data) {
  let pathObj = split_hash(window.location.hash);

  if (pathObj.path === "users") {
    applyTemplate(targetid, "usdetailed", data);
  } else if (pathObj.path === "observations") {
    applyTemplate(targetid, "obsdetailed", data);
  }
}

//displays the error that prevented the form from sending, notifying the user
function displayFormError(targetid, data) {
  applyTemplate(targetid, "formerror", data);
}
