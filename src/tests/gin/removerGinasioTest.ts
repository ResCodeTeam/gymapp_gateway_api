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
const idGinasio = "531316a4-b454-42ec-bc01-7358a8c3bc48";

let token = "";

describe("Teste Remover Ginasio:", () => {
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
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .delete("/admin/ginasio/" + idGinasio)
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
        .delete("/admin/ginasio/" + idGinasio)
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Remover ginasio corretamente", () => {
    it("Deve retornar mensagem de remoção", () => {
      return chai
        .request(server)
        .delete("/admin/ginasio/" + idGinasio)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          chai.expect(res.body).to.be.an("object");

          //verificar se é um objeto
          //verificar se as propriedades todas existem

          chai.expect(res.body).to.have.property("msg");

          chai.expect(res.body["msg"]).to.be.a("string");
        });
    });
  });
});
