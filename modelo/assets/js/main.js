const novaTarefa = document.querySelector('.nova_tarefa');
const btn = document.querySelector('.btn_tarefas');
const tarefas = document.querySelector('.tarefas');

function criaLi(texto){
    const li = document.createElement('li');
    li.innerText = texto;
    tarefas.appendChild(li);
    btnApagar(li);
    limpaInput();
}

function btnApagar(li){
    const button =  document.createElement('button');
    button.innerText = 'Apagar';
    button.setAttribute('class', 'botao');
    button.setAttribute('title', 'Clique para apagar')
    li.innerText += ' ';
    li.appendChild(button);
}

document.addEventListener('click', function (e){
    const el = e.target;
    if(el.classList.contains('botao')){
        el.parentElement.remove();
    }
    salvar();
});

function limpaInput(){
    novaTarefa.value = '';
    novaTarefa.focus();
}

novaTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13){
        if(!novaTarefa.value) return;
        criaLi(novaTarefa.value);
        salvar();
    }
});

btn.addEventListener('click', function(){
    if(!novaTarefa.value) return;
    criaLi(novaTarefa.value);
    salvar();
});

function salvar(){
    const tar = tarefas.querySelectorAll('li');
    const array = [];

    for(let tarefa of tar){
        let tarefaArray = tarefa.innerText;
        tarefaArray = tarefaArray.replace('Apagar', '').trim();
        array.push(tarefaArray);
    };

    const stringTarefas = JSON.stringify(array)
    localStorage.setItem('tarefas', stringTarefas);
};

function download(){
    const baixar = localStorage.getItem('tarefas');
    const bx = JSON.parse(baixar);

    for (let b of bx){
        criaLi(b);
    };
};

download();