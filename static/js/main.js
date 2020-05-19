import { Model } from "./model.js";
import { displayObservations } from "./views.js";

function redraw() { 

    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/api/observations'>List of Observations</a></li>";
    content += "<li><a href='/api/users'>List of Users</a></li>"; 
    content += "<li><a href='/api/users/1'>Detail of one user</a></li>"; 
    content += "<li><a href='/api/observations/1'>Detail of one observation</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;

    Model.update_observations();
    Model.update_users();

    

}

window.addEventListener("modelUpdated", function(e) {

    let recentObsdata = Model.get_recent_observations(10);
    displayObservations("recentObs", recentObsdata); 
    
});

window.onload = function() {
    redraw();
};


