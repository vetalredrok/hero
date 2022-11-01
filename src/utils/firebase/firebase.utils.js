import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';
//
//
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
    prompt: 'select_account',
});

const auth = getAuth();
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

const db = getFirestore();  // database

const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit()
    console.log('done');

};

const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
};

const createAuthUserWithEmailAndPassword = async (email, password) =>{

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

const signInAuthUserWithEmailAndPassword = async (email, password) =>{

    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

const signOutUser = async () => await signOut(auth);

const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export {auth, signInWithGooglePopup, db, createUserDocumentFromAuth, createAuthUserWithEmailAndPassword, signInAuthUserWithEmailAndPassword, signOutUser, onAuthStateChangedListener, addCollectionAndDocuments, getCategoriesAndDocuments};

