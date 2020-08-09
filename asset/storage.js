const cache_key = "myUserName";
const cache_mode = "myMode";

const cache_Pr10 = "myNumberPr10";
const cache_Pr100 = "myNumberPr100";
const cache_Fr10 = "myNumberFr10";
const cache_Fr100 = "myNumberFr100";

// var name = prompt("What is your name ?");

// cek dukung ga
if (typeof(Storage) !== "undefined") {

  let username =  document.getElementById('username');
  let mode =  document.getElementById('changemode');

  function hanyaAngka(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
     if (charCode > 31 && (charCode < 48 || charCode > 57))

      return false;
    return true;
  }

  function inputUserName() {
    var name = prompt("What is your name ?", "Guest");
    setUsername(name);
  }

  function setUsername(name) {
    if (name == null || localStorage.getItem(cache_key) == '') name = "Guest";

    localStorage.setItem(cache_key, name);

    renderName();
  }

  function renderName() {

      if (localStorage.getItem(cache_key) !== null) {
          if (localStorage.getItem(cache_key) == '') {
            username.innerText = "Guest";
          }else {
            username.innerText = localStorage.getItem(cache_key);
          }
      }else {
          inputUserName();
      }
  }

  username.addEventListener('click', function () {
    var name = prompt("Change your name to ?", localStorage.getItem(cache_key));
    setUsername(name);
  })

  renderName();

  function setBestScore(type, best){
      // cek dulu apakah itu skor terbaik atau bukan
      let getData = localStorage.getItem(type);
      if (getData == null || getData > best) {
        localStorage.setItem(type, best);
      }
      renderBestScore();
  }

  function renderBestScore(){
    if (localStorage.getItem(cache_Pr10)) {
      document.getElementById('prompt10').innerText = localStorage.getItem(cache_Pr10);
    }
    if (localStorage.getItem(cache_Pr100)) {
      document.getElementById('prompt100').innerText = localStorage.getItem(cache_Pr100);
    }
    if (localStorage.getItem(cache_Fr10)) {
      document.getElementById('form10').innerText = localStorage.getItem(cache_Fr10);
    }
    if (localStorage.getItem(cache_Fr100)) {
      document.getElementById('form100').innerText = localStorage.getItem(cache_Fr100);
    }
  }

  document.getElementById("cScore").addEventListener("click", function () {
        localStorage.removeItem(cache_Pr10);
        localStorage.removeItem(cache_Pr100);
        localStorage.removeItem(cache_Fr10);
        localStorage.removeItem(cache_Fr100);
        location.reload()
  });

  renderBestScore();

}
