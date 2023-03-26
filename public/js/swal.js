function confirmacion(id) {
    Swal.fire({
        title: 'Seguro de eliminar el registro?',
        text: "Se elminara permanentemente!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = '/borrar/' + id
        }
    })
}