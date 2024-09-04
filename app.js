import Chatroom from "./chat.js";
import ChatUi from "./ui.js";

//DOM
let general = document.getElementById("general");
let js = document.getElementById("js");
let homeworks = document.getElementById("homeworks");
let tests = document.getElementById("tests");
let rooms = [general, js, homeworks, tests];
let ul = document.querySelector("ul");
let send = document.getElementById("sendBtn");
let inputSend = document.getElementById("inputSend");
let update = document.getElementById("update");
let inputUpdate = document.getElementById("inputUpdate");
let newUser = document.getElementById("newUser");

//provera da li je prazan lokal storage ili ne
//ucitavanje sobe (kreiranje objekta cetrum klase)
let chatroom;
if (!localStorage.getItem("username")) {
  chatroom = new Chatroom("#js", "Anonymous");
} else {
  chatroom = new Chatroom("#js", `${localStorage.getItem("username")}`);
}

//promenljiva koja hvata u kojoj smo sobi
let currentRoom;

let chatUi1 = new ChatUi(ul); // kreiranje objekta ChatUi klase

chatroom.getChats((data) => {
  chatUi1.templateLi(data);
});
//napravi nad jednim roditeljskim elementom event listener umesto na rooms
rooms.forEach((room) => {
  room.addEventListener("click", () => {
    //aktivna klasa
    // Ukloniti klasu "active" sa prethodno aktivnog dugmeta
    rooms.forEach((room) => {
      room.classList.remove("active");
    });
    // Dodati klasu "active" na trenutno kliknuto dugme
    room.classList.add("active");

    currentRoom = room.innerText;
    //2. update sobe na koju je kliknuto
    chatroom.updateRoom(currentRoom);
    //3. izbrisati sve poruke sa ekrana
    chatUi1.clearUl();
    //4 prikazi cetove
    chatroom.getChats((data) => {
      chatUi1.templateLi(data);
    });
  });
});

//kada je send, posalji poruku
send.addEventListener("click", () => {
  chatroom
    .addChat(inputSend.value)
    .then(() => (inputSend.value = ""))
    .catch((err) => console.log(err));
});

//promeni nickname
update.addEventListener("click", () => {
  if (inputUpdate.value.length > 1 && inputUpdate.value.length < 11) {
    chatroom.username = inputUpdate.value;
    location.reload();
    localStorage.setItem("username", inputUpdate.value);
    newUser.innerHTML = `New username: ${inputUpdate.value}`;
    newUser.style.display = "inline";

    setTimeout(function () {
      newUser.innerHTML = "";
      inputUpdate.value = "";
    }, 3000);
  } else {
    alert(
      "Username cannot consist only of white spaces and username has to be between 2 and 10 characters long"
    );
    inputUpdate.value = "";
  }
});
