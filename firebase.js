// Importa las funciones necesarias desde la versión unificada 10.8.0 de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración oficial de tu proyecto PlayExpert
const firebaseConfig = {
  apiKey: "AIzaSyB5dEiWhSrQ8bEEa_1c_tYLzw8MEeLAAj4",
  authDomain: "disenowed-6eb3b.firebaseapp.com",
  projectId: "disenowed-6eb3b",
  storageBucket: "disenowed-6eb3b.firebasestorage.app",
  messagingSenderId: "176191941008",
  appId: "1:176191941008:web:49dce9b511eb9993ab2b15"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);