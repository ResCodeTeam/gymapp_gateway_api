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

describe("Teste de logout:", () => {
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
        .delete("/auth/logout")
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
        .delete("/auth/logout")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Fazer o logout corretamente", () => {
    it("Deve retornar mensagem de logout", () => {
      return chai
        .request(server)
        .delete("/auth/logout")
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
