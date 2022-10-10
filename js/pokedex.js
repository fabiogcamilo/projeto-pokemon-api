let elTiposPokemon
let elInfoPokemonNumero
let elInfoPokemonNome
let elPokedexVisor
let elLuz
let elBotao

window.addEventListener("load", () => {
    pegarElementosTela()
    buscarPokemonEAlterarTela()
})

function pegarElemento(seletor) {
    return document.querySelector(seletor)
}

function pegarElementosTela(){
    elTiposPokemon = pegarElemento("#infoPokemonTipos")
    elInfoPokemonNumero = pegarElemento("#infoPokemonNumero")
    elInfoPokemonNome = pegarElemento("#infoPokemonNome")
    elPokedexVisor = pegarElemento("#pokedex_visor")
    elLuz = pegarElemento(".pokedex__botao")
    elBotao = pegarElemento("#botaoBusca")
}

async function buscarPokemonEAlterarTela() {
    limparResultados()
    await piscarLuz()
    const idPokemon = pegarValorDoInput("#idPokemon")
    const pokemon = await buscarPokemonApi(idPokemon)
    montarTelaComPokemon(pokemon)
}

function limparResultados() {    
    elTiposPokemon.innerHTML = ""
    elInfoPokemonNumero.innerHTML = ""
    elInfoPokemonNome.innerHTML = ""
    elPokedexVisor.innerHTML = ""
}

function sleep(duration){
    return new Promise(r => setTimeout(r, duration * 1000))
}

async function piscarLuz() {
    elBotao.setAttribute("disabled", "true")
    for  (let index = 0; index < 4; index++) {
        await sleep(0.5)
        elLuz.style.backgroundColor = "rgb(102, 102, 201)" // azul claro
        await sleep(0.5)
        elLuz.style.backgroundColor = "rgb(66, 66, 220)" // azul mais forte
    }
    elLuz.style.backgroundColor = "rgb(55, 49, 49)"    
    elBotao.removeAttribute("disabled")
}

function pegarValorDoInput(elementSelector) {
    return document.querySelector(elementSelector).value
}

async function buscarPokemonApi(idPokemon) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + idPokemon
    const response = await fetch(url)
    const responseBody = await response.json()

    return responseBody
}

function montarTelaComPokemon(pokemon) {
    montarNumeroENome(pokemon.id, pokemon.name)
    montarImagem(pokemon.sprites.front_default)
    montarTipos(pokemon.types)
}

function montarNumeroENome(numero, nome) {
    elInfoPokemonNumero.innerHTML = numero
    elInfoPokemonNome.innerHTML = nome
}

function montarImagem(imagem) {
    const imgElement = `<img src='${imagem}'>`
    elPokedexVisor.innerHTML = imgElement
}

function montarTipos(tipos) {
    let tiposElement = ""
    tipos.forEach(tipo => {
        tiposElement += `<div class="tipo tipo_${tipo.type.name}">${tipo.type.name}</div>`
    });

    infoPokemonTipos.innerHTML = tiposElement
}