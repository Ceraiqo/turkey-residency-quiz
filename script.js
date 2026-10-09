// Текущий шаг квиза
let currentStep = 1;
const totalSteps = 4;

// Данные ответов
let quizData = {
    plans: [],
    family: '',
    previousResidence: ''
};

// Цены в зависимости от состава семьи
const prices = {
    'single': 2000,
    'couple': 4000,
    'one-child': 6000,
    'two-children': 8000
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initQuiz();
    initScrollAnimations();
});

// Инициализация квиза
function initQuiz() {
    // Обработка чекбоксов для вопроса 1
    const checkboxes = document.querySelectorAll('input[name="plans"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.quiz-option');
            if (this.checked) {
                label.classList.add('selected');
            } else {
                label.classList.remove('selected');
            }
        });
    });

    // Обработка радиокнопок для вопросов 2 и 3
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const name = this.name;
            document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
                r.closest('.quiz-option').classList.remove('selected');
            });
            this.closest('.quiz-option').classList.add('selected');
        });
    });

    // Обработка формы контактов
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Переход к следующему шагу
function nextStep() {
    if (currentStep === 1) {
        // Проверка, что выбран хотя бы один вариант
        const selectedPlans = document.querySelectorAll('input[name="plans"]:checked');
        if (selectedPlans.length === 0) {
            alert('Пожалуйста, выберите хотя бы один вариант');
            return;
        }
        // Сохраняем данные
        quizData.plans = Array.from(selectedPlans).map(cb => cb.value);
    }

    if (currentStep === 2) {
        // Проверка, что выбран вариант
        const selectedFamily = document.querySelector('input[name="family"]:checked');
        if (!selectedFamily) {
            alert('Пожалуйста, выберите вариант');
            return;
        }
        // Сохраняем данные
        quizData.family = selectedFamily.value;
    }

    if (currentStep === 3) {
        // Проверка, что выбран вариант
        const selectedPrevious = document.querySelector('input[name="previous-residence"]:checked');
        if (!selectedPrevious) {
            alert('Пожалуйста, выберите вариант');
            return;
        }
        // Сохраняем данные
        quizData.previousResidence = selectedPrevious.value;
        // Показываем результат
        showResult();
    }

    if (currentStep < totalSteps) {
        hideStep(currentStep);
        currentStep++;
        showStep(currentStep);
        updateProgress();
    }
}

// Переход к предыдущему шагу
function prevStep() {
    if (currentStep > 1) {
        hideStep(currentStep);
        currentStep--;
        showStep(currentStep);
        updateProgress();
    }
}

// Показать шаг
function showStep(stepNumber) {
    const step = document.getElementById(`step${stepNumber}`);
    if (step) {
        step.style.display = 'block';
        step.style.animation = 'none';
        step.offsetHeight; // Trigger reflow
        step.style.animation = 'fadeIn 0.5s ease';
    }
}

// Скрыть шаг
function hideStep(stepNumber) {
    const step = document.getElementById(`step${stepNumber}`);
    if (step) {
        step.style.display = 'none';
    }
}

// Обновить прогресс-бар
function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progress = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
}

// Показать результат
function showResult() {
    const resultPrice = document.getElementById('resultPrice');
    const price = prices[quizData.family] || 2000;
    resultPrice.textContent = `Стоимость под ключ: ${price} евро`;
}

// Скролл к квизу
function scrollToQuiz() {
    const quizSection = document.getElementById('quiz');
    quizSection.scrollIntoView({ behavior: 'smooth' });
}

// Инициализация анимаций при скролле
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
