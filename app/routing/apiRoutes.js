var friendsData = require("../data/friends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });


    // API POST Requests

    app.post("/api/friends", function (req, res) {
        /* Code below is to determine the compatability between the client's submission
         to the data in friends array. We are looping through the object and then looping through the scores
         we then have a variable with an assigned value that updates to compare with the absolute value of
         the scores in the array to provide the best match*/

        var bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000
        };

        var userData = req.body;
        var userScores = userData.scores;
        
        var totalDiff = 0;

        for (var i = 0; i < friendsData.length; i++) {
            for (var j = 0; j < friendsData[i].scores[j]; j++) {
                totalDiff += Math.abs(parseInt(userScores[j])) - parseInt(friendsData[i].scores[j]);

                if (totalDiff <= bestMatch.friendDiff){
                    bestMatch.name = friendsData[i].name;
                    bestMatch.photo = friendsData[i].photo;
                    bestMatch.friendDiff = totalDiff;
                }

            }
        }
        friendsData.push(userData);

        res.json(bestMatch);
    });
};