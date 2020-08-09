const rand = max => Math.ceil(Math.random() * max);

class PromptNumbers {
  constructor(name, max, cache) {
    this.cache = cache;
    this.max = max;
    this.name = name;
    this.win = false;
    this.guess = 0;
    this.theNumber = rand(this.max);
  }

  startTheGame(){
    do {
      let number = window.prompt('Masukkan tebakan anda ?');
      if (number == 'c' || number == 'C') break;
      this.guess++;

      if (number == this.theNumber) {
        this.win = true;
        alert('You are win !')
      } else {
        if (number < this.theNumber) {
          alert('Tebakan anda terlalu kecil !')
        } else {
          alert('Tebakan anda terlalu besar !')
        }
        // alert(`Kesempatan anda tersisa : ${this.guess}`)
      }

    } while ((this.guess <= 10) && (!this.win));

    if (this.win) {
      alert(`Selamat, Anda telah memenangkan permainan ini !
Anda telah menebak sebanyak : ${this.guess}`)
      setBestScore(cache, this.guess)
      location.reload()
    } else {
      alert(`Maaf, Anda kurang beruntung !
Angka yang akan ditebak adalah : ${this.theNumber}
Anda telah menebak sebanyak : ${this.guess}`)
      location.reload()
    }
  }

}

let btn10 =  document.querySelector('.btn-10');
let btn100 =  document.querySelector('.btn-100');
let btnprompt =  document.querySelector('.btn-prompt');
let btnform =  document.querySelector('.btn-form');
let btnback =  document.querySelector('.btn-back');

let number10, number100, chooseP, chooseF;

btn10.addEventListener('click', function () {
  btn10.style.border = '2px solid lightblue';
  btn10.style.color = 'lightblue';
  btn100.style.color = 'white';
  btn100.style.border = 'none';
  number10 = true;
  number100 = false;
})
btn100.addEventListener('click', function () {
  btn100.style.border = '2px solid lightblue';
  btn100.style.color = 'lightblue';
  btn10.style.color = 'white';
  btn10.style.border = 'none';
  number100 = true;
  number10 = false;
})

btnprompt.addEventListener('click', function () {
  btnprompt.style.border = '2px solid lightblue';
  btnprompt.style.color = 'lightblue';
  btnform.style.color = 'white';
  btnform.style.border = 'none';
  chooseP = true;
  chooseF = false;
})
btnform.addEventListener('click', function () {
  btnform.style.border = '2px solid lightblue';
  btnform.style.color = 'lightblue';
  btnprompt.style.color = 'white';
  btnprompt.style.border = 'none';
  chooseF = true;
  chooseP = false;
})

btnback.addEventListener('click', () => location.reload() )


let theNumber, cache, guess = 1, playButton =  document.getElementById('btnPlay');;

playButton.addEventListener('click', function () {

  if (number10 && chooseF) {
    document.querySelector('.game-container').style.display = 'none';
    document.querySelector('.container-score').style.display = 'none';
    document.querySelector('.form-game-container').style.display = 'block';
    document.querySelector('#message').innerText = 'Angka acak telah kami tetapkan ! dari (0-10)';
    document.querySelector('#input').maxLength = '2';
    theNumber = rand(10);
    cache = cache_Fr10;
    console.log('form 10 angka');

  }else if (number10 && chooseP) {
    cache = cache_Pr10;
    let theGame = new PromptNumbers(localStorage.getItem(cache_key), 10, cache);
    theGame.startTheGame()
    console.log('prompt 10 angka');

  }else if (number100 && chooseF) {
    document.querySelector('.game-container').style.display = 'none';
    document.querySelector('.container-score').style.display = 'none';
    document.querySelector('.form-game-container').style.display = 'block';
    document.querySelector('#message').innerText = 'Angka acak telah kami tetapkan ! dari (0-100)';
    document.querySelector('#input').maxLength = '3';
    cache = cache_Fr100;
    theNumber = rand(100);
    console.log('form 100 angka');

  }else if (number100 && chooseP) {
    cache = cache_Pr100;
    let theGame = new PromptNumbers(localStorage.getItem(cache_key), 100, cache);
    theGame.startTheGame()
    console.log('prompt 100 angka');

  }else {
    alert('pilih tipe game terlebih dahulu !')
  }

})

function checkForm() {
  let silahkan = document.getElementById('guesss')
  let inputNum = document.getElementById('input')
  let message = document.getElementById('message')
  let remains = document.getElementById('remains')
  let winorlost = document.getElementById('winOrLost')
  let divForm = document.querySelector('.overlay-content')
  let userGuess = Number(inputNum.value);
  console.log(theNumber);
  if (guess === 1) {
    remains.textContent = `Sisa percobaan : 9`;
  }

  // remains.textContent += userGuess + ' ';

  if (userGuess === theNumber) {
    winorlost.textContent = 'You are win !';
    remains.textContent = `Percobaan yang anda lakukan sebanyak : ${guess}`;
    message.textContent = '';
    document.querySelector('.container-score').style.display = 'block';
    divForm.style.display = 'none';
    silahkan.style.display = 'none';
    setBestScore(cache, guess);
    // setGameOver();
  } else if (guess === 10) {
    winorlost.textContent = 'Maaf, Anda kurang beruntung !';
    remains.style.display = 'none';
    document.querySelector('.container-score').style.display = 'block';

    setTimeout(()=>{
      remains.textContent = `Anda telah gagal menebak sebanyak 10 kali`
    }, 2000)
    message.textContent = '';
    divForm.style.display = 'none';
    silahkan.style.display = 'none';
    // setGameOver();
  } else {
    // winorlost.textContent = 'Wooo Salah!';
    if(userGuess < theNumber) {
      message.textContent='Angka yang anda masukan Terlalu Rendah!' ;
      remains.textContent = `Sisa percobaan : ${10 - guess}`;
    } else if(userGuess > theNumber) {
      message.textContent = 'Angka yang anda masukan Terlalu Tinggi!';
      remains.textContent = `Sisa percobaan : ${10 - guess}`;
    }
  }

  guess++;
  inputNum.value = '';
}

goForm.addEventListener('click', checkForm);







// var validasiAngka = /^[0-9]+$/;
// var tes = prompt('masukkan angka');
// if (tes.match(validasiAngka)) {
//     alert('benar angka')
// }else {
//     alert('sing becus, eta teh angka')
// }

// document.querySelector('.game-container').style.display = 'none';
// document.querySelector('.game-container').style.display = 'none';
// document.querySelector('.form-game-container').style.display = 'block';

// var myFunctionReference = function() { /* do stuff here*/ }
//
// element.attachEvent('onclick', myFunctionReference);
// element.addEventListener('click', myFunctionReference , false);
