const input = document.querySelector('.login_iput');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form');

//função para escrever o nome para entrar no jogo
//para conseguir jogar a pessoa tem que colocar mais que 2 caratcteres
const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
    //serve para bloquear o comportamento padrão do formulário (enviar e recarregar a página)
    event.preventDefault();

    //recuperando valor que a pessoa digitou
    console.log(input.value)

    //salvar no local storage
    localStorage.setItem('player', input.value);
    //redirecionamento da pessoa para a página do jogo
    window.location = './pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

