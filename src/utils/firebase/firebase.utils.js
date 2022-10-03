import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCJkLnm5OalmNDQgl9u4TH9hT3Qoi7pHqQ",
    authDomain: "crown-clothing-7d714.firebaseapp.com",
    projectId: "crown-clothing-7d714",
    storageBucket: "crown-clothing-7d714.appspot.com",
    messagingSenderId: "932585558367",
    appId: "1:932585558367:web:b8400e794a06cbef7ee6ea"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

const auth = getAuth();

const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();

const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {displayName, email, createdAt});

        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export {auth, signInWithGooglePopup, db, createUserDocumentFromAuth}