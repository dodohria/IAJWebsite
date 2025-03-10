(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');

      // Verifica se a ação está definida
      if (!action) {
        displayError(thisForm, 'O atributo action do formulário não está definido!');
        return;
      }

      // Obtém elementos necessários e verifica se existem
      let loading = thisForm.querySelector('.loading');
      let errorMessage = thisForm.querySelector('.error-message');
      let sentMessage = thisForm.querySelector('.sent-message');

      if (loading) loading.classList.add('d-block');
      if (errorMessage) errorMessage.classList.remove('d-block');
      if (sentMessage) sentMessage.classList.remove('d-block');

      let formData = new FormData(thisForm);

      if (recaptcha) {
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.ready(function () {
            try {
              grecaptcha.execute(recaptcha, { action: 'php_email_form_submit' })
                .then(token => {
                  formData.set('recaptcha-response', token);
                  php_email_form_submit(thisForm, action, formData, loading, errorMessage, sentMessage);
                });
            } catch (error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'A URL da API JavaScript do reCaptcha não foi carregada!');
        }
      } else {
        php_email_form_submit(thisForm, action, formData, loading, errorMessage, sentMessage);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData, loading, errorMessage, sentMessage) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'X-Requested-With': 'XMLHttpRequest' }
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`);
        }
      })
      .then(data => {
        if (loading) loading.classList.remove('d-block');

        if (data.trim() === 'OK') {
          if (sentMessage) sentMessage.classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(data ? data : 'Erro no envio do formulário, nenhuma mensagem de erro foi retornada de: ' + action);
        }
      })
      .catch(error => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm, error) {
    let loading = thisForm.querySelector('.loading');
    let errorMessage = thisForm.querySelector('.error-message');

    if (loading) loading.classList.remove('d-block');
    if (errorMessage) {
      errorMessage.innerHTML = error;
      errorMessage.classList.add('d-block');
    }
  }

})();
