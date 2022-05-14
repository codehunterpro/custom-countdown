const formConatiner = document.getElementById('form-container');
const countdownContainer = document.getElementById('countdown-container');
const completContainer = document.getElementById('complete-container');
const countdownForm = document.getElementById('timer-form');
const timeElements = document.querySelectorAll('li');
const countingTitle = document.getElementById('countdown- title');
const resetBtn = document.getElementById('reset-button');
const completeInfo = document.getElementById('complete-details')
const completeBtn = document.getElementById('complete-button')
const allInputs = document.querySelectorAll('input');
//clear htmle reference


//Changable value
let countdownTitle = '';
let countdownDate = '';
let futureDate = '';
let timeUp;

//set minimum date velue
const dateEl = document.getElementById('date-picker');
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//updateCountdownDOM function
function updateCountdownDOM() {
  const nowDate = new Date().getTime();
  const distance = futureDate - nowDate;
  const day = parseInt(distance / 86400000);
  const hour = parseInt((distance / 3600000) % 24);
  const min = parseInt((distance / 60000) % 60);
  const sec = parseInt((distance / 1000) % 60);
if(distance < 0){
  clearInterval(timeUp);
  completeInfo.innerHTML= ` Countdown Is Finished at <span>${countdownDate}</span>`
  countdownContainer.classList.add('hidden');
  completContainer.classList.remove('hidden')

}else{
  timeElements[0].innerHTML = `<span>${day}</span>DAYS`;
  timeElements[1].innerHTML = `<span>${hour}</span>HOUR`;
  timeElements[2].innerHTML = `<span>${min}</span>MINUTES`;
  timeElements[3].innerHTML = `<span>${sec}</span>SECONDS`;
}
};

function updateDOM(){
  if (countdownDate == '' && countdownTitle == '') {
    alert('make sure pick a date to countdown or title');
  } else {
    countingTitle.textContent = `${countdownTitle}`;
    timeUp = setInterval(updateCountdownDOM, 1000);
    formConatiner.classList.add('hidden');
    countdownContainer.classList.remove('hidden');
    allInputs.forEach(input => input.value = '')

  }
}

//get value from the form
function updateValue(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  futureDate = new Date(countdownDate).getTime();
 const  countDownObj = {
   title: countdownTitle,
   date: countdownDate,
   onDate: futureDate,

  }
  localStorage.setItem('countdown', JSON.stringify(countDownObj));
  // call update Dom for countdown UI setup
 updateDOM()
}

//data reset function
function resetFunction() {
  clearInterval(timeUp);
  formConatiner.classList.remove('hidden');
  countdownContainer.classList.add('hidden');
  completContainer.classList.add('hidden');
  localStorage.removeItem('countdown');

};

// retrive data from lacal Storage;
function retriveLocalStorage(){
  if(localStorage.getItem('countdown')){
   const retriveObj = JSON.parse(localStorage.getItem('countdown'));
   countdownTitle =retriveObj.title;
   countdownDate = retriveObj.date;
   futureDate = retriveObj.onDate;

   updateDOM()
   
   
  }
}



countdownForm.addEventListener('submit', updateValue);
resetBtn.addEventListener('click', resetFunction);
completeBtn.addEventListener('click', resetFunction);

retriveLocalStorage()
