export function timeline(state = [], action) {
    if (action.type === 'LIST') {
        return action.fotos;
    }

    if (action.type === 'COMMENT') {
        const fotoExistente = state.find(foto => foto.id === action.fotoId);
        fotoExistente.comentarios.push(action.comentario);

        return state;
    }

    if (action.type === 'LIKE') {
        const fotoExistente = state.find(foto => foto.id === action.fotoId);
        fotoExistente.likeada = !fotoExistente.likeada;

        const liker = action.liker;
        const encontrado = fotoExistente.likers.find(likerFoto => likerFoto.login === liker.login);
        if (encontrado) {
            fotoExistente.likers = fotoExistente.likers.filter(likerFoto => likerFoto.login !== liker.login);
        } else {
            fotoExistente.likers.push(liker);
        }
    }

    return state;
}