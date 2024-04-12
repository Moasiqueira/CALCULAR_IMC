// IMC
// 1. CAPTURAR VALORES
// 2. CALCULAR O IMC
// 3. GERAR CLASSIFICAÇÃO DO IMC
// 4. ORGANIZAR AS INFORMAÇÕES
// 5. SALVAR OS DADOS NA LISTA
// 6. LER A LISTA COM DADOS 
// 7. REDERIZAR O CONTYEUDO  NO HTML(TABELA)
// 8. BOTÃO DE LIMPAR OS REGISTROS (CLEAR(LOCALSTORAGE))

function CapturarValores(){
    // VARIAVEL   DOCUMENT: REFERENCIA AO HTML/ GETELEMENTBYID = CHAMAR A ID/ () NOME DA ID DENTRO DAS CHAVES // VALUE = CHAMAR OS DADOS
    const nome = document.getElementById('name').value;
    const altura = document.getElementById('height').value;
    const peso = document.getElementById('weight').value;

    const dadosUsuario = {
        nome: nome,
        altura: altura,
        peso: peso 
    }
    
    return dadosUsuario;
}

function CalcularImc(altura, peso){
    const imc = peso / (altura * altura)

    return imc
}

function ClassificarImc(imc){
    if(imc < 18.5){
        return " abaixo do peso!"
    } else if (imc < 25){
        return "peso normal!"
    } else if (imc < 30){
        return "sobrepeso"
    } else{
        return "obesidade"
    }
}

function OrganizarDados(dadosUsuario, valorImc, classificacaoImc){
    const dataHoraAtual = Intl.DateTimeFormat('pt-BR',{timeStyle: 'long', dateStyle: 'short'}).format(Date.now());

    const dadosUsuarioCompleto = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual}

        return dadosUsuarioCompleto;
}
