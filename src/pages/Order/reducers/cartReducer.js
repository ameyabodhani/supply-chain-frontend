const cartReducer=(state=[],action)=>{
    switch(action.type){
        case 'clear-cart':
            return [];
            
        case 'add-to-cart':
            return [...state, action.part]
        
        case 'remove-from-cart':
            return state.filter(p=>p.part.partId !=action.part.part.partId)
        
        default:
            return state
    }
}

export default cartReducer