console.clear();

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

const historyEl = document.querySelector('ul#terminal-history');
const terminalText = document.querySelector('#terminal-text');
const delay = 200
let currentText = "";

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const characters = `${latin}${nums}`;

const initialMsgs = [
  "Initializing bluegr's transformation journey",
  "Loading system files... [OK]",
  "Starting network services... [OK]",
  "System ready.",
  "<b>Whatever you do, don't type \"Glitch\"</b>"
];

init();

function init() {
  delayMsg('*** Welcome to Digital Transformation ***', delay / 2);
  setTimeout(displayMsgs, delay);
}

function displayMsgs() {
  setTimeout(() => {
    for (let i = 0; i < initialMsgs.length; i++) {
      const randomInterval = Math.random() * 1000 + (i === initialMsgs.length - 1 ? (delay * i) * 3 : delay * i);
      delayMsg(initialMsgs[i], i * randomInterval)
    }
  }, delay)
}

function delayMsg(msg, ms) {
  setTimeout(() => {
    historyEl.insertAdjacentHTML("beforeend", `<li>${msg}</li>`);
  }, ms)
}

function updateTerminalText() {
  terminalText.textContent = currentText;
}

function inputTerminalText() {
  if (currentText.toLowerCase() === "glitch") {
    glitchOut();
  } else {
    historyEl.insertAdjacentHTML("beforeend", `<li>${currentText}</li>`);
  }
}

function glitchOut() {
  document.querySelector('#caret').classList.remove('blinking');
  document.querySelectorAll('ul#terminal-history > li').forEach((li, i) => {
    const text = li.textContent;
    const textLength = text.length;
    setTimeout(() => {
      let iLetter = 0;
      const interval = setInterval(() => {
        const randomChar = Math.floor(Math.random() * characters.length);
        let characterSet = Math.random() < 0.9 ? characters : katakana;
        let newChar = Math.random() > 0.3 ? characterSet[randomChar] : ' ';
        newChar = Math.random() < 0.9 ? newChar : newChar + characterSet[Math.floor(Math.random() * characterSet.length)];
        let newStr = li.textContent.replace(text[iLetter], newChar);
        li.textContent = newStr;
        iLetter++
        if (iLetter >= text.length) {
          if (i === 0) {
            displayAlert();
          }
          clearInterval(interval);
        }
      }, 100);
    }, 1000)
  })
}

function displayAlert() {
  document.querySelector('#alert').classList.remove('hidden');
}

window.addEventListener('keyup', e => {
  const key = e.key;
  if (key.toLowerCase() === "enter") {
    inputTerminalText();
    currentText.toLowerCase() === 'glitch' ? currentText : '';
  } else if (key.toLowerCase() === "backspace") {
    currentText = currentText.length ? currentText.slice(0, -1) : currentText;
  } else if (`${latin + " "}`.toLowerCase().includes(key.toLowerCase())) {
    if (currentText.toLowerCase() === "glitch") {
      return false;
    } else {
      currentText += key;
    }
  }
  updateTerminalText();
})