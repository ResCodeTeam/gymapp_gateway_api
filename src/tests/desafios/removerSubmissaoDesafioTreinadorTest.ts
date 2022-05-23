import { doesNotReject } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const desafioId = "098a8100-2ca9-400a-bb3a-cbd87692fd4b";
const submissaoId = "20a19e5f-b3bc-4a60-b29c-9a9b7fbc7e0d";
const baseUrl = "/api/v1";
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste remover submissao desafio treinador", () => {
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
        .delete(
          "/treinador/desafio/" + desafioId + "/submissoes/" + submissaoId
        )
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
        .delete(
          "/treinador/desafio/" + desafioId + "/submissoes/" + submissaoId
        )
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Remover submissao desafio treinador", () => {
    it("Deve remover submissao desafio treinador com sucesso", () => {
      return chai
        .request(server)
        .delete(
          "/treinador/desafio/" + desafioId + "/submissoes/" + submissaoId
        )
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("msg");

          chai.expect(res.body["msg"]).to.be.a("string");
        });
    });
  });
});
