async function actualizarMascota(event, id) {
    event.preventDefault()

    const form = document.querySelector(`#form-${id}`)
    const formData = new FormData(form)

    const res = await fetch(`/mascotas/${id}`, {
        method: 'PUT',
        body: formData
    })

    const data = await res.json()

    if (data.ok) location.href = '/'
    else alert('Error al actualizar')
}

async function eliminarMascota(id) {
    if (!confirm('¿Seguro deseas eliminar a esta mascota?')) return

    const res = await fetch(`/mascotas/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (data.ok) location.reload()
    else alert("Error al eliminar")
}