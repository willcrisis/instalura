import {list, comment, like, msg} from "../actions/actionCreator";

export default class TimelineApi {

    static like(fotoId) {
        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'POST'})
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro ao dar like na foto.');
                })
                .then(liker => {
                    dispatch(like(fotoId, liker));
                    return liker;
                });
        }
    }

    static comment(fotoId, texto) {
        return dispatch => {
            fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('token')}`,
                {
                    method: 'POST',
                    body: JSON.stringify({texto: texto}),
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    })
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro ao comment');
                })
                .then(comentario => {
                    dispatch(comment(fotoId, comentario));
                    return comentario;
                });
        }
    }

    static list(login) {
        let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('token')}`;
        if (login) {
            url = `http://localhost:8080/api/public/fotos/${login}`;
        }
        return dispatch => {
            fetch(url)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(list(fotos));

                    if (fotos.length === 0) {
                        dispatch(msg('Nenhum resultado encontrado.'));
                    } else {
                        dispatch(msg(''));
                    }
                    return fotos;
                });
        };
    }
}