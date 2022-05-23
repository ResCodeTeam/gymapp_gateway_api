import { doesNotReject } from "assert";
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

describe("Teste aceitar agendamento desafio", () => {
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
        .put("/treinador/agenda/desafios")
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
        .put("/treinador/agenda/desafios")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Aceitar agendamento desafio", () => {
    it("Deve retornar aceitar agendamento desafio com sucesso", () => {
      return chai
        .request(server)
        .put("/treinador/agenda/desafios")
        .set("Authorization", token)
        .send({
          agendamentoId: "581ccc36-1361-420c-8052-c5db64528002",
        })
        .then((res) => {
          res.should.have.status(200);

          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("agendamento_id");
          chai.expect(res.body).to.have.property("uid");
          chai.expect(res.body).to.have.property("data_agendamento");
          chai.expect(res.body).to.have.property("isAceite");
          chai.expect(res.body).to.have.property("desafio_id");
          chai.expect(res.body).to.have.property("ginasio_id");
          chai.expect(res.body).to.have.property("isDeleted");

          chai.expect(res.body["agendamento_id"]).to.be.a("string");
          chai.expect(res.body["uid"]).to.be.a("string");
          chai.expect(res.body["data_agendamento"]).to.be.a("string");
          chai.expect(res.body["isAceite"]).to.be.a("boolean");
          chai.expect(res.body["desafio_id"]).to.be.a("string");
          chai.expect(res.body["ginasio_id"]).to.be.a("string");
          chai.expect(res.body["isDeleted"]).to.be.a("boolean");
        });
    });
  });
});
