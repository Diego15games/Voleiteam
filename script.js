let fila = [];
let jogando = [];

// Abas
const menus = document.querySelectorAll(".menu");
const paginas = document.querySelectorAll(".pagina");

// Troca de telas
menus.forEach(botao => {

    botao.addEventListener("click", () => {

        menus.forEach(b => b.classList.remove("ativo"));
        paginas.forEach(p => p.classList.remove("ativa"));

        botao.classList.add("ativo");

        const pagina = document.getElementById(botao.dataset.page);

        pagina.classList.add("ativa");

    });

});

// Conteúdo inicial das páginas

document.getElementById("jogadores").innerHTML = `

<div class="card">

<h2>👥 Jogadores</h2>

<input
type="text"
id="nomeJogador"
placeholder="Nome do jogador">

<button id="btnAdicionar">

➕ Adicionar Jogador

</button>

<p id="contador">

Jogadores: 0

</p>

</div>

<div class="card">

<div id="listaJogadores">

Nenhum jogador cadastrado.

</div>

</div>

`;

document.getElementById("sorteio").innerHTML = `

<div class="card cardConfig">

    <div class="topoConfig">

        <div class="menuConfig" id="btnConfig">
            ⋮
        </div>

    </div>

    <div id="menuConfiguracoes" style="display:none; margin-top:15px;">

        <label>Jogadores por time</label>
        <input type="number" id="jogadoresTime" value="6" min="1">

        <label>Levantadores por time</label>
        <input type="number" id="levantadoresTime" value="1" min="0">

        <label>Meninas por time</label>
        <input type="number" id="meninasTime" value="0" min="0">

        <button id="btnSortear">
            🎲 Sortear Times
        </button>

    </div>

</div>

<div class="areaTimes">

    <div class="card">
        <h3>🔵 Time Azul</h3>
        <div id="timeAzul">Nenhum sorteio.</div>
    </div>

    <div class="card">
        <h3>🔴 Time Vermelho</h3>
        <div id="timeVermelho">Nenhum sorteio.</div>
    </div>

    <div class="card">
        <h3>⏳ Fila de Espera</h3>
        <div id="filaEspera">Nenhum jogador.</div>
    </div>

</div>

`;

document.getElementById("btnConfig").onclick = () => {

    const menu = document.getElementById("menuConfiguracoes");

    menu.style.display =
        menu.style.display === "block"
        ? "none"
        : "block";

};

document.getElementById("placar").innerHTML = `

<div class="card">

<h2>🏐 Configuração da Partida</h2>

<label>Pontos para vencer</label>

<select id="limitePontos">

<option value="15">15</option>

<option value="21">21</option>

<option value="25" selected>25</option>

<option value="personalizado">Personalizado</option>

</select>

<input
type="number"
id="pontosPersonalizado"
placeholder="Digite a quantidade"
style="display:none;"
min="1">

<button id="iniciarPartida">

▶️ Iniciar Partida

</button>

</div>

<div id="areaPlacar" style="display:none;">

<div class="placarHorizontal">

<div class="time" id="timeAzulPlacar">

<h3>🔵 Azul</h3>

<div id="pontosAzul" class="numero">0</div>

</div>

<div class="xplacar">

X

</div>

<div class="time" id="timeVermelhoPlacar">

<h3>🔴 Vermelho</h3>

<div id="pontosVermelho" class="numero">0</div>

</div>

</div>

<button id="desfazerPonto">

↩️ Desfazer ponto

</button>

</div>

`;

document.getElementById("ranking").innerHTML = `

<div class="card">

<h2>🏆 Ranking</h2><br>

<p>

Nenhuma partida registrada.

</p>

</div>

`;

// ==========================
// JOGADORES
// ==========================

let jogadores =
JSON.parse(localStorage.getItem("jogadores")) || [];

const lista =
document.getElementById("listaJogadores");

const contador =
document.getElementById("contador");

const nome =
document.getElementById("nomeJogador");

document
.getElementById("btnAdicionar")
.onclick = adicionarJogador;

function salvarJogadores(){

localStorage.setItem(
"jogadores",
JSON.stringify(jogadores)
);

}

let jogadorEditando = -1;

const modal = document.getElementById("modalEditar");
const editNome = document.getElementById("editNome");
const editSexo = document.getElementById("editSexo");
const editLevantador = document.getElementById("editLevantador");

function atualizarJogadores(){

    contador.innerHTML = "Jogadores: " + jogadores.length;

    if(jogadores.length === 0){
        lista.innerHTML = "Nenhum jogador cadastrado.";
        return;
    }

    lista.innerHTML = "";

    jogadores.forEach((j,index)=>{

        lista.innerHTML += `

        <div class="jogador">

            <div class="infoJogador">

                <div class="nomeJogador">
                    👤 ${j.nome}
                </div>

                <div class="detalhes">
                    ${j.sexo=="M" ? "🚹 Masculino" : "🚺 Feminino"}
                    <br>
                    ${j.levantador ? "🏐 Levantador" : ""}
                </div>

            </div>

            <div class="acoes">

                <button class="btnIcone editar" onclick="editar(${index})">
                    ✏️
                </button>

                <button class="btnIcone excluir" onclick="excluir(${index})">
                    🗑️
                </button>

            </div>

        </div>

        `;

    });

}

function adicionarJogador(){

let n =
nome.value.trim();

if(n=="") return;

if(jogadores.some(x=>x.nome.toLowerCase()==n.toLowerCase())){

alert("Esse jogador já existe.");

return;

}

jogadores.push({

nome:n,

sexo:"M",

levantador:false

});

nome.value="";

salvarJogadores();

atualizarJogadores();

}

function excluir(i){

if(!confirm("Excluir jogador?")) return;

jogadores.splice(i,1);

salvarJogadores();

atualizarJogadores();

}

function editar(i){

    jogadorEditando = i;

    editNome.value = jogadores[i].nome;

    editSexo.value = jogadores[i].sexo;

    editLevantador.checked = jogadores[i].levantador;

    modal.classList.add("ativo");

}

atualizarJogadores();

document.getElementById("cancelarEditar").onclick = () => {

    modal.classList.remove("ativo");

};

document.getElementById("salvarJogador").onclick = () => {

    let nomeNovo = editNome.value.trim();

    if(nomeNovo==""){
        alert("Digite um nome.");
        return;
    }

    if(jogadores.some((j,i)=>i!=jogadorEditando && j.nome.toLowerCase()==nomeNovo.toLowerCase())){
        alert("Esse nome já existe.");
        return;
    }

    jogadores[jogadorEditando].nome = nomeNovo;
    jogadores[jogadorEditando].sexo = editSexo.value;
    jogadores[jogadorEditando].levantador = editLevantador.checked;

    salvarJogadores();
    atualizarJogadores();

    modal.classList.remove("ativo");

};

function embaralhar(lista){

    let copia = [...lista];

    for(let i=copia.length-1;i>0;i--){

        let j = Math.floor(Math.random()*(i+1));

        [copia[i],copia[j]] = [copia[j],copia[i]];

    }

    return copia;

}

document.getElementById("btnSortear").onclick = ()=>{

    let qtd = Number(document.getElementById("jogadoresTime").value);

    let azulDiv = document.getElementById("timeAzul");
    let vermelhoDiv = document.getElementById("timeVermelho");
    let filaDiv = document.getElementById("filaEspera");

    azulDiv.classList.add("animando");
    vermelhoDiv.classList.add("animando");

    let tempo = 0;

    let efeito = setInterval(()=>{

        let nomes = embaralhar(jogadores);

        azulDiv.innerHTML =
            nomes.slice(0,qtd).map(j=>"🏐 "+j.nome).join("<br>");

        vermelhoDiv.innerHTML =
            nomes.slice(qtd,qtd*2).map(j=>"🏐 "+j.nome).join("<br>");

        tempo++;

        if(tempo>=15){

            clearInterval(efeito);

            azulDiv.classList.remove("animando");
            vermelhoDiv.classList.remove("animando");
            
let sorteados = [];

// Primeira partida
if (fila.length == 0 && jogando.length == 0) {

    sorteados = embaralhar(jogadores);

} else {

    // Quem estava na fila entra primeiro
    sorteados = [...fila];

    // Quem não está na fila
    let restantes = embaralhar(
        jogadores.filter(j =>
            !fila.some(f => f.nome == j.nome)
        )
    );

    while (sorteados.length < jogadores.length && restantes.length) {

        sorteados.push(restantes.shift());

    }

}

let azul = sorteados.slice(0, qtd);
let vermelho = sorteados.slice(qtd, qtd * 2);
let espera = sorteados.slice(qtd * 2);

fila = [...espera];
jogando = [...azul, ...vermelho];

azulDiv.innerHTML =
    azul.length
        ? azul.map(j => "🏐 " + j.nome).join("<br>")
        : "Nenhum jogador.";

vermelhoDiv.innerHTML =
    vermelho.length
        ? vermelho.map(j => "🏐 " + j.nome).join("<br>")
        : "Nenhum jogador.";

filaDiv.innerHTML =
    espera.length
        ? espera.map(j => "👤 " + j.nome).join("<br>")
        : "Nenhum jogador na fila.";

        }

    },120);

};

let pontosAzul = 0;
let pontosVermelho = 0;
let historico = [];

document.getElementById("limitePontos").onchange = function(){

    document.getElementById("pontosPersonalizado").style.display =
        this.value=="personalizado" ? "block" : "none";

};

document.getElementById("iniciarPartida").onclick = ()=>{

    pontosAzul = 0;
    pontosVermelho = 0;
    historico = [];

    document.getElementById("pontosAzul").innerHTML = "0";
    document.getElementById("pontosVermelho").innerHTML = "0";

    document.getElementById("areaPlacar").style.display = "block";

};

function limite(){

    let valor = document.getElementById("limitePontos").value;

    if(valor=="personalizado"){

        return Number(document.getElementById("pontosPersonalizado").value);

    }

    return Number(valor);

}

document.getElementById("pontosAzul").onclick = ()=>{

    pontosAzul++;

    historico.push("azul");

    document.getElementById("pontosAzul").innerHTML = pontosAzul;

    verificarFim();

};

document.getElementById("pontosVermelho").onclick = ()=>{

    pontosVermelho++;

    historico.push("vermelho");

    document.getElementById("pontosVermelho").innerHTML = pontosVermelho;

    verificarFim();

};

document.getElementById("desfazerPonto").onclick = ()=>{

    let ultimo = historico.pop();

    if(!ultimo) return;

    if(ultimo=="azul"){

        pontosAzul--;

        document.getElementById("pontosAzul").innerHTML = pontosAzul;

    }else{

        pontosVermelho--;

        document.getElementById("pontosVermelho").innerHTML = pontosVermelho;

    }

};

function verificarFim(){

    let max = limite();

    if(max<=0) return;

    if(pontosAzul>=max || pontosVermelho>=max){

        setTimeout(()=>{

            if(confirm("🏁 Fim da partida!\n\nOK = Nova partida\nCancelar = Desfazer ponto")){

                pontosAzul = 0;
                pontosVermelho = 0;
                historico = [];

                document.getElementById("pontosAzul").innerHTML = "0";
                document.getElementById("pontosVermelho").innerHTML = "0";

            }else{

                document.getElementById("desfazerPonto").click();

            }

        },100);

    }

}

let paginaAtual = "jogadores";

menus.forEach(botao => {
    botao.addEventListener("click", () => {
        paginaAtual = botao.dataset.page;
    });
});

window.addEventListener("orientationchange", () => {
    setTimeout(() => {

        paginas.forEach(p => p.classList.remove("ativa"));
        menus.forEach(b => b.classList.remove("ativo"));

        document.getElementById(paginaAtual).classList.add("ativa");

        document
            .querySelector(`.menu[data-page="${paginaAtual}"]`)
            .classList.add("ativo");

    }, 200);
});