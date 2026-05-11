const btnEntrar = document.getElementById("btn-entrar");
const btnEnviar = document.getElementById("btn-enviar");
const telaLogin = document.getElementById("tela-login");
const telaApresentacao = document.getElementById("apresentacao");
const telaChat = document.getElementById("tela-chat");
const areaMensagens = document.getElementById("area-mensagens");
const nomeChatAtual = document.getElementById("nome-chat-atual");
const inputMensagem = document.getElementById("mensagem-nova");

let usuarioLogado = ""; 
let chatAtivo = "Geral";

const usuarios = [
    {usuario: "mimmarcelo", senha: "Teste123"},
    {usuario: "K", senha: "2500"},
    {usuario: "Yuki", senha: "2500"},
    {usuario: "Enanan", senha: "2500"},
    {usuario: "Amia", senha: "2500"}
];

const coresUsuarios = {
    "mimmarcelo": "#2D8349",
    "K": "#BB6688",
    "Yuki": "#8888CC",
    "Enanan": "#CCAA88",     
    "Amia": "#DDAACC"
};

const todasAsMensagens = [
    { de: "K", para: "Geral", texto: "Terminei o arranjo da música. O que acham?" },
    { de: "Yuki", para: "Geral", texto: "Vou escrever a letra. Não sinto inspiração ainda, mas vou tentar." },
    { de: "Amia", para: "Geral", texto: "Ficou incrível, K! Vou começar a editar o vídeo da música agora mesmo!" },
    { de: "Enanan", para: "Geral", texto: "Vou refazer a ilustração. A última não teve curtidas o suficiente..." },
    { de: "mimmarcelo", para: "Geral", texto: "Bom trabalho, pessoal. Lembrem-se de documentar o processo criativo para o relatório." },
    { de: "Yuki", para: "K", texto: "K, por que você ainda tenta me salvar?" },
    { de: "K", para: "Yuki", texto: "Porque eu sei que a sua música ainda está aí dentro, Yuki." },    
    { de: "K", para: "Enanan", texto: "Enanan, não se cobre tanto. Seu desenho está lindo." },
    { de: "Enanan", para: "K", texto: "Obrigada, K... Vou tentar não apagar tudo de novo." },
    { de: "Amia", para: "K", texto: "K! Você comeu hoje? Não vale ser só macarrão instantâneo!" },
    { de: "K", para: "Amia", texto: "Eu... esqueci. Vou procurar algo na cozinha agora." },
    { de: "mimmarcelo", para: "K", texto: "Kanade, como está o progresso da melodia para o projeto?" },
    { de: "K", para: "mimmarcelo", texto: "Está quase pronto, professor. Só falta ajustar o tempo da música." },
    { de: "Enanan", para: "Yuki", texto: "Você foi grossa no chat geral de novo. Sabia?" },
    { de: "Yuki", para: "Enanan", texto: "Eu só disse a verdade. Não entendo por que isso te irrita." },    
    { de: "Yuki", para: "Amia", texto: "Amia, por que você está sempre sorrindo?" },
    { de: "Amia", para: "Yuki", texto: "Segredo! Mas ver coisas fofas ajuda, sabia? Deveria tentar." },
    { de: "Yuki", para: "mimmarcelo", texto: "Entreguei a análise poética, professor. Está correta?" },
    { de: "mimmarcelo", para: "Yuki", texto: "Excelente análise, Mafuyu. Sua percepção técnica é impecável." },
    { de: "Amia", para: "Enanan", texto: "Enanan! Vi sua foto nova! Ficou super estilosa!" },
    { de: "Enanan", para: "Amia", texto: "Sério? Demorei uma hora para escolher o ângulo... obrigada!" },
    { de: "Enanan", para: "mimmarcelo", texto: "Professor, posso usar uma técnica de sombreamento diferente no desenho para a entrega?" },
    { de: "mimmarcelo", para: "Enanan", texto: "Pode sim, Ena. A experimentação artística faz parte da nota." },
    { de: "mimmarcelo", para: "Amia", texto: "Mizuki, lembre dos prazos da edição de vídeo." },
    { de: "Amia", para: "mimmarcelo", texto: "Pode deixar, prof! Vou entregar tudo bem colorido e no prazo!"}
];

btnEntrar.addEventListener("click", function() {
    const userIn = document.getElementById("usuario").value;
    const passIn = document.getElementById("senha").value;
    const encontrado = usuarios.find(u => u.usuario === userIn && u.senha === passIn);

    if (encontrado) {
        usuarioLogado = encontrado.usuario;
        telaLogin.style.display = "none";
        telaApresentacao.style.display = "none";
        telaChat.style.display = "block";
        atualizarBotoesContatos();
        carregarChat("Geral");
    } else {
        alert("Acesso negado! Verifique usuário e senha.");
    }
});

function atualizarBotoesContatos() {
    const botoes = ["btn-k", "btn-yuki", "btn-enanan", "btn-amia", "btn-mimmarcelo"];
    botoes.forEach(id => document.getElementById(id).style.display = "block");
    const btnProfessor = document.getElementById("btn-mimmarcelo");
    if (usuarioLogado === "mimmarcelo") {
        btnProfessor.style.display = "none";
    } else {
        const idProprio = "btn-" + usuarioLogado.toLowerCase();
        if (document.getElementById(idProprio)) {
            document.getElementById(idProprio).style.display = "none";
        }
    }
}

function carregarChat(idDestino) {
    chatAtivo = idDestino;
    nomeChatAtual.innerText = idDestino === "Geral" ? "Chat Geral" : `DM com: ${idDestino}`;
    areaMensagens.innerHTML = "";
    inputMensagem.value = "";
    const mensagensVisiveis = todasAsMensagens.filter(msg => {
        if (idDestino === "Geral") {
            return msg.para === "Geral";
        } else {
            return (msg.de === usuarioLogado && msg.para === idDestino) || 
                   (msg.de === idDestino && msg.para === usuarioLogado);
        }
    });
    mensagensVisiveis.forEach(msg => adicionarMensagemNaTela(msg.de, msg.texto));
}

function adicionarMensagemNaTela(remetente, texto) {
    const p = document.createElement("p");
    p.classList.add("balao-chat");
    p.style.backgroundColor = coresUsuarios[remetente] || "#713EA8";
    p.innerHTML = `<strong>${remetente === usuarioLogado ? "Você" : remetente}:</strong> ${texto}`;
    areaMensagens.appendChild(p);
    areaMensagens.scrollTop = areaMensagens.scrollHeight;
}

btnEnviar.addEventListener("click", function() {
    if (inputMensagem.value.trim() !== "") {
        const novaMsg = { de: usuarioLogado, para: chatAtivo, texto: inputMensagem.value };
        todasAsMensagens.push(novaMsg);
        adicionarMensagemNaTela(usuarioLogado, inputMensagem.value);
        inputMensagem.value = "";
    }
});

inputMensagem.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        btnEnviar.click();
    }
});

document.getElementById("btn-geral").onclick = () => carregarChat("Geral");
document.getElementById("btn-mimmarcelo").onclick = () => carregarChat("mimmarcelo");
document.getElementById("btn-k").onclick = () => carregarChat("K");
document.getElementById("btn-yuki").onclick = () => carregarChat("Yuki");
document.getElementById("btn-enanan").onclick = () => carregarChat("Enanan");
document.getElementById("btn-amia").onclick = () => carregarChat("Amia");