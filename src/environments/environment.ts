import { firebaseConfig } from './../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
const environment = {
  production: false,
  firebaseConfig,
};
const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export{ db, environment, auth }
