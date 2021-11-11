import { firebaseConfig } from './../../firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore'
const environment = {
  production: false,
  firebaseConfig,
};
const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

export{ db, environment }
