const socket = io('http://localhost:8080');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const email = document.getElementById('email');

const messages = [];

msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    sendMessage({ email: email.value, text: e.target.value });
    e.target.value = '';
  } else {
    sendIsTypingMessesge(email.value);
  }
});

function loadData(data) {
  let messages = '';
  data.map((message) => {
    messages += ` <li class="bg-secondary p-2 rounded mb-2 text-light">
      <span class="fw-bolder">${message.email}</span>
      ${message.text}
    </li>`;
  });
  msgCont.innerHTML = messages;
}

function sendMessage(message) {
  socket.emit('sendMessege', message);
}
socket.on('recMessege', (message) => {
  messages.push(message);
  loadData(messages);
});
socket.on('recIsTyping', (typingEmail) => {
  if (email.value !== typingEmail)
    document.getElementById(
      'isTyping',
    ).innerHTML = `${typingEmail} is typing...`;
});

function sendIsTypingMessesge(email) {
  socket.emit('isTyping', email);
}
