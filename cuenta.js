// 1. VALIDACIÓN INMEDIATA (Redirige antes de mostrar nada si no hay sesión)
const sesionActiva = localStorage.getItem('sesion_activa');

if (sesionActiva !== 'true') {
  alert('Acceso restringido: Debes iniciar sesión o registrarte primero.');
  window.location.href = 'iniciosesion.html';
}

// 2. CARGA DE DATOS E INTERACTIVIDAD
document.addEventListener('DOMContentLoaded', function() {
  const nombre = localStorage.getItem('usuario_nombre') || 'No disponible';
  const correo = localStorage.getItem('usuario_correo') || 'No disponible';
  const cedula = localStorage.getItem('usuario_cedula') || 'No disponible';
  const expedicion = localStorage.getItem('usuario_expedicion') || 'No disponible';
  const nacimiento = localStorage.getItem('usuario_nacimiento') || 'No disponible';
  const telefono = localStorage.getItem('usuario_telefono') || 'No disponible';
  const ciudad = localStorage.getItem('usuario_ciudad') || 'No disponible';
  const saldo = localStorage.getItem('usuario_saldo') || '0';

  // Renderizar valores en pantalla usando los IDs correctos de cuenta.html
  if (document.getElementById('lblNombre')) document.getElementById('lblNombre').textContent = nombre;
  if (document.getElementById('lblCorreo')) document.getElementById('lblCorreo').textContent = correo;
  if (document.getElementById('lblCedula')) document.getElementById('lblCedula').textContent = cedula;
  if (document.getElementById('lblExpedicion')) document.getElementById('lblExpedicion').textContent = expedicion;
  if (document.getElementById('lblNacimiento')) document.getElementById('lblNacimiento').textContent = nacimiento;
  if (document.getElementById('lblTelefono')) document.getElementById('lblTelefono').textContent = telefono;
  if (document.getElementById('lblCiudad')) document.getElementById('lblCiudad').textContent = ciudad;
  
  // Formatear saldo a COP
  const saldoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(saldo);
  if (document.getElementById('lblSaldo')) document.getElementById('lblSaldo').textContent = saldoFormateado;

  // Evento Cierre de Sesión
  const btnCerrar = document.getElementById('btnCerrarSesion');
  if (btnCerrar) {
    btnCerrar.addEventListener('click', function() {
      localStorage.clear();
      alert('Has cerrado sesión correctamente.');
      window.location.href = 'iniciosesion.html';
    });
  }
});

// --- Inserción dinámica de botón Admin en cuenta.js ---
document.addEventListener('DOMContentLoaded', function() {
  const esAdmin = localStorage.getItem('es_admin');

  if (esAdmin === 'true') {
    const tarjetaRegistro = document.querySelector('.card-registro');
    
    if (tarjetaRegistro) {
      const enlaceAdmin = document.createElement('a');
      enlaceAdmin.href = 'admin.html';
      enlaceAdmin.className = 'btn-submit';
      enlaceAdmin.style.backgroundColor = '#9333ea';
      enlaceAdmin.style.marginTop = '10px';
      enlaceAdmin.style.textDecoration = 'none';
      enlaceAdmin.style.display = 'flex';
      enlaceAdmin.style.alignItems = 'center';
      enlaceAdmin.style.justifyContent = 'center';
      enlaceAdmin.style.gap = '8px';
      enlaceAdmin.innerHTML = '<i class="fas fa-shield-alt"></i> Ir al Panel de Administración';

      const btnCerrarSesion = document.getElementById('btnCerrarSesion');
      if (btnCerrarSesion) {
        tarjetaRegistro.insertBefore(enlaceAdmin, btnCerrarSesion);
      } else {
        tarjetaRegistro.appendChild(enlaceAdmin);
      }
    }
  }
});