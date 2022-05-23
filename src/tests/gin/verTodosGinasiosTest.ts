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
const idMarca = "2c4fc500-7373-44ed-a665-270f19da455c";
let token = "";

describe("Teste Obter todos os ginasios de uma marca", () => {
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
        .get("/admin/marca/" + idMarca + "/ginasio/")
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
        .get("/admin/marca/" + idMarca + "/ginasio/")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Ver todos os ginasios de uma marca corretamente", () => {
    it("Deve retornar ginasios", () => {
      return chai
        .request(server)
        .get("/admin/marca/" + idMarca + "/ginasio/")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.be.an("object");
            chai.expect(res.body[0]).to.have.property("nome");
            chai.expect(res.body[0]).to.have.property("imagem_url");

            //verificar tipos das propriedades
            chai.expect(res.body[0]["nome"]).to.be.a("string");
            chai.expect(res.body[0]["imagem_url"]).to.be.a("string");
          }
        });
    });
  });
});
