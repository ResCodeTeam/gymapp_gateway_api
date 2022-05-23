"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.treinadorRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificarAutenticacao_1 = require("../api/middlewares/verificarAutenticacao");
const verificarTreinador_1 = require("../api/middlewares/verificarTreinador");
const apiAdapter_1 = require("../apiAdapter");
const treinadorRouter = express_1.default.Router();
exports.treinadorRouter = treinadorRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
treinadorRouter.delete('/treinador/exercicios/:exercicioId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const exercicioId = req.params.exercicioId;
    gymapp_api.delete(`/treinador/${userId}/exercicios/${exercicioId}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.put('/treinador/exercicios', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const exercicioId = req.body.exercicioId;
    let body = req.body;
    delete body['exercicioId'];
    gymapp_api.put(`/treinador/${userId}/exercicios/${exercicioId}`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/avaliacoes/:aluno_id', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const aluno_id = req.params.aluno_id;
    gymapp_api.get(`/treinador/${userId}/avaliacoes/${aluno_id}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.post('/treinador/avaliacoes', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const aluno_id = req.body.aluno_id;
    let body = req.body;
    delete body['aluno_id'];
    gymapp_api.post(`/treinador/${userId}/avaliacoes/${aluno_id}`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.put('/treinador/avaliacoes', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const avaliacaoId = req.body.avaliacaoId;
    let body = req.body;
    delete body['avaliacaoId'];
    gymapp_api.put(`/treinador/${userId}/avaliacoes/${avaliacaoId}`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/avaliacoes/:avaliacao_id', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const avaliacao_id = req.params.avaliacao_id;
    gymapp_api.delete(`/treinador/${userId}/avaliacoes/${avaliacao_id}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/exercicios/treinador', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/treinador/${userId}/exercicios/treinador`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.post('/treinador/exercicios/', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.post(`/treinador/${userId}/exercicios/`, req.body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/exercicios/', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/treinador/${userId}/exercicios/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.post('/treinador/exercicios/imagens', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const exercicioId = req.body.exercicioId;
    let body = req.body;
    delete body['exercicioId'];
    gymapp_api.post(`/treinador/${userId}/exercicios/${exercicioId}/imagens`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/exercicios/:exercicioId/imagens/:imagemId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const exercicioId = req.params.exercicioId;
    const imagemId = req.params.imagemId;
    gymapp_api.delete(`/treinador/${userId}/exercicios/${exercicioId}/imagens/${imagemId}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.post('/treinador/exercicios/musculos', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const exercicioId = req.body.exercicioId;
    const musculoId = req.body.musculoId;
    let body = req.body;
    delete body['exercicioId'];
    delete body['musculoId'];
    gymapp_api.post(`/treinador/${userId}/exercicios/${exercicioId}/musculos/${musculoId}`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/exercicios/:exercicioId/musculos/:musculoId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const exercicioId = req.params.exercicioId;
    const musculoId = req.params.musculoId;
    gymapp_api.delete(`/treinador/${userId}/exercicios/${exercicioId}/musculos/${musculoId}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/agenda/desafios', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/treinador/${userId}/agenda/desafios/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/agenda/avaliacoes', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/treinador/${userId}/agenda/avaliacoes/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.post('/treinador/desafio/submissoes', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.body.desafioId;
    let body = req.body;
    delete body['desafioId'];
    gymapp_api.post(`/treinador/${userId}/desafio/${desafioId}/submissoes`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/plano/:uid/:startDate/:endDate', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const uid = req.params.uid;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    gymapp_api.get(`/treinador/${userId}/plano/${uid}/${startDate}/${endDate}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
treinadorRouter.put('/treinador/agenda/avaliacao', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const agendamentoId = req.body.agendamentoId;
    gymapp_api.put(`/treinador/${userId}/agenda/avaliacao/${agendamentoId}/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/agenda/avaliacao/:agendamentoId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const agendamentoId = req.params.agendamentoId;
    gymapp_api.delete(`/treinador/${userId}/agenda/avaliacao/${agendamentoId}/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.put('/treinador/agenda/desafios', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const agendamentoId = req.body.agendamentoId;
    gymapp_api.put(`/treinador/${userId}/agenda/desafios/${agendamentoId}/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/agenda/desafios/:agendamentoId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const agendamentoId = req.params.agendamentoId;
    gymapp_api.delete(`/treinador/${userId}/agenda/desafios/${agendamentoId}/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.post('/treinador/planoTreino', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.post(`/treinador/${userId}/planoTreino`, req.body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/plano/:planoId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const planoId = req.params.planoId;
    gymapp_api.delete(`/treinador/${userId}/plano/${planoId}/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.put('/treinador/plano', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const planoId = req.body.planoId;
    let body = req.body;
    delete body['planoId'];
    gymapp_api.put(`/treinador/${userId}/plano/${planoId}`, body).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/treinos', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/treinador/${userId}/treinos/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.get('/treinador/locaisMedida', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api.get(`/treinador/${userId}/locaisMedida/`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
treinadorRouter.delete('/treinador/desafio/:desafioId/submissoes/:submissaoId', verificarAutenticacao_1.verificarAutenticacao, verificarTreinador_1.verificarTreinador, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.params.desafioId;
    const submissaoId = req.params.submissaoId;
    gymapp_api.delete(`/treinador/${userId}/desafio/${desafioId}/submissoes/${submissaoId}`).then(resp => {
        res.send(resp.data);
    }).catch(err => {
        const resp = err.response;
        res.send(resp.data).status(resp.status);
    });
});
//# sourceMappingURL=treinador.js.map