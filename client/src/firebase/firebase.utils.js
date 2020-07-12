import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCmw_tfQBrkr_cMBXgARux_yBNSib1uVQc",
  authDomain: "crwn-clothing-9f502.firebaseapp.com",
  databaseURL: "https://crwn-clothing-9f502.firebaseio.com",
  projectId: "crwn-clothing-9f502",
  storageBucket: "crwn-clothing-9f502.appspot.com",
  messagingSenderId: "574513471884",
  appId: "1:574513471884:web:8c2b97dd0bafdd54b676a9",
  measurementId: "G-YP9K2WL7MD",
};

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const firestore = firebase.firestore();

export default firebase;
