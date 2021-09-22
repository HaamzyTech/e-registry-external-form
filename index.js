var alertPlaceholder = document.getElementById('userAlert')

function alert(message, type) {
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible mt-3" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)
}

const processForm = (e) => {
    if (e.preventDefault) e.preventDefault();

    let contact_registry = document.getElementById('contact_registry');
    let formData = new FormData(contact_registry);

    grecaptcha.ready(function() {
        grecaptcha.execute('6Lckk38cAAAAANDwm_84BN8xIgMAVZ72NR4iomj4', {action: 'submit'}).then(function(token) {
            formData.append('token',token)
            fetch('http://10.2.71.225:2000/external/registry/upload/form',{
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then( result => {
                    switch ( result.code ){
                        case 200:
                            alert(result.data, 'success');
                            break;
                        default:
                            alert(result.data, 'warning');
                            break;
                    }
                })
                .catch( err => {
                    console.log(err)
                })

            return false;
        });
    });

}

let form = document.getElementById('contact_registry');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}



