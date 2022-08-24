import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore, getDocs, deleteDoc, doc, updateDoc, where, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9tUn40bsrvqp6yo-6ybCQB7ByvzFPXFg",
    authDomain: "testapp-dcdb8.firebaseapp.com",
    projectId: "testapp-dcdb8",
    storageBucket: "testapp-dcdb8.appspot.com",
    messagingSenderId: "885670247341",
    appId: "1:885670247341:web:9de2914f7c1a15971f3f24",
    measurementId: "G-HH73M57D2X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const addTest = async (test) => {
    try {
        const docRef = await addDoc(collection(db, "test"), test);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export const deleteTests = async (ids) => {
    ids.forEach((id) => deleteDoc(doc(db, "test", id)))
}

export const addToSuite = async (ids) => {
    ids.forEach((id) => updateDoc(doc(db, "test", id), { isSuite: true }))
}

export const getTests = async (filterBy, sortBy) => {
    let collectionRef = query(collection(db, "test"))
    if (filterBy) {
        Object.keys(filterBy).forEach(fieldName => {
            const { op, value } = filterBy[fieldName];
            if (op === 'start with') {
                console.log(fieldName);
                const end = value.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1),);
                collectionRef = query(collectionRef, where(`${fieldName.toLowerCase()}`, '>=', value), where(`${fieldName.toLowerCase()}`, '<', end))
            } else {
                collectionRef = query(collectionRef, where(`${fieldName.toLowerCase()}`, op, value))
            }
        })
    } if (sortBy) {
        collectionRef = query(collectionRef, orderBy("title", sortBy))
    }
    const querySnapshot = await getDocs(collectionRef)
    const tests = []
    querySnapshot.forEach((doc) => {
        tests.push({ id: doc.id, ...doc.data() })
    });
    return tests
}

export const getSuites = async (filterBy, sortBy) => {
    let collectionRef = query(collection(db, "test"), where("isSuite", "==", true))
    if (filterBy) {
        Object.keys(filterBy).forEach(fieldName => {
            const { op, value } = filterBy[fieldName];
            if (op === 'start with') {
                const end = value.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1),);
                collectionRef = query(collectionRef, where(`${fieldName.toLowerCase()}`, '>=', value), where(`${fieldName.toLowerCase()}`, '<', end))
            } else {
                collectionRef = query(collectionRef, where(`${fieldName.toLowerCase()}`, op, value))
            }
        })
    } if (sortBy) {
        collectionRef = query(collectionRef, orderBy("title", sortBy))
    }
    const querySnapshot = await getDocs(collectionRef);
    const suites = []
    querySnapshot.forEach((doc) => {
        suites.push({ id: doc.id, ...doc.data() })
    });
    return suites
}

export const removeFromSuite = async (ids) => {
    ids.forEach((id) => updateDoc(doc(db, "test", id), { isSuite: false }))
}

// export const getSortTests = async (sortBy) => {
  
//     const collectionRef = query(collection(db, "test"), orderBy("title", sortBy))
//     const querySnapshot = await getDocs(collectionRef)
//     const tests = []
//     querySnapshot.forEach((doc) => {
//         tests.push({ id: doc.id, ...doc.data() })
//     });
//     return collectionRef
// }