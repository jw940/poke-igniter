export const defaultState = {
    pokemon: {}
};

export const AppActions = {
    SetPokemonDisplay: pokemon => {
        return {
            type: "SET_POKEMON_DISPLAY",
            pokemon: pokemon
        }
    }
}

export default function AppState(state, action) {
    switch(action.type) {

        case "SET_POKEMON_DISPLAY":
            let newState = Object.assign({}, state);
            newState.pokemon = action.pokemon;
            return newState

        default:
            return state

    }
}
