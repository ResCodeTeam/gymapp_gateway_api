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

// buscar o token de quem está logado - neste caso a Bianca - linha 25
let token = "";

describe("Teste Obter as definições do user", () => {
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
        .get("/notificacoes")
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
        .get("/notificacoes")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter as notificacoes do user corretamente", () => {
    it("Deve retornar notificacoes", () => {
      return chai
        .request(server)
        .get("/notificacoes")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            chai.expect(res.body[0]).to.be.an("object");

            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("noti_id");
            chai.expect(res.body[0]).to.have.property("origem_uid");
            chai.expect(res.body[0]).to.have.property("conteudo");
            chai.expect(res.body[0]).to.have.property("data");
            chai.expect(res.body[0]).to.have.property("tipo");

            //verificar tipos das propriedades
            chai.expect(res.body[0]["noti_id"]).to.be.a("string");
            chai.expect(res.body[0]["origem_uid"]).to.be.a("string");
            chai.expect(res.body[0]["conteudo"]).to.be.a("string");
            chai.expect(res.body[0]["data"]).to.be.a("string");
            chai.expect(res.body[0]["tipo"]).to.be.a("number");
          }
        });
    });
  });
});
