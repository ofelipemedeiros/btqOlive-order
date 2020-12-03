

const ValorSubtotal = (state) => {
    return state.order.orderItems.map(p => p.preco * p.peso)
    .reduce((total, atual) => total + atual, 0)
}



const valorTotal = (state) => {
    const tot = state.order.orderItems.map(p => p.preco * p.peso)
    .reduce((total, atual) => total + atual, 0)
    if(state.order.tipoTaxa.desconto==0 & state.order.tipoTaxa.dellivery==0){
        return tot

    }
    else if (state.order.tipoTaxa.dellivery!=0) {
        return tot+ state.order.tipoTaxa.dellivery
        
    }else if(state.order.tipoTaxa.desconto!=0 & state.order.tipoTaxa.dellivery!=0){
        return tot+state.order.tipoTaxa.dellivery-state.order.tipoTaxa.desconto


    }




    // if(state.order.tipoTaxa.dellivery==0&state.order.tipoTaxa.desconto==0){
    //     return state.order.orderItems.map(p => p.preco * p.peso)
    // .reduce((total, atual) => total + atual, 0)

    // }else if(state.order.tipoTaxa.dellivery!=0){
    //     return state.order.orderItems.map(p => p.preco * p.peso)
    // .reduce((total, atual) => total + atual, 0)+state.order.tipoTaxa.dellivery
    // }else if(state.order.tipoTaxa.desconto!=0){
    //     return state.order.tipoTaxa.dellivery - state.order.tipoTaxa.desconto

    // }
   
}

/**
 * 
 * Getter obter valor desconto
 */


const valorDesconto = ( state ) => {
    return state.order.tipoTaxa.desconto
    
}

/**
 * 
 * Getter obter valor taxa dellivery 
 */
const valorDelly = (state) => {
    return state.order.tipoTaxa.dellivery
}


export  {
    ValorSubtotal,
    valorTotal,
    valorDelly,
    valorDesconto
}
