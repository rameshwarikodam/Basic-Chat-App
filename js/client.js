const socket = io('http://localhost:5555');

const form = document.getElementById('send-container');
const msgInput = document.getElementById('msgInput');
const messageContainer = document.querySelector('.container');

var audio = new Audio('msgTone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left')
        audio.play();
}

// what to do when we submit the form
form.addEventListener('submit', (e) => {
    //page will not be reloaded
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = "";
})

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message} `, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'right');
});