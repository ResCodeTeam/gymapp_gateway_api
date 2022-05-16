"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morganConfig_1 = require("./config/morganConfig");
const teste_1 = require("./routes/teste");
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
app.use(teste_1.testeRouter);
app.get('/hello', (req, resp) => {
    return resp.send('HELLO WORLD!');
});
app.get('/dois/free', (req, resp) => {
    return resp.send('HELLO WORLD2!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running! on port: ${PORT}`);
});
//# sourceMappingURL=app.js.map