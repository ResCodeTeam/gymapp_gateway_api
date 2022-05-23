import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const planoTreinoId = "07fe955a-9332-4f71-a944-05b7b096f02f";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste editar plano de treino realizado aluno", () => {
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
        .put("/aluno/plano/realizado")
        .send({
          "planoId": planoTreinoId
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
        .put("/aluno/plano/realizado")
        .send({
          "planoId": planoTreinoId
        })
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar plano de treino realizado aluno corretamente", () => {
    it("Deve editar plano de treino realizado aluno", () => {
      return chai
        .request(server)
        .put("/aluno/plano/realizado")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("object");

          chai.expect(res.body).to.have.property("plano_treino_id");
          chai.expect(res.body).to.have.property("aluno_id");
          chai.expect(res.body).to.have.property("treinador_id");
          chai.expect(res.body).to.have.property("data");
          chai.expect(res.body).to.have.property("isRealizado");
          chai.expect(res.body).to.have.property("modalidade_id");
          chai.expect(res.body).to.have.property("isDeleted");

          chai.expect(res.body["plano_treino_id"]).to.be.a("string");
          chai.expect(res.body["aluno_id"]).to.be.a("string");
          chai.expect(res.body["treinador_id"]).to.be.a("string");
          chai.expect(res.body["data"]).to.be.a("string");
          chai.expect(res.body["isRealizado"]).to.be.a("boolean");
          chai.expect(res.body["modalidade_id"]).to.be.a("string");
          chai.expect(res.body["isDeleted"]).to.be.a("boolean");
        });
    });
  });
});
