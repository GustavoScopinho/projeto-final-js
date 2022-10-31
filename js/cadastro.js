// const { default: axios } = require('axios')

const url = 'http://localhost:3000'
const urlUsuarios = `${url}/usuarios`
const urlVagas = `${url}/vagas`

console.log('dasds')

class Usuario {
  constructor(tipo, nome, dataNascimento, email, senha) {
    this.id
    this.tipo = tipo
    this.nome = nome
    this.dataNascimento = dataNascimento
    this.email = email
    this.senha = senha
    this.candidaturas = []
  }
}

//  ------------------------------

// addCandidaturas()
console.log('aaa')
//  --------------------------

const enviar = event => {
  event.preventDefault()
  cadastrarUsuario()
}

const cadastrarUsuario = async () => {
  const categoriaDeUsuario = document.getElementById('categoria-usuario')
  const nomeCompleto = document.getElementById('nome-usuario')
  const dataDeNascimento = document.getElementById('nascimento')
  const email = document.getElementById('email')
  const senha = document.getElementById('senha')

  const dataFormatada = dataDeNascimento.value.split('-')

  const novoUsuario = new Usuario(
    categoriaDeUsuario.value,
    nomeCompleto.value,
    new Date(dataFormatada[0], dataFormatada[1], dataFormatada[2]),
    email.value,
    senha.value
  )

  try {
    await axios.post(urlUsuarios, novoUsuario)
    alert('Parabéns, você foi cadastrado!')
  } catch (error) {
    alert('Algo deu errado')
  }

  //------------------------------------------------------------
  limparInput()
}

let limparInput = () => {
  document.getElementById('nome-usuario').value = ''
  document.getElementById('nascimento').value = ''
  document.getElementById('email').value = ''
  document.getElementById('senha').value = ''
}

//----------------------------------------------------------------

let logar = event => {
  event.preventDefault()
  verificarCategoriaUsuario()
}

//------------------------------------------------
//Mostrar vagas ao fazer o Loading da Página

window.addEventListener('load', () => {
  let tipoUsuarioLogado = localStorage.getItem('tipoUsuarioLogado')
  if (tipoUsuarioLogado === 'Candidato' && 'emailUsuarioLogado' != null) {
    mostrarCandidato()
  }

  getVagas()
})

//------------------------------------------------

let getVagas = async () => {
  axios
    .get('http://localhost:3000/vagas')
    .then(response => {
      let vagas = response.data
      mostrarRecrutador(vagas)
    })
    .catch(erro => console.log(erro))
}

let mostrarRecrutador = async vagas => {
  let mostrar = document.getElementById('container-vagas-geral')

  if (vagas.length > 0) {
    vagas.map((vaga, i) => {
      let containerVagas = document.createElement('div')
      let descricaoVagas = document.createElement('p')
      let remuneracaoVagas = document.createElement('p')
      let link = document.createElement('a')

      let vagaAtual = [
        vagas[i].tituloVaga,
        vagas[i].remuneracao,
        vagas[i].descricaoVagas,
        vagas[i].id
      ]

      descricaoVagas.className = 'descricao-vaga'
      remuneracaoVagas.className = 'remuneracao'
      link.className = 'container-vaga'
      link.addEventListener('click', () => esconder(vagaAtual))

      descricaoVagas.innerText = vagas[i].tituloVaga
      remuneracaoVagas.innerText = `R$ ${vagas[i].remuneracao}`

      containerVagas.appendChild(descricaoVagas)
      containerVagas.appendChild(remuneracaoVagas)
      link.appendChild(containerVagas)
      mostrar.appendChild(link)
    })
  } else {
    mostrar.innerHTML = `<div style="margin-top: 37px; justify-content: center;" class="container-vaga" id="container-vagas">
    <div class="sem-vaga">Nenhuma vaga cadastrada</div>
  </div>`
  }
}

let mostrarCandidato = () => {
  let btn = document.getElementById('btn-cadastro')
  btn.className = 'esconder'
}

// mostrarCandidato();

function esconder(vagaAtual) {
  //------------------------- Mostar tipo de usuário logado --------------------------------------

  // let tipoUsuario = localStorage.getItem('tipoUsuarioLogado');
  // console.log(tipoUsuario);

  //------------------------------------------------------------------------------

  let modal = document.getElementById('modal')
  modal.classList.toggle('esconder-modal')
  let sectionVaga = document.getElementById('section-vagas')
  sectionVaga.classList.toggle('esconder-modal')
  mostraInforVagas(vagaAtual)
}

let mostraInforVagas = vagaAtual => {
  vagaAtual.map(() => {
    let idVaga = document.getElementById('id-vaga')
    let remuneracao = document.getElementById('remuneracao')
    let titulo = document.getElementById('titulo')
    let descricao = document.getElementById('descricao')

    idVaga.innerText = vagaAtual[3]
    remuneracao.innerText = vagaAtual[1]
    titulo.innerText = vagaAtual[0]
    descricao.innerText = vagaAtual[2]
  })
  console.log(vagaAtual)

  let btnExcluir = document.getElementById('excluir-vaga')
  btnExcluir.addEventListener('click', () => excluirVaga(vagaAtual))
}

async function candidatarVaga(vagaAtual) {
  let usuarioLogado = localStorage.getItem('idUsuarioLogado')

  const response = await fetch(`${urlUsuarios}`)
  let vagasResponse = await response.json()
  console.log(typeof vagasResponse)
  let percorrerUsuarios = vagasResponse.filter(
    usuarios => usuarios.id == usuarioLogado
  )[0].candidaturas

  const candidaturasUm = {
    candidaturas: {
      tituloVaga: vagaAtual[0],
      descricaoVagas: vagaAtual[2],
      remuneracao: vagaAtual[1],
      id: vagaAtual[3]
    }
  }

  percorrerUsuarios.push(candidaturasUm)

  await fetch(`${urlUsuarios}/${usuarioLogado}`, {
    method: 'PATCH',
    body: JSON.stringify({
      candidaturas: percorrerUsuarios
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
}

// FIM CANDIDATURAS

let excluirVaga = async vagaAtual => {
  axios
    .delete(`${urlVagas}/${vagaAtual[3]}`)
    .then(response => {
      console.log(vagas)
    })
    .catch(erro => console.log(erro))
}

//-------------Login ------------

function getUsuario(event) {
  event.preventDefault()
  let email = document.getElementById('email').value
  let senha = document.getElementById('senha').value
  axios
    .get(urlUsuarios)
    .then(response => {
      var data = response.data

      validarLogin(data, email, senha)
    })
    .catch(error => console.log(error))
}

async function validarLogin(data, email, senha) {
  var i = 0
  let aux = true
  while (aux) {
    if (data[i].email == email && data[i].senha == senha) {
      var tipo = data[i].tipo
      var emailUsuario = data[i].email
      var idUsuario = data[i].id

      localStorage.setItem('idUsuarioLogado', idUsuario)
      localStorage.setItem('tipoUsuarioLogado', tipo)
      localStorage.setItem('emailUsuarioLogado', emailUsuario)

      if (tipo == 'Candidato') {
        window.location.href = './tela-inicial-recrutador.html'
      }
      if (tipo == 'Recrutador') {
        window.location.href = './tela-inicial-recrutador.html'
      }

      console.log('encotrou')
      aux = false
    } else if (i == data.length - 1) {
      aux = false
      alert(
        'Usuário não encontrado. Por favor, verifique os dados informados ou cadastre-se.'
      )
    } else {
      console.log('nao encontrou')
    }
    i++
  }
}

//---------------------------------

const URL_VAGAS = 'http://localhost:3000/vagas'

class Vaga {
  constructor(tituloVaga, descricaoVagas, remuneracao) {
    this.tituloVaga = tituloVaga
    this.descricaoVagas = descricaoVagas
    this.remuneracao = remuneracao
  }
}

const enviarVaga = event => {
  event.preventDefault()
  cadastrarVaga()
}

const cadastrarVaga = async () => {
  const tituloVaga = document.getElementById('titulo-vaga')
  const descricaoVagas = document.getElementById('descricao-vaga')
  const remuneracao = document.getElementById('remuneracao')

  const novaVaga = new Vaga(
    tituloVaga.value,
    descricaoVagas.value,
    remuneracao.value
  )

  try {
    await axios.post('http://localhost:3000/vagas', novaVaga)
    alert('Vaga cadastrada com sucesso!')
  } catch (error) {
    alert('Erro ao cadastrar sua vaga')
    alert(error)
  }
  limparInputVagas()
}

let limparInputVagas = () => {
  document.getElementById('titulo-vaga').value = ''
  document.getElementById('descricao-vaga').value = ''
  document.getElementById('remuneracao').value = ''
}
