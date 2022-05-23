import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste Obter todos os agendamentos de um desafio", () => {
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
        .get("/treinador/agenda/desafios")
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
        .get("/treinador/agenda/desafios")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter todos os posts corretamente", () => {
    it("Deve retornar agendamnetos", () => {
      return chai
        .request(server)
        .get("/treinador/agenda/desafios")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            //verificar se é um objeto

            chai.expect(res.body[0]).to.be.an("object");

            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("agendamento_id");
            chai.expect(res.body[0]).to.have.property("uid");
            chai.expect(res.body[0]).to.have.property("data_agendamento");
            chai.expect(res.body[0]).to.have.property("desafio_id");
            chai.expect(res.body[0]).to.have.property("ginasio_id");
            chai.expect(res.body[0]).to.have.property("isAceite");
            chai.expect(res.body[0]).to.have.property("isDeleted");

            //verificar tipos das propriedades
            chai.expect(res.body[0]["agendamento_id"]).to.be.a("string");
            chai.expect(res.body[0]["uid"]).to.be.a("string");
            chai.expect(res.body[0]["data_agendamento"]).to.be.a("string");
            chai.expect(res.body[0]["desafio_id"]).to.be.a("string");
            chai.expect(res.body[0]["ginasio_id"]).to.be.a("string");
            chai.expect(res.body[0]["isAceite"]).to.be.a("boolean");
            chai.expect(res.body[0]["isDeleted"]).to.be.a("boolean");
          }
        });
    });
  });
});
