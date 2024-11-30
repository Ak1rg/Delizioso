// const express = require('express');
// const admin = require("firebase-admin");
// const cors = require('cors');
// require('dotenv').config({ path: '.env.server' }); 

// const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://your-project-id.firebaseio.com',
// });

// const app = express();
// app.use(cors()); 
// app.use(express.json());

// app.get('/api/data', async (req, res) => {
//     try {
//         const db = admin.firestore();
//         const snapshot = await db.collection('your-collection').get();
//         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         res.json(data);
//     } catch (error) {
//         console.error('Ошибка:', error);
//         res.status(500).send('Ошибка сервера');
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Сервер запущен на http://localhost:${PORT}`);
// });
