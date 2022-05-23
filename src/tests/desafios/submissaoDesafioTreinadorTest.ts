import { doesNotReject } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const desafioId = "098a8100-2ca9-400a-bb3a-cbd87692fd4b";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";
describe("Teste submeter desafio", () => {
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
        .post("/treinador/desafio/submissoes")
        .send({
          desafioId: desafioId,
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
        .post("/treinador/desafio/submissoes")
        .set("Authorization", tokenInvalido)
        .send({
          desafioId: desafioId,
        })
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Submeter desafio", () => {
    it("Deve retornar erro de body incompleto", () => {
      return chai
        .request(server)
        .post("/treinador/desafio/submissoes")
        .set("Authorization", token)
        .send({
          desafioId: desafioId,
        })
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Submeter desafio", () => {
    it("Deve retornar submeter desafio com sucesso", () => {
      return chai
        .request(server)
        .post("/treinador/desafio/submissoes")
        .set("Authorization", token)
        .send({
          desafioId: desafioId,
          uid: "000d1e14-617e-423e-8a1a-f63d4fa5af6a",
          valor: "teste submissao",
          ginasioId: "a70e117f-4b53-447f-b67d-6b1c93bd501d",
        })
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("object");
          // verificar se é um object
          chai.expect(res.body).to.have.property("submissao_id");
          chai.expect(res.body).to.have.property("uid");
          chai.expect(res.body).to.have.property("valor");
          chai.expect(res.body).to.have.property("desafio_id");
          chai.expect(res.body).to.have.property("treinador_id");
          chai.expect(res.body).to.have.property("ginasio_id");

          //verificar tipos das propriedades
          chai.expect(res.body["submissao_id"]).to.be.a("string");
          chai.expect(res.body["uid"]).to.be.a("string");
          chai.expect(res.body["valor"]).to.be.a("string");
          chai.expect(res.body["desafio_id"]).to.be.a("string");
          chai.expect(res.body["treinador_id"]).to.be.a("string");
          chai.expect(res.body["ginasio_id"]).to.be.a("string");

          //verificar se array das propriedades estão corretos
        });
    });
  });
});
