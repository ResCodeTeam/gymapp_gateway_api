"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const apiAdapter_1 = require("../apiAdapter");
const adminRouter = express_1.default.Router();
exports.adminRouter = adminRouter;
const BASE_URL = 'http://localhost:8000/api/v1';
const gymapp_api = (0, apiAdapter_1.apiAdapter)(BASE_URL);
adminRouter.post('/admin/marca/', (req, res) => {
    gymapp_api.post(`/admin/marca/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.get('/admin/marca/', (req, res) => {
    gymapp_api.get(`/admin/marca/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.put('/admin/ginasio/editar/{ginasioId}', (req, res) => {
    gymapp_api.put(`/admin/ginasio/editar/{ginasioId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/marca/{marcaId}/ginasio/', (req, res) => {
    gymapp_api.post(`/admin/marca/{marcaId}/ginasio/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.get('/admin/marca/{marcaId}/ginasio/', (req, res) => {
    gymapp_api.get(`/admin/marca/{marcaId}/ginasio/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/ginasio/{ginasioId}/modalidades', (req, res) => {
    gymapp_api.post(`/admin/ginasio/{ginasioId}/modalidades`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.get('/admin/ginasio/{ginasioId}/modalidades', (req, res) => {
    gymapp_api.get(`/admin/ginasio/{ginasioId}/modalidades`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.delete('/admin/aluno/remover/{uId}', (req, res) => {
    gymapp_api.delete(`/admin/aluno/remover/{uId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.delete('/admin/ginasio/{ginasioId}/modalidades/{modalidadeId}', (req, res) => {
    gymapp_api.delete(`/admin/ginasio/{ginasioId}/modalidades/{modalidadeId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.put('/admin/ginasio/{ginasioId}/modalidades/{modalidadeId}', (req, res) => {
    gymapp_api.put(`/admin/ginasio/{ginasioId}/modalidades/{modalidadeId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.delete('/admin/treinador/{treinador_id}', (req, res) => {
    gymapp_api.delete(`/admin/treinador/{treinador_id}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.delete('/admin/marca/{marcaId}', (req, res) => {
    gymapp_api.delete(`/admin/marca/{marcaId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.get('/admin/marca/{marcaId}', (req, res) => {
    gymapp_api.get(`/admin/marca/{marcaId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.put('/admin/marca/{marcaId}', (req, res) => {
    gymapp_api.put(`/admin/marca/{marcaId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/marca/{marca_id}/treinadores', (req, res) => {
    gymapp_api.post(`/admin/marca/{marca_id}/treinadores`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/notificacao/user/{destinoId}', (req, res) => {
    gymapp_api.post(`/admin/notificacao/user/{destinoId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/marca/alunos/', (req, res) => {
    gymapp_api.post(`/admin/marca/alunos/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.delete('/admin/ginasio/{ginasioId}/', (req, res) => {
    gymapp_api.delete(`/admin/ginasio/{ginasioId}/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.get('/admin/ginasio/{ginasioId}/', (req, res) => {
    gymapp_api.get(`/admin/ginasio/{ginasioId}/`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/marca/{marcaId}/localMedida', (req, res) => {
    gymapp_api.post(`/admin/marca/{marcaId}/localMedida`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.delete('/admin/marca/{marcaId}/localMedida/{localId}', (req, res) => {
    gymapp_api.delete(`/admin/marca/{marcaId}/localMedida/{localId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/notificacao/marca/{marcaId}', (req, res) => {
    gymapp_api.post(`/admin/notificacao/marca/{marcaId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.post('/admin/notificacao/ginasio/{ginasioId}', (req, res) => {
    gymapp_api.post(`/admin/notificacao/ginasio/{ginasioId}`).then(resp => {
        res.send(resp.data);
    });
});
adminRouter.get('/admin/ginasio/treinador/ver/{marcaId}', (req, res) => {
    gymapp_api.get(`/admin/ginasio/treinador/ver/{marcaId}`).then(resp => {
        res.send(resp.data);
    });
});
//# sourceMappingURL=admin.js.map