# COMP2110/6110 Starter Kit - Citizen Science Web Application

## Table Of Contents

- [Basic Structure](#basic-structure)
- [JavaScript](#javascript)
  - [Main.js](#mainjs)
  - [Model.js](#modeljs)
  - [Util.js](#utiljs)
  - [Views.js](#viewsjs)
- [HTML & CSS](#html---css)

## Basic Structure

This Website consists of a lot of front end resources and as a result there is a basic structure to how these files are laid out. Understanding this allows you to see how this web app is served to the user.

there are 3 main files type which need to observed and viewed for continued development, they are:

> - Javascript `.js`
>   - located in `/static/js/`
> - Html `.html`
>   - located in `/static/views/`
> - CSS `.css`
>   - located in `/static/css/`

Please see below for understanding each file type.

## JavaScript

Within `/static/js/` there are four java script files which should be:

- `main.js`
- `model.js`
- `util.js`
- `views.js`

each file fulfills a different purpose and works works together with each file to create interactivity on the website.

### Main.js

this files is the back backbone of the website; It controls what is displayed by using the page hash, Reloads the model data so the data can be worked with and lastly handles form requests send back to the api.

in order to achieve this the file is essentially split into 3 main sections.

A Redraw function that reloads the model data denoted by the function:

```javascript
function redraw() {
  Model.update_observations();
  Model.update_users();
}
```

An Event Listener that fires once the model has updated denoted by the event listener:

```javascript
window.addEventListener("modelUpdated", function (e) {
  //do stuff with model data here
}
```

And lastly an event listener that fires when a form is submitted, denoted by the event listener:

```javascript
window.addEventListener("observationAdded", function (e) {
  //do stuff with form response
}

```

This is the General set up of Main.js, the File it self includes more detailed comments explaining each section and its purpose.

### Model.js

This file Sets up a Model object to store the data fetched from the api. This Model contains functions that help sort and organise the data, below is a list of functions that might be useful in this websites development:

> - `get_user_observations(id)`
>   - gets the users observations based on id.
> - `get_recent_observations(n)`
>   - gets the most recent observations determined on the number 'n' which dictates how many records are shown
> - `get_users()`
>   - gets the list of users from the model.
> - `get_user(id)`
>   - gets the user based on their id
> - `set_users()`
>   - sets the users to be stored in the model.
> - `set_observations()`
>   - sets the observations to be stored in the model.
> - `get_observations()`
>   - gets the list of observations from the Model.

These functions are the main ones that are used, however there are more in Model.js. Again the code is commented for each function so that its clear to understand what they do.

### Util.js

Provides functions to help with other website task. inside this file there are only 2 functions. These functions have different purposes, these are:

- to change the hash into a path object that can be used to determine the page currently accessed.
- to provide a copy function that provides a deep copy of an object in order to prevent a by reference copy of an obj causing issues with data manipulation.

these functions are:

```Javascript
function split_hash(hash) {
  const regex = "#!/([^/]*)/?(.*)?";
  const match = hash.match(regex);
  if (match) {
    return {
      path: match[1],
      id: match[2],
    };
  } else {
    return { path: "" };
  }
}

function copy(obj) {
  if (obj !== null) {
    const copy = Object.create(Object.getPrototypeOf(obj));
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach((name) => {
      const desc = Object.getOwnPropertyDescriptor(obj, name);
      Object.defineProperty(copy, name, desc);
    });

    return copy;
  } else {
    null;
  }
}
```

Add more functions to this file as needed if more utilities are needed to assist website generation.

### Views.js

this file creates the views for the HTML displaying content to the user. this is done by using a template framework called [Handlebars](https://handlebarsjs.com/). the process to creating a view is quite simple:

1. Construct a template in html using a script element:

```html
<script id="My-Awesome-Template" type="text/x-handlebars-template">
  <h3>
    {{data}}
  </h3>
</script>
```

2. Create a template compiler:

```javascript
function applyTemplate(targetid, templateid, data) {
  let target = document.getElementById(targetid);
  let template = Handlebars.compile(
    document.getElementById(templateid).textContent
  );
  target.innerHTML = template(data);
}
```

3. Create a display function for that template:

```javascript
function displayMyAwesomeTemplate(targetel, data) {
  applyTemplate(targetel, "My-Awesome-Template", data);
}
```

4. display it using however method you would like, remember to pass through the `targetel` param as a html id for eg:

```javascript
displayMyAwesomeTemplate("foo", "hi");
```

This will ensure that the element foo will now contain a heading that says hi.

## HTML & CSS

The Html and CSS are pretty self explanatory however structure wise its worth noting that the Html is split into 2 sections Templates and Base, the base is simple the placeholders that construct the page, the templates are what the javascript uses to construct the page from the data given from the api.
