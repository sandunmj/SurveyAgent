const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.database();
// import database from '@react-native-firebase/database';
// import {firebase} from '@react-native-firebase/auth';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.emailVerify = functions.https.onRequest((request, response) => {
  let email = request.query.email;
  let users = [];
  db.ref(`userList/`).once('value', function(snapshot) {
    users = snapshot.val();
    for (var item of users) {
      if (item.email === email) {
        response.send(true);
      }
    }
    response.send(false);
  });
  // for (var item of users) {
  //   console.log(item);
  //   if (item.email === email) {
  //     console.log(true);
  //   }
  // }
  // console.log(email);
});
