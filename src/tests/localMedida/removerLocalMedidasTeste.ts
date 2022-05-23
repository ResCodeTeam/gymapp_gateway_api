import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const marcaId = "2c4fc500-7373-44ed-a665-270f19da455c";
const localId = "ef0e94f8-ea14-46a7-b704-b067f113444e";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste remover local medida", () => {
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
        .delete("/admin/marca/" + marcaId + "/localMedida/" + localId)
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
        .delete("/admin/marca/" + marcaId + "/localMedida/" + localId)
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.have.property("status");
          chai.expect(res.body).to.have.property("message");
        });
    });
  });

  describe("- Remover remover local medida", () => {
    it("Deve retornar remover local medida com sucesso", () => {
      return chai
        .request(server)
        .delete("/admin/marca/" + marcaId + "/localMedida/" + localId)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          chai.expect(res.body).to.have.property("msg");
        });
    });
  });
});
