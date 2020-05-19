export { displayObservations }


function applyTemplate(targetid, templateid, data) {
  let target = document.getElementById(targetid);

  let template = Handlebars.compile(document.getElementById(templateid).textContent)
  target.innerHTML = template(data);
}

function displayObservations(targetid, data){
  applyTemplate(targetid, "observationsRecent", {"observation" : data});
}