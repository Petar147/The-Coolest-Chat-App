export default class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("Chats");
    this.unsub; //bice undefined prilikom kreiranja objekta
  }

  get room() {
    return this._room;
  }

  set room(r) {
    this._room = r;
  }

  get username() {
    return this._username;
  }

  set username(u) {
    if (!u.trim().length) {
      this._username = "Anonymous";
    } else if (u.length > 1 && u.length < 11) {
      this._username = u;
    } else {
      this._username = "Anonymous";
    }
  }

  //update sobe
  updateRoom(ur) {
    this.room = ur;
    if (this.unsub) {
      this.unsub();
    }
  }

  async addChat(msg) {
    //Dodavanje trenutnog vremena, koji nam je potrebam za timestamp (created_at polje u dokumentu)
    let date = new Date();

    //kreiranje dokumenta/objekta koji prosledjujem bazi podataka
    let docChat = {
      message: msg,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(date), //kreira objekat od date objekta
    };

    let response = await this.chats.add(docChat); //Da sacuvam dokument u db
    return response; //vracamo promise i od njega mozemo potrazivati .then i .catch
  }

  //Pracenje poruka u bazi i ispis dodatih poruka
  getChats(callback) {
    this.unsub = this.chats
      .orderBy("created_at")
      .where("room", "==", this.room)
      .onSnapshot((snapshot) => { //real time listener
        let change = snapshot.docChanges();
        change.forEach((change) => {
          if (change.type == "added") {
            callback(change.doc.data());
          }
        });
      });
  }
}
