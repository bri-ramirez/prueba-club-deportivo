import { successMessage, errorMessage } from "./notifyHelper.js";

const API_URL = 'http://localhost:4000';
let deportes = [];

$(document).ready(function () {
  getData();
});

$('#btn-add-sport').click(function () {
  agregar();
});

$('#btn-edit-sport').click(function () {
  const id = $(this).data('id');
  edit(id);
});

function getData() {
  $('#cuerpo').html('');

  axios.get(`${API_URL}/deportes`).then((data) => {
    deportes = data.data;

    deportes.forEach((deporte, index) => {
      $('#cuerpo').append(`
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${deporte.name}</td>
          <td>${deporte.price}</td>
          <td>
            <button class="btn btn-warning btn-edit" data-id='${
              deporte.id
            }' data-toggle="modal" data-target="#exampleModal">Editar</button>
            <button class="btn btn-danger btn-delete" data-id='${
              deporte.id
            }'>Eliminar</button>
          </td>
        </tr>
        `);
    });

    $('.btn-edit').click(function () {
      var id = $(this).data('id');
      preEdit(id);
    });

    $('.btn-delete').click(function () {
      var id = $(this).data('id');
      eliminar(id);
    });
  });
}

function preEdit(id) {
  let deporte = deportes.find((deporte) => deporte.id == id);

  $('#nombreModal').val(deporte.name);
  $('#precioModal').val(deporte.price);
  $('#btn-edit-sport').attr('data-id', id);
}

function agregar() {
  let nombre = $('#nombre').val();
  let precio = $('#precio').val();

  if (nombre === '' || precio === '') {
    errorMessage('Los campos no pueden estar vacíos.');
    return;
  }

  if (isNaN(precio)) {
    errorMessage('El precio debe ser un número.');
    return;
  }

  axios
    .post(`${API_URL}/deportes`, {
      name: nombre,
      price: precio,
    })
    .then((data) => {
      getData();
      successMessage('EL deporte se ha registrado con éxito');
    });
  $('#exampleModal').modal('hide');
}

function edit(id) {
  let nombre = $('#nombreModal').val();
  let precio = $('#precioModal').val();

  if (nombre === '' || precio === '') {
    errorMessage('Los campos no pueden estar vacíos.');
    return;
  }

  if (isNaN(precio)) {
    errorMessage('El precio debe ser un número.');
    return;
  }

  axios
    .patch(`${API_URL}/deportes/${id}`, {
      name: nombre,
      price: precio,
    })
    .then(async (data) => {
      getData();
      successMessage('Se ha editado el deporte con exito');
    });

  $('#exampleModal').modal('hide');
};

function eliminar(id) {
  axios.delete(`${API_URL}/deportes/${id}`).then((data) => {
    getData();
    successMessage('Se ha eliminado el deporte con exito');
  });

  $('#exampleModal').modal('hide');
}
