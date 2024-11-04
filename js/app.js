document.addEventListener('DOMContentLoaded', () => {

  const email = JSON.parse(localStorage.getItem('emailDraft')) || {
    email: "",
    asunto: "",
    mensaje: ""
  };
  
  const maxCaracteres = 250;

  // Elementos del DOM
  const inputEmail = document.querySelector('#email');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = formulario.querySelector('button[type="submit"]');
  const btnReset = formulario.querySelector('button[type="reset"]');
  const spinner = document.querySelector('#spinner'); // Spinner para mostrar durante el envío.
  const contador = document.querySelector('#contador'); // Contador de caracteres.

  // Eventos de entrada a los campos para validar y actualizar el contador.
  inputEmail.addEventListener('input', validar);
  inputAsunto.addEventListener('input', validar);
  inputMensaje.addEventListener('input', validar);
  inputMensaje.addEventListener('input', actualizarContador); // Actualiza el contador de caracteres al escribir.

  // eventos para el envío del formulario y el botón de restablecimiento.
  formulario.addEventListener('submit', enviarEmail);
  btnReset.addEventListener('click', resetFormulario);

  /**
   * Función que se ejecuta al enviar el formulario.
   * @param {Event} e - El evento de envío del formulario.
   */
  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.remove('hidden');
    btnSubmit.disabled = true;

    // Simula un retraso para el envío del email.
    setTimeout(() => {
      spinner.classList.add('hidden');
      resetFormulario();

      // Mostrar la alerta de éxito
      const alerta = document.querySelector("#alerta");
      alerta.classList.remove('hidden'); // Muestra la alerta
      alerta.textContent = "Mensaje enviado correctamente"; // Cambia el texto de la alerta
      setTimeout(() => {
        alerta.classList.add('hidden'); // Oculta la alerta después de 3 segundos
      }, 3000);
    }, 3000);
  }

  /**
   * Función para validar los campos del formulario.
   * @param {Event} e - El evento de entrada en el campo del formulario.
   */
  function validar(e) {
    const { id, value } = e.target; // Desestructura el ID y valor del campo que disparó el evento.

    // Verifica si el campo está vacío.
    if (value.trim() === "") {
      mostrarAlerta(`El campo ${id} es obligatorio`, e.target.parentElement);
      email[id] = "";
      comprobarEmail();
      return;
    }

    // Validación específica para el campo de email.
    if (id === "email" && !validarEmail(value)) {
      mostrarAlerta(`El email no es válido`, e.target.parentElement);
      email[id] = "";
      comprobarEmail();
      return;
    }

    // Validación para el campo de asunto.
    if (id === "asunto" && value.trim().length < 5) {
      mostrarAlerta(`El asunto debe tener al menos 5 caracteres`, e.target.parentElement);
      email[id] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);
    email[id] = value.trim();
    localStorage.setItem("emailDraft", JSON.stringify(email)); // Guarda el borrador en Local Storage.
    comprobarEmail();
  }

  /**
   * Función para mostrar alertas en la interfaz.
   * @param {string} mensaje - El mensaje que se mostrará en la alerta.
   * @param {HTMLElement} referencia - El elemento donde se mostrará la alerta.
   * @param {string} [tipo="error"] - El tipo de alerta ('error' o 'exito').
   */
  function mostrarAlerta(mensaje, referencia, tipo = "error") {

    limpiarAlerta(referencia);
    const alerta = document.createElement("p");
    alerta.textContent = mensaje; // Asigna el mensaje a la alerta.

    alerta.classList.add(tipo === "error" ? "bg-red-600" : "bg-green-500", "text-white", "p-2", "text-center");
    referencia.appendChild(alerta);
  }

  /**
   * Función para limpiar alertas en un elemento.
   * @param {HTMLElement} referencia - El elemento del que se limpiarán las alertas.
   */
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".bg-red-600") || referencia.querySelector(".bg-green-500");
    if (alerta) alerta.remove(); // Elimina la alerta si existe.
  }

  /**
   * Función para validar el formato del email.
   * @param {string} email - La dirección de correo electrónico a validar.
   * @returns {boolean} - Devuelve true si el email es válido, false en caso contrario.
   */
  function validarEmail(email) {
    // Expresión regular para validar email.
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    return regex.test(email);
  }
  /**
   * Función para habilitar o deshabilitar el botón de envío según el estado del formulario.
   */
  function comprobarEmail() {
    // Deshabilita el botón si hay algún campo vacío.
    btnSubmit.disabled = Object.values(email).some(value => value === "");
    btnSubmit.classList.toggle("opacity-50", btnSubmit.disabled); // Cambia la opacidad del botón según su estado.
  }

  /**
   * Función para restablecer el formulario a su estado inicial.
   */
  function resetFormulario() {
    formulario.reset()
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    localStorage.removeItem("emailDraft");
    actualizarContador();
    comprobarEmail();
  }

  /**
   * Función para actualizar el contador de caracteres restantes en el campo de mensaje.
   */
  function actualizarContador() {
    const caracteresRestantes = maxCaracteres - inputMensaje.value.length;
    contador.textContent = `Quedan ${caracteresRestantes} caracteres`;
  }

  /**
   * Función para restaurar el borrador al cargar la página.
   */
  function restaurarBorrador() {
    inputEmail.value = email.email || "";
    inputAsunto.value = email.asunto || "";
    inputMensaje.value = email.mensaje || "";
    actualizarContador();
    comprobarEmail();
  }

  restaurarBorrador();
});