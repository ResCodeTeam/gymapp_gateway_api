import { doesNotReject } from "assert";
import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const ginasioaId = "dc8acc46-89eb-4d0f-a14a-2388b21c90a0";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";
describe("Teste criar notificação ginasio", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "admin@admin.com",
        password: "admin",
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
        .post("/admin/notificacao/ginasio")
        .send({
          "ginasioId": ginasioaId
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
        .post("/admin/notificacao/ginasio")
        .send({
          "ginasioId": ginasioaId
        })
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Criar notificação ginasio", () => {
    it("Deve retornar erro de body incompleto", () => {
      return chai
        .request(server)
        .post("/admin/notificacao/ginasio")
        .send({
          "ginasioId": ginasioaId
        })
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Criar notificação ginasio", () => {
    it("Deve retornar criar notificação ginasio com sucesso", () => {
      return chai
        .request(server)
        .post("/admin/notificacao/ginasio")
        .set("Authorization", token)
        .send({
          "ginasioId": ginasioaId,
          conteudo: "Teste de notificação",
          tipo: 0,
        })
        .then((res) => {
          res.should.have.status(200);

          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("message");
          chai.expect(res.body).to.have.property("ginasios");

          chai.expect(res.body["message"]).to.be.a("string");
          chai.expect(res.body["ginasios"]).to.be.a("object");

          chai.expect(res.body["ginasios"]).to.have.property("ginasio_id");
          chai.expect(res.body["ginasios"]).to.have.property("aluno_ginasio");

          chai.expect(res.body["ginasios"]["ginasio_id"]).to.be.a("string");
          chai.expect(res.body["ginasios"]["aluno_ginasio"]).to.be.a("array");

          //Array Bloco Treino
          if (res.body["ginasios"]["aluno_ginasio"].length > 0) {
            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0])
              .to.be.an("object");

            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0])
              .to.have.property("user_id");
            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0])
              .to.have.property("users");

            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0]["user_id"])
              .to.be.a("string");
            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0]["users"])
              .to.be.a("object");

            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0]["users"])
              .to.have.property("nome");
            chai
              .expect(res.body["ginasios"]["aluno_ginasio"][0]["users"]["nome"])
              .to.be.a("string");
          }
        });
    });
  });
});
