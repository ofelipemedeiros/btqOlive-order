export default function () {
  return {
    order: {
      id: Math.floor(Math.random() * 10000),
      orderItems: [],
      subtotal:0,
      tipoTaxa: {
        desconto:0,
        dellivery:0
      },
      txDellivery: 0,
      desconto: 0,
      total: 0
    },
  }
}
