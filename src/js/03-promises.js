import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayR = document.querySelector('input[name="delay"]');
const stepR = document.querySelector('input[name="step"]');
const amountR = document.querySelector('input[name=amount]');
const submitBtn = document.querySelector('button[type="submit"]');


form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  let delay = Number(delayR.value);
  let step = Number(stepR.value);
  let amount = Number(amountR.value);
  let position = null;

  for (position = 1; position <= amount; position += 1 ) {
   createPromise( position, delay )
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay += step;
  };

};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } 
      reject({ position, delay });
    }, delay);

  })
}
