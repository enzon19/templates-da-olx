import FormDataJson from './form-data-json.min.js';
const formQuery = 'form';

// estou usando async só para usar o catch no await block
export function getFormData() {
  const formData = FormDataJson.toJson(document.querySelector(formQuery));

  if (formData?.length === 0) {
    throw 'Você precisa escolher uma categoria primeiro!';
  }
  
  delete formData['cf-turnstile-response'];
  delete formData['phone_hidden'];

  return formData;
}

function fillForm(formData) {
  FormDataJson.fromJson(document.querySelector(formQuery), formData, {triggerChangeEvent: true});
}

export function applyFormData(formData) {
  fillForm(formData);

  let clickInterval = setInterval(() => {
    let submitButton = document.querySelector('#ad_insertion_submit_button');
    if (submitButton && !submitButton.innerText.startsWith('Enviar')) {
      console.log('Tentando preencher formulário')
      submitButton.click();
    } else {
      if (!submitButton) alert('Talvez seja necessário escolher uma categoria. Tente novamente.')
      clearInterval(clickInterval); // Stop clicking once the text starts with "Enviar" or when not found
    }
  }, 100);

  setTimeout(() => {
    console.log('Preenchendo formulário');
    fillForm(formData);
  }, 2500);
}