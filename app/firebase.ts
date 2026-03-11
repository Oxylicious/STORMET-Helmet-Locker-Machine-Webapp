import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getMessaging, isSupported } from "firebase/messaging"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7g7gypphmZ4EbEKscMQ9LKHye6xRLy_o",
  authDomain: "helmet-machine.firebaseapp.com",
  projectId: "helmet-machine",
  storageBucket: "helmet-machine.firebasestorage.app",
  messagingSenderId: "870470016722",
  appId: "1:870470016722:web:6fa983b4338ab17c7a570b"
};;

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const messaging = (async () => {
  try {
    const isSupportedBrowser = await isSupported()
    if (isSupportedBrowser) {
      return getMessaging(app)
    }
    return null
  } catch (err) {
    console.log(err)
    return null
  }
})()
