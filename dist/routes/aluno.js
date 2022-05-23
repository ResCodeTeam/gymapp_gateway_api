"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alunoRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificarAluno_1 = require("../api/middlewares/verificarAluno");
const verificarAutenticacao_1 = require("../api/middlewares/verificarAutenticacao");
const apiAdapter_1 = require("../apiAdapter");
const alunoRouter = express_1.default.Router();
exports.alunoRouter = alunoRouter;
const BASE_URL = "http://localhost:8000/api/v1";
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
alunoRouter.post("/aluno/agenda/avaliacao", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .post(`/aluno/${userId}/agenda/avaliacao/`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.post("/aluno/agenda/desafios", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const desafioId = req.body.desafioId;
    let body = req.body;
    delete body["desafioId"];
    gymapp_api
        .post(`/aluno/${userId}/agenda/desafios/${desafioId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.get("/aluno/avaliacoes", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/aluno/${userId}/avaliacoes/${userId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.post("/aluno/treinos", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .post(`/aluno/${userId}/treinos`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.delete("/aluno/treino/:treinoId", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const treinoId = req.params.treinoId;
    gymapp_api
        .delete(`/aluno/${userId}/treino/${treinoId}/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.delete("/aluno/agenda/desafios/:agendamentoId/agendamento", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const agendamentoId = req.params.agendamentoId;
    gymapp_api
        .delete(`/aluno/${userId}/agenda/desafios/${agendamentoId}/agendamento/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.delete("/aluno/agenda/avaliacao/:agendamentoId/agendamento", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const agendamentoId = req.params.agendamentoId;
    gymapp_api
        .delete(`/aluno/${userId}/agenda/avaliacao/${agendamentoId}/agendamento/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.get("/aluno/treinos", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/aluno/${userId}/treinos/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.put("/aluno/treinos", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const treinoId = req.body.treinoId;
    let body = req.body;
    delete body["treinoId"];
    gymapp_api
        .put(`/aluno/${userId}/treinos/${treinoId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.get("/aluno/planoTreino/:startDate/:endDate", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    gymapp_api
        .get(`/aluno/${userId}/planoTreino/${startDate}/${endDate}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.get("/aluno/agenda/avaliacoes", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/aluno/${userId}/agenda/avaliacoes/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.get("/aluno/agenda/desafios", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .get(`/aluno/${userId}/agenda/desafios/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.put("/aluno/plano/realizado", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const planoId = req.body.planoId;
    let body = req.body;
    delete body["planoId"];
    gymapp_api
        .put(`/aluno/${userId}/plano/${planoId}/realizado/`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
alunoRouter.delete("/aluno/plano/:planoId/realizado", verificarAutenticacao_1.verificarAutenticacao, verificarAluno_1.verificarAluno, (req, res) => {
    const userId = res.locals.uid;
    const planoId = req.params.planoId;
    gymapp_api
        .delete(`/aluno/${userId}/plano/${planoId}/realizado/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
//# sourceMappingURL=aluno.js.map