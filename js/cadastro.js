const url = 'http://localhost:3000';

const urlUsuarios = `${url}/usuarios`;

const urlVagas = `${url}/vagas`;

class Usuario {
  id
  categoria
  nomeCompleto
  dataDeNascimento
  email
  senha
  candidaturas = []

  constructor(categoria, nomeCompleto, dataDeNascimento, email, senha) {
    this.categoria = categoria;
    this.nomeCompleto = nomeCompleto;
    this.dataDeNascimento = dataDeNascimento;
    this.email = email;
    this.senha = senha;
  }
}

const enviar = event => {
  event.preventDefault();

  cadastrarUsuario();
}

const cadastrarUsuario = async () => {
  const categoriaDeUsuario = document.getElementById('categoria-usuario');
  const nomeCompleto = document.getElementById('nome-usuario');
  const dataDeNascimento = document.getElementById('nascimento');
  const email = document.getElementById('email');
  const senha = document.getElementById('senha');

  const dataFormatada = dataDeNascimento.value.split('-');

  const novoUsuario = new Usuario(
    categoriaDeUsuario.value,
    nomeCompleto.value,
    new Date(dataFormatada[0], dataFormatada[1], dataFormatada[2]),
    email.value,
    senha.value
  );
    
  try {
    await axios.post(`http://localhost:3000/usuarios`, novoUsuario)
    alert('Parabéns, você foi cadastrado!')
  } catch (error) {
    alert('Algo deu errado')
  } 

  limparInput();
}

let limparInput = ()=> {
  document.getElementById('nome-usuario').value = '';
  document.getElementById('email').value = '';
  document.getElementById('senha').value = '';
}


let logar = event => {
  event.preventDefault();

  verificarCategoriaUsuario();
}

let verificarCategoriaUsuario = () => {};
