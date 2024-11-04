# Envío de Email

## Características principales de la aplicación

### 1. Validación en tiempo real

- Validación automática de los campos email, asunto y mensaje
mientras el usuario escribe.
- Verificación de formato en el campo email para asegurar que la dirección es válida.
- Validación adicional para asegurar que el campo asunto tiene al menos 5 caracteres.

### 2. Control de límite de caracteres en el mensaje

- El campo mensaje tiene un límite de 250 caracteres.
- Se muestra un contador de caracteres que se actualiza en tiempo real.

### 3. Almacenamiento de Borradores en Local Storage

- El formulario guarda automáticamente el borrador en LocalStorage, por lo que un usuario
puede cerrar la página y retomar la escritura después sin perder el progreso.
- Al recargar la página se restauran los datos guardados.

### 4. Alertas Visuales

- Alertas de error en rojo para campos obligatorios o incorrectos y mensajes de éxito en verde
cuando el formulario se envía correctamente.
- Las alertas se muestran junto a los campos respectivos para facilitar la corrección de errores.

### 5. Botón de restablecimiento

- Botón que permite al usuario limpiar todos los datos del formulario y eliminar el borrador
guardado en LocalStorage.

## Mejoras con respecto al código legado

### 1. Persistencia de datos en LocalStorage

- Antes: No se guardaban los datos del formulario en ningún sistema de almacenamiento.
- Ahora: los datos se almacenan automáticamente en LocalStorage.

### 2. Control de límite de caracteres con contador dinámico

- Antes: No había límite ni control de caracteres en el campo mensaje.
- Ahora: El campo de mensaje cuenta con un límite de 250 caracteres y un contador que se
actualiza en tiempo real.

### 3. Validaciones adicionales en los campos

- Antes: Solo se validaba que los campos no estuvieran vacíos y el formato de correo
electrónico.
- Ahora: Se agregaron reglas adicionales como requerir al menos 5 caracteres en el campo asunto
para asegurar una mejor calidad en la entrada de datos.

### 4. Alertas visuales mejoradas

- Antes: Las alertas se mostraban solo en color rojo y se eliminaban sin una indicación clara
de éxito.
- Ahora: Se implementaron alertas verdes para confirmar que el mensaje fue enviado exitosamente, y
se muestran alertas específicas y claras para cada campo, mejorando la claridad en la interfaz 
de usuario.

### 5. Optimización del botón de restablecimiento

- Antes: El botón de "restablecer" limpiaba el formulario pero no gestionaba el borrador.
- Ahora: Al hacer click en "restablecer" se limpia tanto el formulario como el borrador guardado
en LocalStorage, asegurando un reinicio completo del formulario.