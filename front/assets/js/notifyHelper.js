export const successMessage = (message) => {
  $.notify(message, {
    position: 'top',
    style: 'happyblue',
  });
}

export const errorMessage = (message) => {
  $.notify(message, {
    position: 'top',
    style: 'happyblue',
    className: 'danger',
  });
}