let inputTexto = document.querySelector(".input-texto")
let traducaoTexto = document.querySelector(".traducao")
let idioma = document.querySelector(".idioma")

async function traduzir() {

    let endereco = "https://api.mymemory.translated.net/get?q="
        + inputTexto.value
        + "&langpair=pt-BR|"
        + idioma.value

    
    let resposta = await fetch(endereco)

    
    let dados = await resposta.json()

    traducaoTexto.textContent = dados.responseData.translatedText

    // textContent = conteudo do texto
}

function ouvirVoz() {
    
    let voz = window.webkitSpeechRecognition

       
    let reconhecimentoVoz = new voz()

    
    reconhecimentoVoz.lang = "pt-BR"

    reconhecimentoVoz.onresult = (evento) => {
        let textoTranscricao = evento.results[0][0].transcript

        inputTexto.textContent = textoTranscricao

        traduzir()
    }

    reconhecimentoVoz.start()

}


