import { doesNotReject } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const exercicioId = "77b06ce4-8aa0-4d70-8525-6a575caf6c41";
const baseUrl = "/api/v1";
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";
describe("Teste editar exercicio", () => {
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
        .put("/treinador/exercicios")
        .send({
          "exercicioId": exercicioId
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
        .put("/treinador/exercicios")
        .set("Authorization", tokenInvalido)
        .send({
          "exercicioId": exercicioId
        })
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar exercicio", () => {
    it("Deve retornar erro de body incompleto", () => {
      return chai
        .request(server)
        .put("/treinador/exercicios")
        .set("Authorization", token)
        .send({
          "exercicioId": exercicioId
        })
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar exercicio", () => {
    it("Deve retornar editar exercicio com sucesso", () => {
      return chai
        .request(server)
        .put("/treinador/exercicios")
        .set("Authorization", token)
        .send({
          "exercicioId": exercicioId
          nome: "Teste1",
          descricao: "Teste2",
          isTempo: true,
        })
        .then((res) => {
          res.should.have.status(200);

          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("exercicio_id");
          chai.expect(res.body).to.have.property("nome");
          chai.expect(res.body).to.have.property("descricao");
          chai.expect(res.body).to.have.property("autor_id");
          chai.expect(res.body).to.have.property("is_tempo");
          chai.expect(res.body).to.have.property("isDeleted");

          chai.expect(res.body["exercicio_id"]).to.be.a("string");
          chai.expect(res.body["nome"]).to.be.a("string");
          chai.expect(res.body["descricao"]).to.be.a("string");
          chai.expect(res.body["autor_id"]).to.be.a("string");
          chai.expect(res.body["is_tempo"]).to.be.a("boolean");
          chai.expect(res.body["isDeleted"]).to.be.a("boolean");
        });
    });
  });
});
