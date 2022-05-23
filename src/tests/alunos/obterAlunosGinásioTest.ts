//pedir ajuda ao roberto

import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";
const idGinasio = "dc8acc46-89eb-4d0f-a14a-2388b21c90a0";
let token = "";

describe("Teste Obter todos os alunos de um ginásio", () => {
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
        .get("/alunos/ginasio/" + idGinasio)
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
        .get("/alunos/ginasio/" + idGinasio)
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter todos os alunos de ginásio corretamente", () => {
    it("Deve retornar alunos de ginásio", () => {
      return chai
        .request(server)
        .get("/alunos/ginasio/" + idGinasio)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            //verificar se é um objeto

            //verificar se as propriedades todas existem

            chai.expect(res.body[0]).to.be.an("object");
            chai.expect(res.body[0]).to.have.property("uid");
            chai.expect(res.body[0]).to.have.property("nome");
            chai.expect(res.body[0]).to.have.property("hashtag");
            chai.expect(res.body[0]).to.have.property("imagem_url");

            //verificar tipos das propriedades

            chai.expect(res.body[0]["uid"]).to.be.a("string");
            chai.expect(res.body[0]["nome"]).to.be.a("string");
            chai.expect(res.body[0]["hashtag"]).to.be.a("string");

            if (res.body[0]["imagem_url"] != null)
              chai.expect(res.body[0]["imagem_url"]).to.be.a("string");
          }
        });
    });
  });
});
