"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const verificarAdmin_1 = require("../api/middlewares/verificarAdmin");
const verificarAutenticacao_1 = require("../api/middlewares/verificarAutenticacao");
const apiAdapter_1 = require("../apiAdapter");
const adminRouter = express_1.default.Router();
exports.adminRouter = adminRouter;
const BASE_URL = "http://localhost:8000/api/v1";
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
adminRouter.post("/admin/marca", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .post(`/admin/${userId}/marca/`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.get("/admin/marca", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const donoId = res.locals.uid;
    gymapp_api
        .get(`/admin/${donoId}/marca/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.put("/admin/ginasio/editar", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.body.ginasioId;
    let body = req.body;
    delete body["ginasioId"];
    gymapp_api
        .put(`/admin/${userId}/ginasio/editar/${ginasioId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/marca/ginasio/", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    const marcaId = req.body.marcaId;
    let body = req.body;
    delete body["marcaId"];
    gymapp_api
        .post(`/admin/${userId}/marca/${marcaId}/ginasio/`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.get("/admin/marca/:marcaId/ginasio", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    const marcaId = req.params.marcaId;
    gymapp_api
        .get(`/admin/${userId}/marca/${marcaId}/ginasio/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/ginasio/modalidades", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const ginasioId = req.body.ginasioId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["ginasioId"];
    gymapp_api
        .post(`/admin/${adminId}/ginasio/${ginasioId}/modalidades`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.get("/admin/ginasio/:ginasioId/modalidades", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const ginasioId = req.params.ginasioId;
    const userId = res.locals.uid;
    gymapp_api
        .get(`/admin/${userId}/ginasio/${ginasioId}/modalidades`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.delete("/admin/aluno/remover/:uId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    const uId = req.params.uId;
    gymapp_api
        .delete(`/admin/${userId}/aluno/remover/${uId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.delete("/admin/ginasio/:ginasioId/modalidades/:modalidadeId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.params.ginasioId;
    const modalidadeId = req.params.modalidadeId;
    gymapp_api
        .delete(`/admin/${userId}/ginasio/${ginasioId}/modalidades/${modalidadeId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.put("/admin/ginasio/modalidades", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    const ginasioId = req.body.ginasioId;
    const modalidadeId = req.body.modalidadeId;
    let body = req.body;
    delete body["ginasioId"];
    delete body["modalidadeId"];
    gymapp_api
        .put(`/admin/${userId}/ginasio/${ginasioId}/modalidades/${modalidadeId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.delete("/admin/treinador/:treinadorId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const treinadorId = req.params.treinadorId;
    const userId = res.locals.uid;
    gymapp_api
        .delete(`/admin/${userId}/treinador/${treinadorId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.delete("/admin/marca/:marcaId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.params.marcaId;
    const userId = res.locals.uid;
    gymapp_api
        .delete(`/admin/${userId}/marca/${marcaId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.get("/admin/marca/:marcaId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.params.marcaId;
    const userId = res.locals.uid;
    gymapp_api
        .get(`/admin/${userId}/marca/${marcaId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.put("/admin/marca/espf", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.body.marcaId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["marcaId"];
    gymapp_api
        .put(`/admin/${adminId}/marca/${marcaId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/marca/treinadores", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.body.marcaId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["marcaId"];
    gymapp_api
        .post(`/admin/${adminId}/marca/${marcaId}/treinadores`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/notificacao/user", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const destinoId = req.body.destinoId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["destinoId"];
    gymapp_api
        .post(`/admin/${adminId}/notificacao/user/${destinoId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/marca/alunos", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const userId = res.locals.uid;
    gymapp_api
        .post(`/admin/${userId}/marca/alunos/`, req.body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.delete("/admin/ginasio/:ginasioId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const ginasioId = req.params.ginasioId;
    const userId = res.locals.uid;
    gymapp_api
        .delete(`/admin/${userId}/ginasio/${ginasioId}/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.get("/admin/ginasio/:ginasioId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const ginasioId = req.params.ginasioId;
    const userId = res.locals.uid;
    gymapp_api
        .get(`/admin/${userId}/ginasio/${ginasioId}/`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/marca/localMedida", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.body.marcaId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["marcaId"];
    gymapp_api
        .post(`/admin/${adminId}/marca/${marcaId}/localMedida`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.delete("/admin/marca/:marcaId/localMedida/:localId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.params.marcaId;
    const localId = req.params.localId;
    const userId = res.locals.uid;
    gymapp_api
        .delete(`/admin/${userId}/marca/${marcaId}/localMedida/${localId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/notificacao/marca", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.body.marcaId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["marcaId"];
    gymapp_api
        .post(`/admin/${adminId}/notificacao/marca/${marcaId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.post("/admin/notificacao/ginasio", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const ginasioId = req.body.ginasioId;
    const adminId = res.locals.uid;
    let body = req.body;
    delete body["ginasioId"];
    gymapp_api
        .post(`/admin/${adminId}/notificacao/ginasio/${ginasioId}`, body)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
adminRouter.get("/admin/ginasio/treinador/ver/:marcaId", verificarAutenticacao_1.verificarAutenticacao, verificarAdmin_1.verificarAdmin, (req, res) => {
    const marcaId = req.params.ginasioId;
    const userId = res.locals.uid;
    gymapp_api
        .get(`/admin/${userId}/ginasio/treinador/ver/${marcaId}`)
        .then((resp) => {
        res.send(resp.data);
    })
        .catch((err) => {
        const resp = err.response;
        res.status(resp.status).send(resp.data);
    });
});
//# sourceMappingURL=admin.js.map