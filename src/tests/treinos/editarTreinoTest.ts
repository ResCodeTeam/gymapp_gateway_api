import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const treinoId = "914e9639-033e-468c-b375-90ad2ac31c10";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste editar treino", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "biancasilva@gmail.com",
        password: "passwd",
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
        .put("/aluno/treinos")
        .send({
          "treinoId": treinoId
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
        .put("/aluno/treinos")
        .send({
          "treinoId": treinoId
        })
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar treino", () => {
    it("Deve retornar erro de body incompleto", () => {
      return chai
        .request(server)
        .put("/aluno/treinos")
        .send({
          "treinoId": treinoId
        })
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar treino", () => {
    it("Deve retornar editar treino com sucesso", () => {
      return chai
        .request(server)
        .put("/aluno/treinos")
        .set("Authorization", token)
        .send({
          "treinoId": treinoId,
          atividadeId: null,
          modalidadeId: "4272f33a-b2c9-46bf-83ab-c8a1a85fbd52",
          duracao: "50",
          calorias: 20000,
          distancia: 30,
          data: "2022-05-03T17:53:33.437Z",
        })
        .then((res) => {
          res.should.have.status(200);
          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("treino_id");
          chai.expect(res.body).to.have.property("uisd");
          chai.expect(res.body).to.have.property("modalidade_id");
          chai.expect(res.body).to.have.property("duracao");
          chai.expect(res.body).to.have.property("calorias");
          chai.expect(res.body).to.have.property("distancia");
          chai.expect(res.body).to.have.property("data");
          chai.expect(res.body).to.have.property("isDeleted");

          //verificar tipos das propriedades
          chai.expect(res.body["treino_id"]).to.be.a("string");
          chai.expect(res.body["uid"]).to.be.a("string");
          chai.expect(res.body["modalidade_id"]).to.be.a("string");
          chai.expect(res.body["duracao"]).to.be.a("string");
          chai.expect(res.body["calorias"]).to.be.a("number");
          chai.expect(res.body["distancia"]).to.be.a("number");
          chai.expect(res.body["data"]).to.be.a("string");
          chai.expect(res.body["isDeleted"]).to.be.a("boolean");
        });
    });
  });
});
