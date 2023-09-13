import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

const fireBaseConfig = {
   apiKey: "AIzaSyDHrXz52G-Rqj8oZgurg0K-RZDrzsK2EP0",
   authDomain: "worki-cf273.firebaseapp.com",
   projectId: "worki-cf273",
   storageBucket: "worki-cf273.appspot.com",
   messagingSenderId: "552850805881",
   appId: "1:552850805881:web:731a7c67ecbe45a293b0a8",
   measurementId: "G-LVS4S3Y6Y0"
}

const app = initializeApp(fireBaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
