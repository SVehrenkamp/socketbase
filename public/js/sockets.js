class Chat {
  constructor(socket, chatWindow, chatForm) {
    this.socket = socket;
    this.chatWindow = chatWindow;
    this.chatForm = chatForm;
    console.log(this.chatForm);
  }
  //Initialize Socket connection and listeners
  init() {
    this.bindSocketListeners();
    this.bindEvents();
  }
  bindSocketListeners() {
    //On Open Event
    this.socket.onopen = (event) => {
      let msg = {type: "init", msg: "plz connect me"};
      this.socket.send(JSON.stringify(msg));
    };

    //On Message Event
    this.socket.onmessage =  (event) => {
      let message = JSON.parse(event.data);
      switch(true) {
        case message.type === 'chat':
          this.updateChat(message);
          break;
      }
    }

  }
  bindEvents() {
    let button = this.chatForm.getElementsByTagName('button')[0];
    button.addEventListener('click', () => {
      this.sendMessage();
    });
  }
  //Update Chat Window
  updateChat(message) {
    console.log("MESSAGE", message);
    let div = document.createElement("DIV");
    let msg_template = `
      <p class="user">${message.user}:</p>
      <p class="message">${message.msg}</p>
    `;
    div.innerHTML = msg_template;
    div.className = "message-container";
    this.chatWindow.appendChild(div);
  }
  //Send Message
  sendMessage() {
    let name = this.chatForm.querySelector('#name');
    let msg = this.chatForm.querySelector('#msg');
    let message = {type: "chat", user: name.value, msg: msg.value};

    this.updateChat(message);
    this.socket.send(JSON.stringify(message));
    msg.value = "";
  }
}
export default Chat;
