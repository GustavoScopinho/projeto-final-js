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
}
