
document.addEventListener('DOMContentLoaded', () => {

    // Inicializar EmailJS
    emailjs.init('O06bpb2D0eJZvyk2l');

    const form = document.getElementById('contactForm');
    const btn = document.getElementById('button');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyiIQaUod5b5JRvEE8kHrCsswtLXJNZwKO11YtNmVu9ixDDM-FC0n_kWHyq8B4FdZYK8g/exec';

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            // Validar formulario
            if (!form.checkValidity()) {
                alert('Por favor, completa todos los campos requeridos correctamente.');
                return;
            }

            // Validar reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                alert('Por favor, completa el reCAPTCHA.');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Enviando...';

            const formData = new FormData(form);
            const searchParams = new URLSearchParams(formData);

            // Enviar los datos a Google Sheets
            fetch(scriptURL, {
                method: 'POST',
                body: searchParams,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                redirect: 'follow'
            })
                .then(response => {
                    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                    return response.text(); // Tu GAS devuelve texto o JSON
                })
                .then(data => {
                    console.log('Guardado en Google Sheets:', data);

                    // Enviar el correo con EmailJS
                    const serviceID = 'service_dlpq70m';
                    const templateID = 'template_tthm3je';
                    return emailjs.sendForm(serviceID, templateID, form);
                })
                .then(() => {
                    alert('¡Mensaje enviado correctamente y datos guardados!');
                    form.reset();
                    grecaptcha.reset();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Ocurrió un error: ' + error.message);
                })
                .finally(() => {
                    btn.disabled = false;
                    btn.textContent = 'Enviar Mensaje';
                });
        });
    }
});
