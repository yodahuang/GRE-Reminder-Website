console.log("In fireBase");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBeN8cP13CXwWthtYeWBAYKsbGM_u182cw",
    authDomain: "gre-reminder.firebaseapp.com",
    databaseURL: "https://gre-reminder.firebaseio.com",
    storageBucket: "gre-reminder.appspot.com",
};
firebase.initializeApp(config);

require('./auth');