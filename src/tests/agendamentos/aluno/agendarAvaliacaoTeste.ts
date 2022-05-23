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
describe("Teste agendar avaliação de aluno:", () => {
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
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .post("/aluno/agenda/avaliacao")
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
        .post("/aluno/agenda/avaliacao")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("-Agendar avaliação corretamente para aluno", () => {
    it("Deve retornar agendamento criado", () => {
      return chai
        .request(server)
        .post("/aluno/agenda/avaliacao")
        .set("Authorization", token)
        .send({
          ginasioId: "a70e117f-4b53-447f-b67d-6b1c93bd501d",
          dataAgendamento: "2022-07-03T13:24:10.574Z",
        })
        .then((res) => {
          res.should.have.status(200);
          // verificar se é um object

          chai.expect(res.body).to.be.an("object");
          //verificar se as propriedades todas existem
          // chai.expect(res.body).to.have.property("uid")
          chai.expect(res.body).to.have.property("data_agendamento");
          chai.expect(res.body).to.have.property("ginasio_id");
          // chai.expect(res.body).to.have.property("agendamento_id")
          // chai.expect(res.body).to.have.property("isAceite")
          // chai.expect(res.body).to.have.property("isDeleted")

          // chai.expect(res.body['uid']).to.be.a("string")
          chai.expect(res.body["data_agendamento"]).to.be.a("string");
          chai.expect(res.body["ginasio_id"]).to.be.a("string");
          // chai.expect(res.body['agendamento_id']).to.be.a("string")

          // if (res.body['isAceite'] != null) {
          //   chai.expect(res.body['isAceite']).to.be.a("boolean")

          // }
          // if (res.body['isDeleted'] != null) {
          //   chai.expect(res.body['isDeleted']).to.be.a("boolean")

          // }
        });
    });
  });
});
