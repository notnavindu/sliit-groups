import { browser } from '$app/env';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBr2stm1Pe_-Hyq3RabD5ag4QSw1qGdxRw',
	authDomain: 'sliit-groups.firebaseapp.com',
	projectId: 'sliit-groups',
	storageBucket: 'sliit-groups.appspot.com',
	messagingSenderId: '793707004276',
	appId: '1:793707004276:web:50ca7a46071042abdf6c21',
	measurementId: 'G-BLL4CR2CRW'
};

// Initialize Firebase
const app = browser && initializeApp(firebaseConfig);

export const auth = browser ? getAuth(app) : null;
export const firestore = browser ? getFirestore(app) : null;
export const analytics = browser && getAnalytics(app);
