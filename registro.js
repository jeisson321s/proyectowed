import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuración de tu proyecto PlayExpert
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

const registroForm = document.getElementById('registroForm');
const inputNacimiento = document.getElementById('fecha_nacimiento');
const mensajeEdad = document.getElementById('mensaje_edad');

// Validar mayoría de edad en tiempo real
if (inputNacimiento && mensajeEdad) {
  inputNacimiento.addEventListener('change', () => {
    const fechaNac = new Date(inputNacimiento.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }

    if (edad < 18) {
      mensajeEdad.textContent = "Debes ser mayor de 18 años para registrarte en PlayExpert.";
      mensajeEdad.style.color = "#ef4444";
    } else {
      mensajeEdad.textContent = "¡Edad verificada con éxito!";
      mensajeEdad.style.color = "#22c55e";
    }
  });
}

if (registroForm) {
  registroForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const fechaExp = document.getElementById('fecha_expedicion').value.trim();
    const fechaNac = document.getElementById('fecha_nacimiento').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;

      // 2. Guardar datos adicionales en Firestore usando el UID exacto
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        correo: correo,
        cedula: cedula,
        fechaExpedicion: fechaExp,
        fechaNacimiento: fechaNac,
        telefono: telefono,
        ciudad: ciudad,
        saldo: 0,
        rol: "cliente",
        bloqueado: false,
        creadoEn: new Date()
      });

      alert('¡Registro exitoso en PlayExpert!');
      window.location.href = 'iniciosesion.html';

    } catch (error) {
      console.error("Error en el registro:", error.code, error.message);
      
      if (error.code === 'auth/email-already-in-use') {
        alert('Este correo ya está registrado en el sistema.');
      } else if (error.code === 'auth/weak-password') {
        alert('La contraseña debe tener al menos 6 caracteres.');
      } else {
        alert("Hubo un error al registrarse: " + error.message);
      }
    }
  });
}