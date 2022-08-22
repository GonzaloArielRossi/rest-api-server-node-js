//HTML refs
const lblonline = document.querySelector('#lblonline');
const lbloffline = document.querySelector('#lbloffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSubmit = document.querySelector('#btnSubmit');

// Socket handling
const socket = io();

socket.on('connect', () => {
  lbloffline.style.display = 'none';
  lblonline.style.display = '';
});

socket.on('disconnect', () => {
  lblonline.style.display = 'none';
  lbloffline.style.display = '';
});

socket.on('recieve-message', (payload) => {
  console.log(payload);
});

btnSubmit.addEventListener('click', () => {
  const message = txtMessage.value;
  const payload = {
    message,
    id: '',
    date: new Date().getTime()
  };
  socket.emit('send-message', payload);
});
