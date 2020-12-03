
const addProduto = (state, payload) => {
    state.order.orderItems.push(payload)
    
}

const addTaxa = (state, payload) => {
    if(payload.tipo.includes("desconto")){
        state.order.tipoTaxa.desconto=payload.valor
    }else if(payload.tipo.includes("txdellivery")){
        state.order.tipoTaxa.dellivery=payload.valor
    }
}


export {
    addProduto,
    addTaxa
}
