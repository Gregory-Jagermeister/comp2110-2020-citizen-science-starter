export { split_hash, copy };

// split_hash - given a hash path like "#!/observations/2"
//   return an object with properties `path` ("observations") and `id` (2)
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

//From Stack overflow, Want to prevent shallow copies of data if I plan to manipulate the Model data
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
