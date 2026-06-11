(function () {
  'use strict';

  const RECIPIENT = 'nagrebeckiy01@gmail.com';
  const SUBJECT = '6weeks - Форма заповнена';
  const ENDPOINT = 'https://formsubmit.co/ajax/' + RECIPIENT;
  const RESET_DELAY = 3000; 

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


  function setFieldError(input, message) {
    const field = input.closest('.field');
    field.querySelector('.field__error').textContent = message;
    field.classList.remove('field--invalid');
    void field.offsetWidth;
    field.classList.add('field--invalid');
  }

  function clearFieldError(input) {
    input.closest('.field').classList.remove('field--invalid');
  }

  function validateEmail({ requireValue }) {
    const value = emailInput.value.trim();

    if (!value) {
      if (requireValue) {
        setFieldError(emailInput, "Email обов'язковий для заповнення");
        return false;
      }
      clearFieldError(emailInput);
      return true;
    }

    if (!EMAIL_RE.test(value)) {
      setFieldError(emailInput, 'Введіть коректний email, наприклад name@example.com');
      return false;
    }

    clearFieldError(emailInput);
    return true;
  }

  emailInput.addEventListener('blur', function () {
    validateEmail({ requireValue: false });
  });

  emailInput.addEventListener('input', function () {
    clearFieldError(emailInput);
  });

  let resetTimer = null;

  function setButtonState(state) {
    submitBtn.classList.remove('btn--loading', 'btn--success', 'btn--error');
    if (state) {
      submitBtn.classList.add('btn--' + state);
    }
    submitBtn.disabled = state !== null;
  }

  function finishWithState(state) {
    setButtonState(state);
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function () {
      setButtonState(null); 
    }, RESET_DELAY);
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!validateEmail({ requireValue: true })) {
      emailInput.focus();
      return;
    }
    if (submitBtn.disabled) return;

    setButtonState('loading');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: SUBJECT,
          _template: 'table',
          'Ім\'я': nameInput.value.trim() || '—',
          'Email': emailInput.value.trim(),
          'Повідомлення': messageInput.value.trim() || '—'
        })
      });

      const data = await response.json();

      if (response.ok && String(data.success) === 'true') {
        finishWithState('success');
        form.reset();
      } else {
        throw new Error(data.message || 'Send failed');
      }
    } catch (err) {
      console.error('Form send error:', err);
      finishWithState('error');
    }
  });
})();
