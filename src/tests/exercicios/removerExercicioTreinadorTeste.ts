import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";
const idExercicio = "05bb0690-db08-4b46-97dc-3853eba58d51";

let token = "";

describe("Teste remover exercicio treinador:", () => {
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
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .delete("/treinador/exercicios/" + idExercicio)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Token expirado", () => {
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .delete("/treinador/exercicios/" + idExercicio)
        .set("Authorization", tokenInvalido)

        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });
  describe("- Remover exercicio treinador corretamente", () => {
    it("Deve retornar mensagem de remoção", () => {
      return chai
        .request(server)
        .delete("/treinador/exercicios/" + idExercicio)
        .set("Authorization", token)

        .then((res) => {
          console.log(res.body);
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });
});
