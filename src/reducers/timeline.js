import {List} from "immutable";

function updateFoto(lista, fotoId, callback) {
    const fotoAntiga = lista.find(foto => foto.id === fotoId);

    const props = callback(fotoAntiga);

    const fotoNova = Object.assign({}, fotoAntiga, props);

    const index = lista.findIndex(foto => foto.id === fotoId);

    return lista.set(index, fotoNova);
}

export function timeline(state = new List(), action) {
    if (action.type === 'LIST') {
        return new List(action.fotos);
    }

    if (action.type === 'COMMENT') {
        return updateFoto(state, action.fotoId, fotoAntiga => {
            return {comentarios: fotoAntiga.comentarios.concat(action.comentario)};
        });
    }

    if (action.type === 'LIKE') {
        return updateFoto(state, action.fotoId, fotoAntiga => {
            const liker = action.liker;
            const encontrado = fotoAntiga.likers.find(likerFoto => likerFoto.login === liker.login);
            let likers;
            if (encontrado) {
                likers = fotoAntiga.likers.filter(likerFoto => likerFoto.login !== liker.login);
            } else {
                likers = fotoAntiga.likers.concat(liker);
            }

            return {likeada: !fotoAntiga.likeada, likers}
        });
    }

    return state;
}