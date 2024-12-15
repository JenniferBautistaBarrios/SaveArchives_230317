// Seleccionar todos los formularios con el id 'deleteForm'
document.querySelectorAll('#deleteForm').forEach(form => {
    // Añadir un evento de submit a cada formulario
    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Prevenir el envío tradicional del formulario

        // Solicitar confirmación del usuario antes de eliminar
        const confirmacion = confirm('¿Estás seguro de que deseas eliminar este archivo?');
        if (!confirmacion) return;

        // Obtener los datos del formulario
        const formData = new FormData(this);
        const nombre = formData.get('nombre');

        try {
            // Enviar solicitud de eliminación al servidor
            const response = await fetch('/archives/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre }),
            });

            // Convertir la respuesta a JSON
            const result = await response.json();

            // Mostrar mensaje de éxito y eliminar el nodo del DOM
            if (result.success) {
                alert(result.message); // Muestra un mensaje de éxito
                this.closest('.flex.items-center').remove(); // Elimina el nodo de la vista
                // Opcional: Recargar la página después de unos segundos
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                alert('Error al eliminar el archivo: ' + result.message);
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Ocurrió un error al intentar eliminar el archivo.');
        }
    });
});
