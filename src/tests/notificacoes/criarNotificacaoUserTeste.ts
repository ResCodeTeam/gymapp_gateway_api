import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const destinoId = "000d1e14-617e-423e-8a1a-f63d4fa5af6a";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";
describe("Teste criar notificação users", () => {
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
        .post("/admin/notificacao/user")
        .send({
          "destinoId": destinoId
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
        .post("/admin/notificacao/user")
        .send({
          "destinoId": destinoId
        })
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Criar notificação users", () => {
    it("Deve retornar erro de body incompleto", () => {
      return chai
        .request(server)
        .post("/admin/notificacao/user")
        .send({
          "destinoId": destinoId
        })
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Criar notificação users", () => {
    it("Deve retornar criar notificação users com sucesso", () => {
      return chai
        .request(server)
        .post("/admin/notificacao/user")
        .set("Authorization", token)
        .send({
          "destinoId": destinoId,
          conteudo: "O seu agendamento foi aceite",
          tipo: 1,
        })
        .then((res) => {
          res.should.have.status(200);

          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("noti_id");
          chai.expect(res.body).to.have.property("origem_uid");
          chai.expect(res.body).to.have.property("conteudo");
          chai.expect(res.body).to.have.property("data");
          chai.expect(res.body).to.have.property("tipo");

          //verificar tipos das propriedades
          chai.expect(res.body["noti_id"]).to.be.a("string");
          chai.expect(res.body["origem_uid"]).to.be.a("string");
          chai.expect(res.body["conteudo"]).to.be.a("string");
          chai.expect(res.body["data"]).to.be.a("string");
          chai.expect(res.body["tipo"]).to.be.a("number");
        });
    });
  });
});
