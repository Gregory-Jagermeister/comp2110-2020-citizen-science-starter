export { Model };

/*
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
 */

const Model = {
  observations_url: "/api/observations",
  users_url: "/api/users",

  // this will hold the data stored in the model
  data: {
    observations: [],
    users: [],
  },

  // update_users - retrieve the latest list of users
  //    from the server API
  // when the request is resolved, creates a "modelUpdated" event
  // with the model as the event detail
  update_users: function () {
    fetch(this.users_url)
      .then((response) => response.json())
      .then((data) => {
        this.data.users = data;
        var event = new CustomEvent("modelUpdated", {
          detail: this,
        });
        window.dispatchEvent(event);
      });
  },

  // update_observations - retrieve the latest list of observations
  //   from the server API
  // when the request is resolved, creates a "modelUpdated" event
  // with the model as the event detail
  update_observations: function () {
    fetch(this.observations_url)
      .then((response) => response.json())
      .then((data) => {
        this.data.observations = data;

        var event = new CustomEvent("modelUpdated", {
          detail: this,
        });
        window.dispatchEvent(event);
      });
  },

  // get_observations - return an array of observation objects
  get_observations: function () {
    return this.data.observations;
  },

  // get_observation - return a single observation given its id
  get_observation: function (observationid) {
    for (let i = 0; i < this.data.observations.length; i++) {
      var x = this.data.observations[i];
      if (x.id == observationid) {
        return x;
      }
    }
    return null;
  },

  set_observations: function (observations) {
    this.data.observations = observations;
  },

  // add_observation - add a new observation by submitting a request
  //   to the server API
  //   formdata is a FormData object containing all fields in the observation object
  // when the request is resolved, creates an "observationAdded" event
  //  with the response from the server as the detail
  add_observation: function (formdata) {
    fetch(this.observations_url, {
      body: formdata,
      method: "POST",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var event = new CustomEvent("observationAdded", {
          detail: data,
        });
        window.dispatchEvent(event);
      });
  },

  // get_user_observations - return just the observations for
  //   one user as an array
  get_user_observations: function (userid) {
    var arr = [];
    this.data.observations.forEach(function (element) {
      var x = element.participant;
      if (x == userid) {
        arr.push(element);
      }
    });

    arr.sort(function (a, b) {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    });
    return arr;
  },

  // get_recent_observations - return the N most recent
  //  observations, ordered by timestamp, most recent first
  get_recent_observations: function (N) {
    var recentObs = [];
    var allObs = [...this.data.observations];
    allObs.sort(function (a, b) {
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      return 0;
    });

    for (let index = 0; index < N; index++) {
      recentObs.push(allObs[index]);
    }

    return recentObs;
  },

  /*
   * Users
   */
  // get_users - return the array of users
  get_users: function () {
    return this.data.users;
  },

  get_Leaderboard: function () {
    let leaderboard = [];
    let userObs = new Map();

    this.data.users.forEach((element) => {
      userObs.set(element.id, 0);
    });

    this.data.observations.forEach((element) => {
      userObs.set(element.participant, userObs.get(element.participant) + 1);
    });

    let sortedUserObs = new Map([...userObs].sort((a, b) => b[1] - a[1]));
    for (const [key, value] of sortedUserObs) {
      this.data.users.forEach((element) => {
        if (element.id == key) {
          leaderboard.push(element);
        }
      });
    }

    return leaderboard;
  },

  get_topTen: function () {
    let lboard = this.get_Leaderboard();

    //this is what happens when you decide F**k it i'll do it the dumb way
    // let ttu = [];
    // for (let index = 0; index < 10; index++) {
    //   ttu[index] = lboard[index];
    // }

    return lboard.slice(0, 10);
  },

  // set_users - set the array of users
  set_users: function (users) {
    this.data.users = users;
  },

  // get_user - return the details of a single user given
  //    the user id
  get_user: function (userid) {
    // That Moment you work out that forEach loops always return undefined or null
    // this.data.users.forEach((element) => {
    //   var x = element;
    //   if (x.id == userid) {
    //     returnedel = x;
    //   } else {
    //     returnedel = null;
    //   }
    // });

    for (let i = 0; i < this.data.users.length; i++) {
      var x = this.data.users[i];
      if (x.id == userid) {
        return x;
      }
    }
    return null;
  },
};
