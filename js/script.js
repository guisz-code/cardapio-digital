const divProdutos = document.getElementById("produtos");
const listaPedido = document.getElementById("pedido");
const textoTotal = document.getElementById("total");
const btnFinalizar = document.getElementById("btnFinalizar");

const produtos = [
  { nome: "X-Burguer", categoria: "hamburguer", descricao: "Pão, hambúrguer, queijo, alface e tomate.", preco: 18.9, imagem: "https://images.unsplash.com/photo-1670237734838-821685a738b2?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "X-Bacon", categoria: "hamburguer", descricao: "Pão, hambúrguer, queijo e bacon crocante.", preco: 22.5, imagem: "https://images.unsplash.com/photo-1688246780164-00c01647e78c?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "Pizza Calabresa", categoria: "pizza", descricao: "Molho, mussarela, calabresa e cebola.", preco: 39.9, imagem: "https://images.unsplash.com/photo-1542282811-943ef1a977c3?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "Pizza Margherita", categoria: "pizza", descricao: "Molho, mussarela, tomate e manjericão.", preco: 36, imagem: "https://images.unsplash.com/photo-1595026506669-1e937fc6b9e6?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "Refrigerante", categoria: "bebida", descricao: "Lata de 350ml gelada.", preco: 6, imagem: "https://images.unsplash.com/photo-1655604646075-ff7c8918e665?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "Suco de Laranja", categoria: "bebida", descricao: "Suco natural de 400ml.", preco: 8.5, imagem: "https://images.unsplash.com/photo-1650316710473-8b2ecdcd2b10?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "Pudim", categoria: "sobremesa", descricao: "Pudim de leite com calda de caramelo.", preco: 9, imagem: "https://images.unsplash.com/photo-1544052387-2f094663cd94?fm=jpg&q=60&w=400&auto=format&fit=crop" },
  { nome: "Sorvete", categoria: "sobremesa", descricao: "Duas bolas com calda de chocolate.", preco: 12, imagem: "https://images.unsplash.com/photo-1563252781-2f76e089e889?fm=jpg&q=60&w=400&auto=format&fit=crop" }
];

let pedido = [];

function mostrarProdutos(categoria) {
  divProdutos.innerHTML = "";

  produtos.forEach((produto, index) => {
    if (categoria !== "todos" && produto.categoria !== categoria) {
      return;
    }

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = produto.imagem;
    img.alt = produto.nome;

    const info = document.createElement("div");
    info.classList.add("info");

    const nome = document.createElement("h3");
    nome.textContent = produto.nome;

    const descricao = document.createElement("p");
    descricao.textContent = produto.descricao;

    const preco = document.createElement("span");
    preco.classList.add("preco");
    preco.textContent = "R$ " + produto.preco.toFixed(2);

    const botao = document.createElement("button");
    botao.classList.add("btnadd");
    botao.textContent = "Adicionar ao pedido";
    botao.addEventListener("click", () => adicionar(index));

    info.appendChild(nome);
    info.appendChild(descricao);
    info.appendChild(preco);
    info.appendChild(botao);

    card.appendChild(img);
    card.appendChild(info);
    divProdutos.appendChild(card);
  });
}

function mostrarPedido() {
  listaPedido.innerHTML = "";
  let total = 0;

  pedido.forEach((item, index) => {
    total += item.preco * item.quantidade;

    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = item.nome + " - R$ " + (item.preco * item.quantidade).toFixed(2) + " ";

    const menos = document.createElement("button");
    menos.textContent = "-";
    menos.addEventListener("click", () => diminuir(index));

    const qtd = document.createElement("span");
    qtd.textContent = " " + item.quantidade + " ";

    const mais = document.createElement("button");
    mais.textContent = "+";
    mais.addEventListener("click", () => aumentar(index));

    const remover = document.createElement("button");
    remover.textContent = "X";
    remover.classList.add("remover");
    remover.addEventListener("click", () => remove(index));

    li.appendChild(texto);
    li.appendChild(menos);
    li.appendChild(qtd);
    li.appendChild(mais);
    li.appendChild(remover);
    listaPedido.appendChild(li);
  });

  textoTotal.textContent = "Total: R$ " + total.toFixed(2);
}

function filtrar(categoria) {
  mostrarProdutos(categoria);
}

function adicionar(index) {
  const produto = produtos[index];

  
  for (let i = 0; i < pedido.length; i++) {
    if (pedido[i].nome === produto.nome) {
      pedido[i].quantidade++;
      mostrarPedido();
      return;
    }
  }

  pedido.push({
    nome: produto.nome,
    preco: produto.preco,
    quantidade: 1
  });

  mostrarPedido();
}

function aumentar(index) {
  pedido[index].quantidade++;
  mostrarPedido();
}

function diminuir(index) {
  pedido[index].quantidade--;

  if (pedido[index].quantidade === 0) {
    pedido.splice(index, 1);
  }

  mostrarPedido();
}

function remove(index) {
  pedido.splice(index, 1);
  mostrarPedido();
}

function finalizar() {
  if (pedido.length === 0) {
    alert("O pedido está vazio!");
    return;
  }

  let resumo = "Resumo do pedido:\n\n";
  let total = 0;

  pedido.forEach((item) => {
    resumo += item.quantidade + "x " + item.nome + " - R$ " + (item.preco * item.quantidade).toFixed(2) + "\n";
    total += item.preco * item.quantidade;
  });

  resumo += "\nTotal: R$ " + total.toFixed(2);
  resumo += "\n\nConfirmar pedido?";

  if (confirm(resumo)) {
    alert("Pedido finalizado! Obrigado!");
    pedido = [];
    mostrarPedido();
  }
}

btnFinalizar.addEventListener("click", finalizar);

mostrarProdutos("todos");
mostrarPedido();
