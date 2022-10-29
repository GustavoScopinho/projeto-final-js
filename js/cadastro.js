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
}

let logar = event => {
  event.preventDefault()

  verificarCategoriaUsuario()
}

let verificarCategoriaUsuario = () => {}
