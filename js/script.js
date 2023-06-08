const INPUT_FIELDS = [weight, height, age];

let weight = document.querySelector('#weight');
let height = document.querySelector('#height');
let age = document.querySelector('#age');
let submitButton = document.querySelector('#submit');
let clearFields = document.querySelector('#clear-fields');

INPUT_FIELDS.forEach(function (el) {
    el.addEventListener('input', function () {
        const isAnyInputEmpty = INPUT_FIELDS.some((el) => el.value === '');
        const isAllInputsFilled = INPUT_FIELDS.every((el) => el.value !== '');
        
        clearFields.disabled = !isAnyInputEmpty;
        submitButton.disabled = !isAllInputsFilled;
    });
});

let activityLevel = document.querySelectorAll('.activity');
let genderMale = document.querySelector('#gender-male');
let genderFemale = document.querySelector('#gender-female');
let caloriesNorma = document.querySelector('#calories-norm');
let caloriesMinimal = document.querySelector('#calories-minimal');
let caloriesMaximal = document.querySelector('#calories-maximal');
clearFields.addEventListener('click', function () {
    activityLevel[0].checked = true;

    clearFields.disabled = true;
    submitButton.disabled = true;

    genderMale.checked = true;
    genderFemale.checked = false;

    INPUT_FIELDS.forEach((el) => {
        el.value = '';
    });

    caloriesNorma.textContent = '';
    caloriesMinimal.textContent = '';
    caloriesMaximal.textContent = '';
});

submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    const BMRMen = 10 * weight.value + 6.25 * height.value - 5 * age.value + 5;
    const BMRWomen = 10 * weight.value + 6.25 * height.value - 5 * age.value - 161;

    const activityLevel = [...activityLevel].find((el) => el.checked).value;
    const activityCoefficients = {
        minimal: 1.2,
        low: 1.375,
        medium: 1.55,
        high: 1.725,
        maximal: 1.9
    };

    const caloriesNormValue = genderMale.checked ? BMRMen * activityCoefficients[activityLevel] : BMRWomen * activityCoefficients[activityLevel];
    caloriesNorma.textContent = Math.round(caloriesNormValue);

    caloriesMinimal.textContent = Math.round(caloriesNormValue * 0.85);
    caloriesMaximal.textContent = Math.round(caloriesNormValue * 1.15);

    if (caloriesNormValue <= 0) return;

    const caloryInfoBlock = document.querySelector('.counter__result');
    caloryInfoBlock.classList.remove('counter__result--hidden');
});