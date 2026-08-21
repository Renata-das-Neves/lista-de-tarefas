// Pega os elementos da página — CONFERE os IDs no HTML!
let lista = document.getElementById('listaTarefas');
let entrada = document.getElementById('novaTarefa');

// Carrega tarefas salvas
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
renderizarTarefas();

// Adicionar tarefa
function adicionarTarefa() {
    let texto = entrada.value.trim();
    if (!texto) {
        alert('Digite uma tarefa!');
        return;
    }

    tarefas.push({ texto: texto, feita: false });
    salvarERenderizar();
    entrada.value = '';
}

// Marcar como feita
function alternarFeita(indice) {
    tarefas[indice].feita = !tarefas[indice].feita;
    salvarERenderizar();
}

// Apagar tarefa
function apagarTarefa(indice) {
    tarefas.splice(indice, 1);
    salvarERenderizar();
}

// Salvar e atualizar
function salvarERenderizar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizarTarefas();
}

// Mostrar tarefas na tela — CÓDIGO CORRIGIDO!
function renderizarTarefas() {
    lista.innerHTML = ''; // Limpa a lista primeiro

    tarefas.forEach((tarefa, indice) => { // ✅ SINAL CORRETO: =>
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

// Adicionar com ENTER
entrada.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});
