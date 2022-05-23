import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const desafioId = "fefa26e4-90ea-4a5e-8878-c051faffeb29";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste obter sumissoes do desafio", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "admin2@admin.com",
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
        .get("/desafios/" + desafioId + "/submissoes")
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
        .get("/desafios/" + desafioId + "/submissoes")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter sumissoes do desafio corretamente", () => {
    it("Deve sumissoes do desafio", () => {
      return chai
        .request(server)
        .get("/desafios/" + desafioId + "/submissoes")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("submissao_id");
            chai.expect(res.body[0]).to.have.property("uid");
            chai.expect(res.body[0]).to.have.property("valor");
            chai.expect(res.body[0]).to.have.property("desafio_id");
            chai.expect(res.body[0]).to.have.property("treinador_id");
            chai.expect(res.body[0]).to.have.property("ginasio_id");
            //verificar tipos das propriedades
            chai.expect(res.body[0]["submissao_id"]).to.be.a("string");
            chai.expect(res.body[0]["uid"]).to.be.a("string");
            chai.expect(res.body[0]["valor"]).to.be.a("string");
            chai.expect(res.body[0]["desafio_id"]).to.be.a("string");
            chai.expect(res.body[0]["treinador_id"]).to.be.a("string");
            chai.expect(res.body[0]["ginasio_id"]).to.be.a("string");
          }
        });
    });
  });
});
