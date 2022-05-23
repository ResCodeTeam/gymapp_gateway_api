import { doesNotReject } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const exercicioId = "05bb0690-db08-4b46-97dc-3853eba58d51";
const musculoId = "13d6659f-b559-4545-b74d-8a7ba4896a3e";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";
describe("Teste adicionar musculo ao exercicio", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "treinador@treinador.com",
        password: "treinador",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });

  describe("- Sem token", () => {
    it("Deve retornar erro de authToken invalido", () => {
      return chai
        .request(server)
        .post("/treinador/exercicios/musculos")
        .send({
          "exercicioId": exercicioId,
          "musculoId": musculoId
        })
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Token invalido", () => {
    it("Deve retornar erro de authToken invalido", () => {
      return chai
        .request(server)
        .post("/treinador/exercicios/musculos")
        .set("Authorization", tokenInvalido)
        .send({
          "exercicioId": exercicioId,
          "musculoId": musculoId
        })
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Adicionar musculo ao exercicio", () => {
    it("Deve retornar adicionar musculo ao exercicio com sucesso", () => {
      return chai
        .request(server)
        .post("/treinador/exercicios/musculos")
        .set("Authorization", token)
        .send({
          "exercicioId": exercicioId,
          "musculoId": musculoId
        })
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("object");
          // verificar se é um object
          chai.expect(res.body).to.have.property("exercicio_id");
          chai.expect(res.body).to.have.property("musculo_id");

          chai.expect(res.body["exercicio_id"]).to.be.a("string");
          chai.expect(res.body["musculo_id"]).to.be.a("string");
        });
    });
  });
});
