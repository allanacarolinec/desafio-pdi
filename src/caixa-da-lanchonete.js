class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const cardapio = [
      { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
      { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
      { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
      { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
      { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
      { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
      { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
      { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
    ];

    var total = 0;
    var sanduichePedido = false;
    var cafePedido = false;

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    if (metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'dinheiro') {
      return "Forma de pagamento inválida!";
    }

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(',');

      const item = cardapio.find((item) => item.codigo === codigo);

      if (!item) {
        return "Item inválido!";
      }

      if (codigo === 'sanduiche') {
        sanduichePedido = true;
      } else if (codigo === 'cafe') {
        cafePedido = true;
      }

      total += item.valor * quantidade;
    }

    if (!sanduichePedido && itens.some((item) => item.startsWith('queijo'))) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (!cafePedido && itens.some((item) => item.startsWith('chantily'))) {
      return "Item extra não pode ser pedido sem o principal";
    }

    if (total === 0) {
      return "Quantidade inválida!";
    }

    if (metodoDePagamento === 'credito') {
      const acrescimoCredito = total * 0.03;
      total += acrescimoCredito;
    } else if (metodoDePagamento === 'dinheiro') {
      const descontoDinheiro = total * 0.05;
      total -= descontoDinheiro;
    }

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
