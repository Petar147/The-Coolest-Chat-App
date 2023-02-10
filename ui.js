export default class ChatUi {
  constructor(li) {
    this.li = li;
  }

  set li(l) {
    this._li = l;
  }

  get li() {
    return this._li;
  }

  templateLi(doc) {
    let date = doc.created_at.toDate();
    let now = new Date();
    let formattedTimestamp = "";

    if (date.toDateString() === now.toDateString()) {
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      formattedTimestamp = `${hours}:${minutes}`;
    } else {
      let day = date.getDate().toString().padStart(2, "0");
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let year = date.getFullYear();
      let hours = date.getHours().toString().padStart(2, "0");
      let minutes = date.getMinutes().toString().padStart(2, "0");
      formattedTimestamp = `${day}.${month}.${year} - ${hours}:${minutes}`;
    }

    let messageClass = "chatOld"; //1provera da li je chatOld ili chatNew
    // console.log(localStorage.username);

    if (localStorage.username === doc.username) {
      messageClass = "chatNew";
    }
    //1dodeli klasu
    let html = `
    <div class="${messageClass}">
    <span class="username">${doc.username}: </span>
    <span class="message">${doc.message}</span>
    <div class="date">${formattedTimestamp}</div>
    </div>
    `;
    this.li.innerHTML += html;
  }

  clearUl() {
    this.li.innerHTML = "";
  }
}
