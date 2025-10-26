export const addToCartAction =(part)=>{
    return {
        type: 'add-to-cart',
        part: part,
    }
}

export const removeFromCartAction=(part)=>{
    return {
        type:'remove-from-cart',
        part:part,
    }
}

export const clearCartAction=()=>{
    return {
        type:'clear-cart',
    }
}