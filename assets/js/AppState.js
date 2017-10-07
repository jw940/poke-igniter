export const defaultState = {
    all_pokemon: {},
    pokemon_count: 0
};

export const AppActions = {
    SetAllPokemon: (pokemon, count) => {
        return {
            type: "SET_ALL_POKEMON",
            pokemon: pokemon,
            count: count
        }
    }
}

export default function AppState(state, action) {
    switch(action.type) {

        case "SET_ALL_POKEMON":
            let newState = Object.assign({}, state);
            newState.all_pokemon = action.pokemon;
            newState.pokemon_count = action.count;
            return newState;

        default:
            return state

    }
}
