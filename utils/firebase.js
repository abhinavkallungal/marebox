import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  try {
    var firebaseConfig = {

      apiKey: "AIzaSyAtoTDjYoEYSFamfmxMYgOR0TmjImkMMP4",
      authDomain: "shopmarebox.firebaseapp.com",
      projectId: "shopmarebox",
      storageBucket: "shopmarebox.appspot.com",
      messagingSenderId: "36162000670",
      appId: "1:36162000670:web:5e813c0ce659cf75ad1b0f",
      measurementId: "G-NDP1KS81W8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  } catch (error) {
    console.log('Firebase initialization error', error.stack);
  }
}
const app = firebase.app();
const auth = firebase.auth();
const storage = firebase.storage();
const now = firebase.firestore.Timestamp.now();
export { app, auth, storage, now };
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(');
