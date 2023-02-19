var todasAsCaixas = document.getElementById("todasAsCaixas")
var vetorProdutos = []
var alerta

//funcoes para alerts fofo
function alertaCadastro(){
    swal({
        position: 'center',
        icon: 'success',
        title: 'Cadastro realizado com sucesso',
        timer: 1500,
        buttons: false,
      })
}

function alertaVazio(frase){
    console.log("Cadastro não realizado")
    swal ({
      title: 'Ops,',
      text: frase,
      icon: 'warning',
      button: true,
      buttonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonText: 'Yes, delete it!'
    })
}

function limparCampos(){
    document.getElementById("nomeDaPeca").value =""
    document.getElementById("peso").value =""
    document.getElementById("quantidade").value =""
}

function cadastrar(){
    var nomeProduto = document.getElementById("nomeDaPeca").value
    var pesoProduto = parseInt(document.getElementById("peso").value)
    var quantidadeProduto = parseInt(document.getElementById("quantidade").value)

    if(quantidadeProduto <=10){
        if(pesoProduto <=100){
            if(nomeProduto.length >=3){
                var produto = new Object
                produto.nome = nomeProduto
                produto.peso = pesoProduto
                produto.quantidade = quantidadeProduto
    
                var jsonForm = JSON.stringify(produto.valueOf());
                const informacaoProduto = JSON.parse(jsonForm);
                
                vetorProdutos.push(informacaoProduto)
                console.log("Cadastro realizado")
                console.log(vetorProdutos)

                limparCampos()
                alertaCadastro()

                return;
    
            }else{
                alerta = "O nome da peça está incorreto"
                alertaVazio(alerta)
                return;
            }
        }else{
            alerta = "Peso da peça invalido"
            alertaVazio(alerta)
            return;
        }
    }else{
        alerta = "Quantidade de pecas invalida"
        alertaVazio(alerta)
        return;
    } 
}

//contar quantidade total de cada item
function totalEstoque(){
    var vetorTotalEstoque = []
    for(a=0; a<vetorProdutos.length; a++){
        var cadastrado = false;
        //verifica se o produto já existe
        for(b=0; b<vetorTotalEstoque.length; b++){
            console.log("entrou")
            if(cadastrado == false && vetorProdutos[a].nome == vetorTotalEstoque[b].nome && vetorProdutos[a].peso == vetorTotalEstoque[b].peso){
                console.log("cadastrando: "+ vetorProdutos[a].quantidade);
                vetorTotalEstoque[b].quantidade += vetorProdutos[a].quantidade
                cadastrado == true;
                break;
            }else{
                //caso não exista
                if(cadastrado == false && b==vetorTotalEstoque.length-1){
                    console.log("cadastrando: "+ vetorProdutos[a].nome +"com: "+ vetorProdutos[a].quantidade);
                    var estoqueProduto = new Object
                        estoqueProduto.nome = vetorProdutos[a].nome 
                        estoqueProduto.peso = vetorProdutos[a].peso
                        estoqueProduto.quantidade = vetorProdutos[a].quantidade
    
                    var jsonForma = JSON.stringify(estoqueProduto.valueOf());
                    const novoProduto = JSON.parse(jsonForma);

                    vetorTotalEstoque.push(novoProduto)
                    cadastrado = true;
                }
            }   
        }
        //cadastrando primeiro produto no estoque total
        if(vetorTotalEstoque.length == 0){
            console.log("primeiro cadastrado: "+ vetorProdutos[a].nome +" com: "+ vetorProdutos[a].quantidade);
            var estoqueProduto = new Object
                estoqueProduto.nome = vetorProdutos[a].nome 
                estoqueProduto.peso = vetorProdutos[a].peso
                estoqueProduto.quantidade = vetorProdutos[a].quantidade
    
            var jsonForma = JSON.stringify(estoqueProduto.valueOf());
            const novoProduto = JSON.parse(jsonForma);

            vetorTotalEstoque.push(novoProduto)
            cadastrado = true;
        }
    }
    console.log(vetorTotalEstoque)

    //Para exibir na tela
    const area = document.getElementById("areaEstoqueTotal")
    area.innerHTML=""
    for(c=0; c<vetorTotalEstoque.length; c++){
        area.innerHTML += "<div class='caixa'><div class='caixaFrente'><p>Produto: "+ vetorTotalEstoque[c].nome + "</p><p>Peso un.: " + vetorTotalEstoque[c].peso + "g.</p><p>Quantidade: "+vetorTotalEstoque[c].quantidade+"</p><p>Peso total: "+ vetorTotalEstoque[c].quantidade*vetorTotalEstoque[c].peso +"g.</p></div></div>"
    }
}

function listagemProdutos(){
    //Para exibir na tela
    const area = document.getElementById("areaEstoqueTotal")
    area.innerHTML=""
    for(d=0; d<vetorProdutos.length; d++){
        area.innerHTML += "<div class='caixa'><div class='caixaFrente'><p>Número da caixa: "+(d+1)+"</p><p>Produto: "+ vetorProdutos[d].nome + "</p><p>Peso un.: " + vetorProdutos[d].peso + "g.</p><p>Quantidade: "+vetorProdutos[d].quantidade+"</p></div></div>"
    }
}
