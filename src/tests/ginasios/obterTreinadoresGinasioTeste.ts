import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const idMarca = "4c9abb59-e737-4a6c-82aa-46f213e48772";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste obter treinadores ginasio", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "admin2@admin.com",
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
        .get("/admin/ginasio/treinador/ver/" + idMarca)
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
        .get("/admin/ginasio/treinador/ver/" + idMarca)
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter todos treinadores ginasio corretamente", () => {
    it("Deve retornar musculos", () => {
      return chai
        .request(server)
        .get("/admin/ginasio/treinador/ver/" + idMarca)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("treinador_uid");
            //verificar tipos das propriedades
            chai.expect(res.body[0]["treinador_uid"]).to.be.a("string");
          }
        });
    });
  });
});
