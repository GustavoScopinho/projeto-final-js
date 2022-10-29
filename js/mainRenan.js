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
class Candidatura {
  idVagas;
  idCandidato;
  reprovado;

  constructor(idVagas, idCandidato, reprovado){
    this.idVagas = idVagas;
    this.idCandidato = idCandidato;
    this.reprovado = reprovado;
  }
}
class Vaga {
  id; 
  titulo;
  descricao;
  remuneracao;
  candidatos = [];

  constructor(id, titulo, descricao, remuneracao, candidatos){
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.remuneracao = remuneracao;
    this.candidatos = candidatos;
  }
}

//------------------------------------------------
//Mostrar vagas ao fazer o Loading da Página

window.addEventListener('load', ()=>{
  // if(){
  //   mostrarCandidato();
  // } else {
  //   mostrarRecrutador();
  // }
});


//------------------------------------------------



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
  document.getElementById('nascimento').value = '';
  document.getElementById('email').value = '';
  document.getElementById('senha').value = '';
}


let logar = event => {
  event.preventDefault();
  verificarCategoriaUsuario();
}





let vagas = [
  {  
    id: 1,
    titulo:"Desenvolvedor Javascript Jr",
    descricao:"Dev Javascript Jr",
    remuneracao: 3000,
    candidatos : []
  },
  {  
    id: 2,
    titulo:"Desenvolvedor Java Pleno",
    descricao:"Dev Java Pleno",
    remuneracao: 6000,
    candidatos : []
  },
  {  
    id: 2,
    titulo:"Desenvolvedor Backend Serio",
    descricao:"Dev Backend Serio",
    remuneracao: 16000,
    candidatos : []
  },
  {  
    id: 2,
    titulo:"Desenvolvedor Java Pleno",
    descricao:"Dev Java Pleno",
    remuneracao: 5500,
    candidatos : []
  },
];

let mostrarRecrutador = ()=>{
  let mostrar = document.getElementById('container-vagas-geral');  

  if(vagas.length > 0){
    vagas.map((vaga, i) => {
      let containerVagas = document.createElement('div');
      let descricaoVagas = document.createElement('div');
      let remuneracaoVagas = document.createElement('div');
  
      descricaoVagas.className = "descricao-vaga";
      remuneracaoVagas.className = "remuneracao";
      containerVagas.className = "container-vaga";
      descricaoVagas.innerText = vagas[i].descricao;
      remuneracaoVagas.innerText = `R$ ${vagas[i].remuneracao}`;
  
      containerVagas.appendChild(descricaoVagas);
      containerVagas.appendChild(remuneracaoVagas);
      mostrar.appendChild(containerVagas);
    })
  } else {
    mostrar.innerHTML= `<div style="margin-top: 37px; justify-content: center;" class="container-vaga" id="container-vagas">
    <div class="sem-vaga">Nenhuma vaga cadastrada</div>
  </div>`
  }
}

mostrarRecrutador();

let mostrarCandidato = ()=>{
  let btn = document.getElementById("btn-cadastro");
  btn.className = 'esconder'
}

// mostrarCandidato();