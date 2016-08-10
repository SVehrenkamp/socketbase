import Chat from './sockets';

//Instantiate Chat Object
const socket = new WebSocket("ws://localhost:3100/socket");
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');

const chat = new Chat(socket, chatWindow, chatForm);
chat.init();
