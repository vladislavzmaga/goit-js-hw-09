import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
const delay = form.elements.delay;
const step = form.elements.step;
const amount = form.elements.amount;

form.addEventListener('submit', generatedPromise);

function generatedPromise(evt) {
  evt.preventDefault();
  const countAmount = +amount.value;
  const countStep = +step.value;
  let countDelay = +delay.value;
  for (let i = 1; i <= countAmount; i += 1) {
    createPromise(i, countDelay)
      .then(result => Notiflix.Notify.success(result))
      .catch(error => Notiflix.Notify.failure(error));
    countDelay += countStep;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
  return promise;
}
