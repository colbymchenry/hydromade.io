import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, updateEmail, updatePassword, sendEmailVerification, deleteUser as deleteUserAccount } from "firebase/auth";
import { collection, addDoc, doc, getDoc, query, where, getDocs, collectionGroup, setDoc, serverTimestamp, deleteDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBtpwuNWUE1LN-kWlwMANGLoFg_hVnxlzU",
    authDomain: "hydromade-io.firebaseapp.com",
    projectId: "hydromade-io",
    storageBucket: "hydromade-io.appspot.com",
    messagingSenderId: "784118829449",
    appId: "1:784118829449:web:b503603308e21049ead158"
};


export let firebaseApp;

try {
    firebaseApp = initializeApp(firebaseConfig)
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/duplicate-app/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack)
    }
  }
  

export const firebaseDb = getFirestore(firebaseApp)
export const firebaseAuth = getAuth();

export const createUser = async (email, password) => await createUserWithEmailAndPassword(firebaseAuth, email, password);

export const deleteUser = async ({user}) => await deleteUserAccount(user);

export const updateUser = async ({user}, data, newEmail, newPassword) => {
    if (newEmail) {
        await updateEmail(user, newEmail);
    }
    if (newPassword) {
        await updatePassword(user, newPassword);
    }
    await updateProfile(user, data);
}

export const sendVerificationEmail = async ({user}) => await sendEmailVerification(user);

export const sendPasswordResetEmail = async (email) => await sendPasswordResetEmail(firebaseAuth, email);

export const signinUser = async (email, password) => await signInWithEmailAndPassword(firebaseAuth, email, password);

export const signoutUser = async () => await signOut(firebaseAuth);

export const getFirestoreCollection = async (collectionName) => {
    const querySnapshot = await getDocs(query(collection(firebaseDb, collectionName)));
    let result = []
    querySnapshot.forEach((doc) => {
        result.push({...doc.data(), id: doc.id})
    });
    return result;
}

export const runSingleQuery = async (collectionName, id) => {
    const docRef = doc(firebaseDb, collectionName, id)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return false;
    }
}

export const runQuery = async (collectionName, ...where) => {
    const q = query(collection(firebaseDb, collectionName), ...where);
    const querySnapshot = await getDocs(q);
    let result = []
    querySnapshot.forEach((doc) => {
        result.push({...doc.data(), id: doc.id})
      });
    return result;
}

export const runQueryGroup = async (collectionName, ...where) => {
    const q = query(collectionGroup(firebaseDb, collectionName), ...where);
    const querySnapshot = await getDocs(q);
    let result = []
    querySnapshot.forEach((doc) => {
        result.push({...doc.data(), id: doc.id})
      });
    return result;
}

export const runSet = async (collectionName, id, data) => {
    await setDoc(doc(firebaseDb, collectionName, id), data);
    await updateDoc(doc(firebaseDb, collectionName, id), {
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
    });
}

export const runInsert = async (collectionName, data) => {
    const docRef = await addDoc(collection(firebaseDb, collectionName), data);
    await updateDoc(doc(firebaseDb, collectionName, docRef.id), {
        id: docRef.id,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp()
    });
    return docRef.id;
}

export const runUpdate = async (collectionName, id, data) => {
    await updateDoc(doc(firebaseDb, collectionName, id), data);
    await updateDoc(doc(firebaseDb, collectionName, id), {
        updated_at: serverTimestamp()
    });
}

export const runDelete = async (collectionName, id) => {
    await deleteDoc(doc(firebaseDb, collectionName, id));
}