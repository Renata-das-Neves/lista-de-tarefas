let lista = document.getElementById('listaTarefas');
let entrada = document.getElementById('novaTarefa');

//Carrega tarefas salvas ao abrir
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
renderizarTarefas();

function adicionarTarefa() {
    let texto = entrada.value.trim();
    if (!texto) return;

    tarefas.push({ texto: texto, feita: false });
    salvarERenderizar();
    entrada.value = '';
}

function alternarFeita(indice) {
    tarefas[indice].feita = !tarefas[indice].feita;
    salvarERenderizar();
}

function apagarTarefa(indice) {
    tarefas.splice(indice, 1);
    salvarERenderizar();
}

function salvarERenderizar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
}

function renderizarTarefas() {
    lista.innerHTML = '';
    tarefas.forEach((tarefa, indice) => {
        let li = document.createElement('li');
        li.className = tarefa.feita ? 'feita' : '';
        li.innerHTML = `
            <span>${tarefa.texto}</span>
            <div class="botoes">
                <button class="botao-feito" onclick="alternarFeita(${indice})">✓</button>
                <button class="botao-apagar" onclick="apagarTarefa(${indice})">✕</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

// Permite adicionar apertando Enter
entrada.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') adicionarTarefa();
});
