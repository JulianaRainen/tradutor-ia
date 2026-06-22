// Selecionando elementos da página
let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")
let idioma = document.querySelector(".idioma")


// Função para traduzir texto
async function traduzir() {

    if (inputTexto.value.trim() === "") {
        traducaoTexto.textContent = "Digite um texto para traduzir."
        return
    }

    try {

        let endereco = "https://api.mymemory.translated.net/get?q="
            + encodeURIComponent(inputTexto.value)
            + "&langpair=pt|"
            + idioma.value


        let resposta = await fetch(endereco)

        let dados = await resposta.json()

        traducaoTexto.textContent = dados.responseData.translatedText

    } catch (erro) {

        traducaoTexto.textContent = "Erro ao realizar tradução."
        console.log("Erro:", erro)

    }
}


// Função para reconhecer voz
function ouvirVoz() {

    // Ferramenta de transcrição de áudio
    let voz = window.webkitSpeechRecognition

    let reconhecimentoVoz = new voz()


    // Configurando idioma da fala
    reconhecimentoVoz.lang = "pt-BR"


    // Quando terminar de ouvir
    reconhecimentoVoz.onresult = (evento) => {

        let textoTranscricao = evento.results[0][0].transcript


        // textarea/input usa VALUE
        inputTexto.value = textoTranscricao


        traduzir()
    }


    reconhecimentoVoz.start()
}
