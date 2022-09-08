const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
  };
  let intervalId = null;
  
  refs.btnStart.addEventListener('click', onBtnStartClick);
  refs.btnStop.addEventListener('click', onBtnStopClick);
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6,0)}`;
  }
  
  function onBtnStartClick() {
    refs.btnStart.setAttribute('disabled', true);
    refs.btnStop.removeAttribute('disabled');
  
    intervalId = setInterval(() =>
      document.body.style.backgroundColor = getRandomHexColor(), 1000)
  }
  
  function onBtnStopClick() {
    refs.btnStop.setAttribute('disabled', true);
    refs.btnStart.removeAttribute('disabled');
  
    clearInterval(intervalId);
  }
