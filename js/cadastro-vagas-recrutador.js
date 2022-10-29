const URL_VAGAS = 'http://localhost:3000/vagas';


let vagasCadastradas = [];

const cadastrarVaga = async (event) =>{
    event.preventDefault();
    
    let tituloVaga = document.getElementById("titulo-vaga").value;
    let descricaoVagas = document.getElementById("descricao-vaga").value;
    let remuneracao = document.getElementById("remuneracao").value;

    let novaVaga = {
        tituloVaga: tituloVaga,
        descricaoVagas: descricaoVagas,
        remuneracao: remuneracao
    }    
vagasCadastradas.push(novaVaga);
console.log(vagasCadastradas);

try {
    await axios.post(`${URL_VAGAS}, novaVaga`);
    alert("Vaga cadastrada com sucesso!");
  } catch (error) {
    alert("Erro ao cadastrar sua vaga");
    alert(error);
  }
}


