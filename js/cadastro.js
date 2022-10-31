// const { default: axios } = require('axios')

const url = 'http://localhost:3000'
const urlUsuarios = `${url}/usuarios`
const urlVagas = `${url}/vagas`


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

async function esconder(vagaAtual) {
  //------------------------- Mostar tipo de usuário logado --------------------------------------
  
  let tipoUsuario = localStorage.getItem('tipoUsuarioLogado')

  //------------------------------------------------------------------------------

  if (tipoUsuario == 'Candidato') {
    let modal2 = document.getElementById('modal2')
    modal2.classList.toggle('esconder-modal')
    let sectionVaga = document.getElementById('section-vagas')
    sectionVaga.classList.toggle('esconder-modal')
    mostraInforVagasUsuarios(vagaAtual)
  } else {
    let modal = document.getElementById('modal')
    modal.classList.toggle('esconder-modal')
    let sectionVaga = document.getElementById('section-vagas')
    sectionVaga.classList.toggle('esconder-modal')
    mostraInforVagas(vagaAtual)
  }
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
 

  let btnExcluir = document.getElementById('excluir-vaga')
  btnExcluir.addEventListener('click', () => excluirVaga(vagaAtual))

  mostarCandidatosDaVaga(candidaturas)
}

let mostraInforVagasUsuarios = vagaAtual => {
  vagaAtual.map(() => {
    let idVaga2 = document.getElementById('id-vaga2')
    let remuneracao2 = document.getElementById('remuneracao2')
    let titulo2 = document.getElementById('titulo2')
    let descricao2 = document.getElementById('descricao2')

    idVaga2.innerText = vagaAtual[3]
    remuneracao2.innerText = vagaAtual[1]
    titulo2.innerText = vagaAtual[0]
    descricao2.innerText = vagaAtual[2]
  })

  let letBtnCandidatarVaga = document.getElementById('btnCandidatarVaga')
  letBtnCandidatarVaga.addEventListener('click', () =>
    candidatarVaga(vagaAtual)
  )
  mostarCandidatosDaVaga2(candidaturas)

  pegarCandidaturas(vagaAtual)
}


let pegarCandidaturas = async (vagaAtual) => {
  axios
    .get(urlUsuarios)
    .then(response => {
      let usuarios = response.data
      filtrarCandidaturas(usuarios, vagaAtual);
    })
    .catch(erro => console.log(erro))
}


let filtrarCandidaturas = (usuarios, vagaAtual)=>{

  

  let arrFiltrado = usuarios.filter((el, i)=>{

    console.log(el.nome)
    
    //  if(el.candidaturas.id[i] == vagaAtual[3]){
    //   console.log(true);
    // } else {
    //   console.log(false);
    // }

  })

}




//----------------------------------Mostrar candidaturas----------------------------
let candidaturas = [
  {
    nome: 'joão',
    dataDeNascimento: '15/02/1970'
  },
  {
    nome: 'Fernanda',
    dataDeNascimento: '05/10/1999'
  },
  {
    nome: 'Alan',
    dataDeNascimento: '15/02/1970'
  },
  {
    nome: 'Joaquina',
    dataDeNascimento: '05/10/1999'
  }
]

let mostarCandidatosDaVaga = candidaturas => {
  let vagasGeral = document.getElementById('vagas-geral')

  if (candidaturas.length > 0) {
    candidaturas.map(candidatura => {
      let candidato = document.createElement('div')
      let nome = document.createElement('p')
      let dataNascimento = document.createElement('p')
      let button = document.createElement('button')

      vagasGeral.className = 'vagas-geral'
      nome.innerText = candidatura.nome
      dataNascimento.innerHTML = candidatura.dataDeNascimento
      candidato.className = 'vaga'
      button.innerText = 'Reprovar'
      button.className = 'btn-normal'

      candidato.appendChild(nome)
      candidato.appendChild(dataNascimento)
      candidato.appendChild(button)
      vagasGeral.appendChild(candidato)
    })
  } else {
    vagasGeral.innerHTML = `<div style="margin: 30px 0px; justify-content: center;" class="vaga" id="container-vagas">
    <div class="sem-vaga">Nenhum candidato cadastrado</div>
  </div>`
  }
}

let mostarCandidatosDaVaga2 = candidaturas => {
  let vagasGeral2 = document.getElementById('vagas-geral2')

  if (candidaturas.length > 0) {
    candidaturas.map(candidatura => {
      let candidato = document.createElement('div')
      let nome = document.createElement('p')
      let dataNascimento = document.createElement('p')

      vagasGeral2.className = 'vagas-geral'
      nome.innerText = candidatura.nome
      nome.className = 'p2'
      dataNascimento.innerHTML = candidatura.dataDeNascimento
      dataNascimento.className = 'p2'
      candidato.className = 'vaga'

      candidato.appendChild(nome)
      candidato.appendChild(dataNascimento)
      vagasGeral2.appendChild(candidato)
    })
  } else {
    vagasGeral2.innerHTML = `<div style="margin: 30px 0px; justify-content: center;" class="vaga" id="container-vagas">
    <div class="sem-vaga">Nenhum candidato cadastrado</div>
  </div>`
  }
}

//----------------------------------------------------------------------------------------------

async function candidatarVaga(vagaAtual) {
  let usuarioLogado = localStorage.getItem('idUsuarioLogado')

  const response = await fetch(`${urlUsuarios}`)
  let vagasResponse = await response.json()
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
      var senhaUsuario = data[i].senha
      var dataDeNascimento = data[i].dataNascimento
      var nomeUsuario = data[i].nome
      var idUsuario = data[i].id

      localStorage.setItem('idUsuarioLogado', idUsuario)
      localStorage.setItem('tipoUsuarioLogado', tipo)
      localStorage.setItem('emailUsuarioLogado', emailUsuario)
      localStorage.setItem('senhaUsuarioLogado', senhaUsuario)
      localStorage.setItem('dataNascUsuarioLogado', dataDeNascimento)
      localStorage.setItem('nomeUsuarioLogado', nomeUsuario)

      if (tipo == 'Candidato') {
        window.location.href = './tela-inicial-recrutador.html'
      }
      if (tipo == 'Recrutador') {
        window.location.href = './tela-inicial-recrutador.html'
      }

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
    if (
      tituloVaga.value != '' &&
      descricaoVagas.value != '' &&
      remuneracao.value != ''
    ) {
      await axios.post('http://localhost:3000/vagas', novaVaga)
      alert('Vaga cadastrada com sucesso!')
    } else {
      alert('Todos os campos devem ser preenchidos!')
    }
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

async function logout() {
  localStorage.removeItem('tipoUsuarioLogado')
  localStorage.removeItem('emailUsuarioLogado')
  localStorage.removeItem('senhaUsuarioLogado')
  localStorage.removeItem('dataNascUsuarioLogado')
  localStorage.removeItem('nomeUsuarioLogado')

  window.location.href = './tela-inicial-geral.html'
}
