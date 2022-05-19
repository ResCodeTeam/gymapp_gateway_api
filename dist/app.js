"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const morganConfig_1 = require("./config/morganConfig");
const admin_1 = require("./routes/admin");
const adminTreinador_1 = require("./routes/adminTreinador");
const all_1 = require("./routes/all");
const aluno_1 = require("./routes/aluno");
const auth_1 = require("./routes/auth");
const backend_1 = require("./routes/backend");
const treinador_1 = require("./routes/treinador");
const app = (0, express_1.default)();
exports.app = app;
dotenv_1.default.config();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(express_1.default.json());
(0, morganConfig_1.morganConfig)(app);
app.use((error, request, response, next) => {
    console.log(error);
    return response.status(500).json({
        status: "Error",
        message: error.message
    });
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(admin_1.adminRouter);
app.use(adminTreinador_1.adminTreinadorRouter);
app.use(all_1.allRouter);
app.use(aluno_1.alunoRouter);
app.use(auth_1.authRouter);
app.use(backend_1.backendRouter);
app.use(treinador_1.treinadorRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running! on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map