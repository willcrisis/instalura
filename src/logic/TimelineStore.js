import PubSub from "pubsub-js";

export default class TimelineLogic {

    constructor(fotos) {
        this.fotos = fotos;
    }

    like(fotoId) {
        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('token')}`, {method: 'POST'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao dar like na foto.');
            })
            .then(liker => {
                const fotoExistente = this.fotos.find(foto => foto.id === fotoId);
                fotoExistente.likeada = !fotoExistente.likeada;

                const encontrado = fotoExistente.likers.find(likerFoto => likerFoto.login === liker.login);
                if (encontrado) {
                    fotoExistente.likers = fotoExistente.likers.filter(likerFoto => likerFoto.login !== liker.login);
                } else {
                    fotoExistente.likers.push(liker);
                }
                PubSub.publish('timeline', this.fotos);
            });
    }

    comment(fotoId, texto) {
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
                const fotoExistente = this.fotos.find(foto => foto.id === fotoId);
                fotoExistente.comentarios.push(comentario);

                PubSub.publish('timeline', this.fotos);
            });
    }

    list(login) {
        let url = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('token')}`;
        if (login) {
            url = `http://localhost:8080/api/public/fotos/${login}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(fotos => {
                this.fotos = fotos;
                PubSub.publish('timeline', this.fotos);
            });
    }

    subscribe(callback) {
        PubSub.subscribe('timeline', (topic, fotos) => {
            callback(fotos);
        });
    }
}