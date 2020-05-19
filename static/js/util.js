export {split_hash, getTopTen};

// split_hash - given a hash path like "#!/observations/2" 
//   return an object with properties `path` ("observations") and `id` (2)
function split_hash(hash) {

    const regex = "#!/([^/]*)/?(.*)?";
    const match = hash.match(regex);
    if (match) {
        return {
            path: match[1],
            id: match[2]
        }
    } else {
        return { path: "" }
    }
}

function getTopTen(users){
    var recentObs = [];
    

    for (let index = 0; index < N; index++) {
        recentObs.push(allObs[index]);
    }

    return recentObs;
}