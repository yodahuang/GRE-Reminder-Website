var myfirebase = require('../index');

module.exports = function(successCallBack){
    var uiConfig = {
        'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        myfirebase.auth.GoogleAuthProvider.PROVIDER_ID,
        myfirebase.auth.FacebookAuthProvider.PROVIDER_ID,
        myfirebase.auth.TwitterAuthProvider.PROVIDER_ID,
        myfirebase.auth.GithubAuthProvider.PROVIDER_ID,
        myfirebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
        'callbacks': {
            'signInSuccess': function(currentUser, credential, redirectUrl) {
                successCallBack(currentUser.displayName, currentUser.uid);
                return false;
            }
        }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(myfirebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
    console.log("In auth js")
}