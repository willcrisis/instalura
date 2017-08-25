export function list(fotos) {
    return {type: 'LIST', fotos};
}

export function comment(fotoId, comentario) {
    return {type: 'COMMENT', fotoId, comentario};
}

export function like(fotoId, liker) {
    return {type: 'LIKE', fotoId, liker};
}