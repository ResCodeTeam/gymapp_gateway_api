import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900";

const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";
const idAgendamento = "405b9620-6f0a-4a63-9759-8e48b8fc83da";

// buscar o token de quem está logado - neste caso a Bianca - linha 25
let token = "";

describe("Teste aceitar avaliação", () => {
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
        .put("/treinador/agenda/avaliacao")
        .send({
          agendamentoId: "405b9620-6f0a-4a63-9759-8e48b8fc83da",
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
        .put("/treinador/agenda/avaliacao")
        .set("Authorization", tokenInvalido)
        .send({
          agendamentoId: "405b9620-6f0a-4a63-9759-8e48b8fc83da",
        })
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("-Aceitar avaliação corretamente", () => {
    it("Deve retornar mensagem de remoção", () => {
      return chai
        .request(server)
        .put("/treinador/agenda/avaliacao")
        .set("Authorization", token)
        .send({
          agendamentoId: "405b9620-6f0a-4a63-9759-8e48b8fc83da",
        })
        .then((res) => {
          res.should.have.status(200);
          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("msg");

          //verificar tipos das propriedades
          chai.expect(res.body["msg"]).to.be.a("string");
        });
    });
  });
});
