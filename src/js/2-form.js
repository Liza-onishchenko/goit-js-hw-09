
const feedbackFormEl = document.querySelector('.feedback-form');  // Клас для форми

// Для зберігання даних форми
let formData = {
    email: "",
    message: ""
};

// Функція для заповнення полів форми, перевірка чи є дані
const fillFormFields = () => {
    const formDataFromLS = JSON.parse(localStorage.getItem('feedback-form-state')); // Передаємо що в локал сторіч та парсимо 

    if (formDataFromLS === null) {  // Перевірка якщо ще не вводили дані (null)
        return;
    }

    formData = formDataFromLS;

    for (const key in formDataFromLS) { // Перебираємо обєкт та заповнюємо елементи форм
        if (formDataFromLS.hasOwnProperty(key)) {// Перевірка властивості власна чи ні
            const inputElement = feedbackFormEl.elements[key];
            if (inputElement) {
                inputElement.value = formDataFromLS[key];
            }
        }
    }
};

// Виклик функції для заповнення  форми при завантаженні сторінки
fillFormFields();

// Функція обробник змін у полях форми
const onFormFieldChange = event => {
    const fieldName = event.target.name; // Зчитуємо з інпута значення атрибута name
    const fieldValue = event.target.value.trim();  // Зчитуємо значення які вводять та видаляємо пробіли з країв

    formData[fieldName] = fieldValue; // Записуємо все в formData

    localStorage.setItem('feedback-form-state', JSON.stringify(formData)); // Відправляємо в локал сторіч під ключ-значення обєкт що вводять
}
// Функція для обробки відправлення форми
const onFeedbackFormSubmit = event => {
    event.preventDefault();  // Прибира автоматичне перезавантаження сторінки

    if (!formData.email || !formData.message) {  // Якщо не всі поля введені
        alert('Fill please all fields');
        return;
    }

    console.log(formData);

    localStorage.removeItem('feedback-form-state'); // Очищаємо дані локал сторіч по ключу

    formData.email = ""; // Очищення обєкта formData
    formData.message = "";

    feedbackFormEl.reset(); // Очищаємо поля вводу
};

// Додавання слухачів подій
feedbackFormEl.addEventListener('input', onFormFieldChange);
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);