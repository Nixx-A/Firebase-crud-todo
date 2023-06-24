// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { collection, getFirestore, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPjLyNHsqo7dBFNVYZbOy30jlkSA0GEmQ",
  authDomain: "primer-firebase-crud-js.firebaseapp.com",
  projectId: "primer-firebase-crud-js",
  storageBucket: "primer-firebase-crud-js.appspot.com",
  messagingSenderId: "597014381177",
  appId: "1:597014381177:web:be9e8d4869522895260aa8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTasks = (title, description) => addDoc(collection(db, 'tasks'), { title, description })

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id)) 

export const getTask = id => getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields)