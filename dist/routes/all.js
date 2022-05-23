"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificarAutenticacao_1 = require("../api/middlewares/verificarAutenticacao");
const apiAdapter_1 = require("../apiAdapter");
const allRouter = express_1.default.Router();
exports.allRouter = allRouter;
const BASE_URL = "http://localhost:8000/api/v1";
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
allRouter.get("/desafios/:desafioId/submissoes", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.params.desafioId;
    gymapp_api
        .get(`/${userId}/desafios/${desafioId}/submissoes`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/alunos/ginasio/:ginasioId", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.params.ginasioId;
    gymapp_api
        .get(`/${userId}/alunos/ginasio/${ginasioId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.post("/posts/comentarios", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.body.postId;
    let body = req.body;
    delete body["postId"];
    gymapp_api
        .post(`/${userId}/posts/${postId}/comentarios`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.post("/posts/comentario/gosto", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.body.postId;
    const comentarioId = req.body.comentarioId;
    gymapp_api
        .post(`/${userId}/posts/${postId}/comentario/${comentarioId}/gosto`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.delete("/posts/:postId/comentario/:comentarioId/gosto", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.params.postId;
    const comentarioId = req.params.comentarioId;
    gymapp_api
        .delete(`/${userId}/posts/${postId}/comentario/${comentarioId}/gosto`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.delete("/posts/:postId/comentario/:comentarioId", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.params.postId;
    const comentarioId = req.params.comentarioId;
    gymapp_api
        .delete(`/${userId}/posts/${postId}/comentario/${comentarioId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/posts/:postId", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const postId = req.params.postId;
    gymapp_api
        .get(`/posts/${postId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.delete("/posts/:postId", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.params.postId;
    gymapp_api
        .delete(`/${userId}/posts/${postId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.put("/posts", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.body.postId;
    let body = req.body;
    delete body["postId"];
    gymapp_api
        .put(`/${userId}/posts/${postId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.post("/posts/gostos", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.body.postId;
    let body = req.body;
    delete body["postId"];
    gymapp_api
        .post(`/${userId}/posts/${postId}/gostos`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.delete("/posts/:postId/gostos", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const postId = req.params.postId;
    gymapp_api
        .delete(`/${userId}/posts/${postId}/gostos`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/desafios/:desafioId", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.params.desafioId;
    gymapp_api
        .get(`/${userId}/desafios/${desafioId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/atividades", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    gymapp_api
        .get(`/atividades/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/definicoes", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/${userId}/definicoes`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.put("/destinosNotificacao/notificacao", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const notiId = req.body.notiId;
    gymapp_api
        .put(`/${userId}/destinosNotificacao/notificacao/${notiId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.put("/perfil", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .put(`/${userId}/perfil`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/perfil", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/${userId}/perfil`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/user/:uId", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const uId = req.params.uId;
    gymapp_api
        .get(`/${userId}/user/${uId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.put("/definicoes/identificacao", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .put(`/${userId}/definicoes/identificacao/`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.put("/definicoes/mencoes", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .put(`/${userId}/definicoes/mencoes`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/posts", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/${userId}/posts`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.post("/posts", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .post(`/${userId}/posts`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.put("/definicoes/perfil/privado", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .put(`/${userId}/definicoes/perfil/privado/`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/ginasio/:ginasioId/desafios", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.params.ginasioId;
    gymapp_api
        .get(`/${userId}/ginasio/${ginasioId}/desafios/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/ginasio/:ginasioId/desafios/disponiveis", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.params.ginasioId;
    gymapp_api
        .get(`/${userId}/ginasio/${ginasioId}/desafios/disponiveis`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
allRouter.get("/notificacoes", verificarAutenticacao_1.verificarAutenticacao, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/${userId}/notificacoes`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
//# sourceMappingURL=all.js.map