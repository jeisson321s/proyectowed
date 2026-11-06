import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5dEiWhSrQ8bEEa_1c_tYLzw8MEeLAAj4",
  authDomain: "disenowed-6eb3b.firebaseapp.com",
  projectId: "disenowed-6eb3b",
  storageBucket: "disenowed-6eb3b.firebasestorage.app",
  messagingSenderId: "176191941008",
  appId: "1:176191941008:web:49dce9b511eb9993ab2b15"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const correo = document.getElementById('correo').value.trim();
      const password = document.getElementById('password').value.trim();

      try {
        // 1. Autenticar con Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, correo, password);
        const user = userCredential.user;

        // 2. Buscar datos adicionales del usuario en Firestore usando su UID
        const userDocRef = doc(db, "usuarios", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          alert('No se encontraron los datos del usuario en la base de datos.');
          return;
        }

        const userData = userDoc.data();

        // 3. Validar si la cuenta está bloqueada
        if (userData.bloqueado === true) {
          alert('Esta cuenta ha sido bloqueada por motivos de seguridad.');
          return;
        }

        // 4. Guardar datos completos en el navegador para evitar undefined en cuenta.js
        localStorage.setItem('sesion_activa', 'true');
        localStorage.setItem('usuario_id', user.uid);
        localStorage.setItem('usuario_nombre', userData.nombre || 'No disponible');
        localStorage.setItem('usuario_correo', userData.correo || correo);
        localStorage.setItem('usuario_cedula', userData.cedula || 'No disponible');
        localStorage.setItem('usuario_expedicion', userData.fechaExpedicion || userData.fecha_expedicion || 'No disponible');
        localStorage.setItem('usuario_nacimiento', userData.fechaNacimiento || userData.fecha_nacimiento || 'No disponible');
        localStorage.setItem('usuario_telefono', userData.telefono || 'No disponible');
        localStorage.setItem('usuario_ciudad', userData.ciudad || 'No disponible');
        localStorage.setItem('usuario_saldo', userData.saldo || 0);

        // 5. Redirección inteligente según el rol
        if (userData.rol === "admin" || userData.rol === "moderador") {
          localStorage.setItem('es_admin', userData.rol === "admin" ? 'true' : 'false');
          alert(`¡Bienvenido ${userData.rol === "admin" ? "Administrador" : "Moderador"}!`);
          window.location.href = 'admin.html';
        } else {
          localStorage.setItem('es_admin', 'false');
          alert('¡Inicio de sesión exitoso!');
          window.location.href = 'cuenta.html';
        }

      } catch (error) {
        console.error("Error al iniciar sesión: ", error.code, error.message);
        
        // Manejo de errores comunes de Firebase Auth
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          alert('Correo o contraseña incorrectos.');
        } else if (error.code === 'auth/too-many-requests') {
          alert('Demasiados intentos fallidos. Acceso temporalmente bloqueado.');
        } else {
          alert('Error al conectar con el servidor.');
        }
      }
    });
  }
});