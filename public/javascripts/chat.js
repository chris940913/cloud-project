var socket = io();
var chatUsername = document.querySelector('#chat-username');
var chatMessage = document.querySelector('#chat-message');

socket.on('connect', function() {
  var chatForm = document.forms.chatForm;

  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      socket.emit('postMessage',{
        username: chatUsername.value,
        message: chatMessage.value,
      });
      chatMessage.value='';
      chatMessage.focus();
    }); //chatform event

    socket.on('updateMessages', function(data) {
      showMessage(data);
    }); //updateMessages
  } //chatform
}); //socket



function showMessage(d) {
  var chatDisplay = document.querySelector('.chat-display');
  var newMsg = document.createElement('p');
  newMsg.className = 'bg-success chat-text';
  newMsg.innerHTML = '<strong>' + d.username + '</strong>: ' + d.message;
  chatDisplay.insertBefore(newMsg, chatDisplay.firstChild);
}
