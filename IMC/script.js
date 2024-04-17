// IMC
// 1. CAPTURAR VALORES
// 2. CALCULAR O IMC
// 3. GERAR CLASSIFICAÇÃO DO IMC
// 4. ORGANIZAR AS INFORMAÇÕES
// 5. SALVAR OS DADOS NA LISTA
// 6. LER A LISTA COM DADOS 
// 7. REDERIZAR O CONTYEUDO  NO HTML(TABELA)
// 8. BOTÃO DE LIMPAR OS REGISTROS (CLEAR(LOCALSTORAGE))


   // RESPONSAVEL POR CHAMRA TODAS AS OUTRAS FUNÇOES

   function CalcularValores(event) {
    event.preventDefault();

    let dadosUsuario = CapturarValores();

    let imc = CalcularImc(dadosUsuario.altura, dadosUsuario.peso);

    let classificacao = ClassificarImc(imc);

    let dadosUsuariosCompleto  = OrganizarDados(dadosUsuario, imc, classificacao);

    cadastrarUsuario(dadosUsuariosCompleto);

    window.location.reload();
}


// 1. CAPTURAR VALORES
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

// 2. CALCULAR O IMC
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

// 4. ORGANIZAR AS INFORMAÇÕES
function OrganizarDados(dadosUsuario, valorImc, classificacaoImc){
    const dataHoraAtual = Intl.DateTimeFormat('pt-BR',{timeStyle: 'long', dateStyle: 'short'}).format(Date.now());

    const dadosUsuarioCompleto = {
        ...dadosUsuario,
        imc: valorImc.toFixed(2),
        classificacaoImc: classificacaoImc,
        dataCadastro: dataHoraAtual
    }

        return dadosUsuarioCompleto;
}

// 5. SALVAR OS DADOS NA LISTA
function cadastrarUsuario(usuario) {
    // CRIA UM ARRAY VAZIO PARA ARMAZENAR OS VALORES DO USUARIO
    let listaUsuario = [];

    // VERIFICA SE DENTRO DO LOCALSTORAGE EU TENHO AS INFORMAÇOES DO USUARIO
    if (localStorage.getItem("usuariosCadastrados")) {
        // SE SIM, EU GUARDO AS INFORMAÇOES DENTRO DO ARRAY
        //parse => de JSON para object
        listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
    }
    // CADASTRAR USUARIO DENTRO DO ARRAY
    listaUsuario.push(usuario)
    
    // CASO CONTRARIO, EU CRIO UM NOVO ITENM NO LOCALSTORAGE
    //stringfy => objeto para JSON
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario))
}

// 6. LER A LISTA COM DADOS 
function carregarUsuarios() {
     
    let listaUsuario = [];

    if (localStorage.getItem("usuariosCadastrados")) {

    listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));    
    }
    
    if (listaUsuario.length == 0) {
        let tabela = document.getElementById('corpo-tabela');

        tabela.innerHTML = `
        <tr class="linha-mensagem">
            <td colspan='6' > Nenhum usuário cadastrado </td>
        </tr>
        `
    }else{
        montarTabela(listaUsuario)
    }
}

    window.addEventListener('DOMContentLoaded',() => carregarUsuarios())


    // 7. REDERIZAR O CONTYEUDO  NO HTML(TABELA)

    function montarTabela(listaDeCadastrados) {
        let tabela = document.getElementById('corpo-tabela')

        let template = "";

        listaDeCadastrados.forEach(pessoa => {
            template += `
                <tr> 
                    <td data-cell="nome" > ${pessoa.nome}</td>
                    <td data-cell="altura"> ${pessoa.altura}</td>
                    <td data-cell="peso"> ${pessoa.peso}</td>
                    <td data-cell="imc"> ${pessoa.imc}</td>
                    <td data-cell="classificacao"> ${pessoa.classificacaoImc}</td>
                    <td data-cell="dataCadastro"> ${pessoa.dataCadastro}</td>  
                 </tr>
            `            
        });
     tabela.innerHTML = template;
    }

    // 8. BOTÃO DE LIMPAR OS REGISTROS (CLEAR(LOCALSTORAGE))

    function deletarRegistros () {

        localStorage.clear();
         
        window.location.reload();
        
    }