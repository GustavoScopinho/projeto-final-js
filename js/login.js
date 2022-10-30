const url = 'http://localhost:3000'
const urlUsuarios = `${url}/usuarios`

function getUsuario (event) {
    event.preventDefault()
    let email = document.getElementById('email').value
    let senha = document.getElementById('senha').value
    axios.get(urlUsuarios)
    .then(response => {
        var data = response.data;
        
        validarLogin(data, email, senha);
    })
    .catch(error => console.log(error))
}

async function validarLogin (data, email, senha) {

    var i = 0
    let aux = true
    while (aux) {
        if(data[i].email == email && data[i].senha == senha) {
            var tipo = data[i].tipo;

            localStorage.setItem('tipoUsuarioLogado', tipo);

            if(tipo == 'Candidato'){
                window.location.href = './tela-inicial-candidato.html';
            } 
            if(tipo == 'Recrutador') {
                window.location.href = './tela-inicial-recrutador.html';
            }

            console.log('encotrou')
            aux = false

        } else if(i == data.length -1) {
            aux = false
            alert("Usuário não cadastrado. Por favor, cadastre-se")
        } else {
            console.log('nao encontrou')
        
        }
        i++
    }
}
