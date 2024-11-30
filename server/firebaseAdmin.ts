// import {apps,initializeApp,credential} from 'firebase-admin';
// import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

// const client = new SecretManagerServiceClient();

// if (!apps.length) {
//     const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);
//     initializeApp({
//         credential: credential.cert(serviceAccount),
//         databaseURL: 'https://delizioso-c717e.firebaseio.com', 
//     });
//     console.log('Firebase Admin SDK успешно инициализирован');
// }

// export default admin; 