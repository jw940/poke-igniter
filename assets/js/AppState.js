export const defaultState = {
    all_pokemon: {},
    all_abilities: {},
    all_types: {},
    pokemon_count: 0,
    viewing_pokemon: null,
    page: 1,
    per_page: 10,
    search: "",
    current_view: "nav"
};

export const AppActions = {
    SetAllPokemon: (pokemon, count) => {
        return {
            type: "SET_ALL_POKEMON",
            pokemon: pokemon,
            count: count
        }
    },
    UpdatePokemonDetails: pokemon => {
        return {
            type: "UPDATE_POKEMON_DETAILS",
            pokemon: pokemon
        }
    },
    OpenPokemonCard: id => {
        return {
            type: "OPEN_POKEMON_CARD",
            id: id
        }
    },
    CloseCard: () => {
        return {
            type: "CLOSE_CARD"
        }
    },
    UpdateAbilityDetails: ability => {
        return {
            type: "UPDATE_ABILITY_DETAILS",
            ability: ability
        }
    },
    UpdateTypeDetails: type => {
        return {
            type: "UPDATE_TYPE_DETAILS",
            type: type
        }
    },
    SwitchPage: page => {
        return {
            type: "SWITCH_PAGE",
            page: page
        }
    },
    UpdateSearch: search => {
        return {
            type: "UPDATE_SEARCH",
            search: search
        }
    },
    UpdatePerPage: per_page => {
        return {
            type: "UPDATE_PER_PAGE",
            per_page: per_page
        }
    },
    ChangeView: view => {
        return {
            type: "CHANGE_VIEW",
            view: view
        }
    }
}

export default function AppState(state, action) {

    // Assign a new state object so redux recognises the updates
    let newState = Object.assign({}, state);

    switch(action.type) {

        case "SET_ALL_POKEMON":
            newState.all_pokemon = action.pokemon;
            newState.pokemon_count = action.count;
            return newState;

        case "UPDATE_POKEMON_DETAILS":
            // create new array of pokemon, and push pokemon object with new details to it
            let all_pokemon = newState.all_pokemon.filter(p => {
                return p.id != action.pokemon.id
            });
            all_pokemon.push(action.pokemon);
            // sort by ID
            newState.all_pokemon = all_pokemon.sort((a, b) => {
                return parseInt(a.id) > parseInt(b.id)
            })
            return newState;

        case "UPDATE_ABILITY_DETAILS":
            // same pattern as updating pokemon
            let all_abilities = newState.all_abilities.length ? newState.all_abilities.filter(a => {
                return a.id != action.ability.id
            }) : [];
            all_abilities.push(action.ability);
            newState.all_abilities = all_abilities.sort((a, b) => {
                return parseInt(a.id) > parseInt(b.id)
            });
            return newState;

        case "UPDATE_TYPE_DETAILS":
            let all_types = newState.all_types.length ? newState.all_types.filter(t => {
                return t.id != action.type.id
            }) : [];
            all_types.push(action.type);
            newState.all_types = all_types.sort((a, b) => {
                return parseInt(a.id) > parseInt(b.id)
            });
            return newState;

        case "OPEN_POKEMON_CARD":
            newState.viewing_pokemon = action.id;
            return newState;

        case "CLOSE_CARD":
            newState.viewing_pokemon = null;
            return newState;

        case "SWITCH_PAGE":
            newState.page = action.page;
            return newState;

        case "UPDATE_SEARCH":
            newState.search = action.search;
            return newState;

        case "UPDATE_PER_PAGE":
            newState.per_page = parseInt(action.per_page);
            return newState;

        case "CHANGE_VIEW":
            newState.current_view = action.view;
            newState.page = 1;
            return newState;

        default:
            return state

    }
}
