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

let token = "";

describe("Teste editar perfil", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "admin23@admin.com",
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
        .put("/perfil")
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
        .put("/perfil")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar perfil do user sem body", () => {
    it("Deve retornar erro de body incompleto", () => {
      return chai
        .request(server)
        .put("/perfil")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Editar perfil do user corretamente", () => {
    it("Deve retornar perfil do user", () => {
      return chai
        .request(server)
        .put("/perfil")
        .set("Authorization", token)
        .send({
          email: "admin24@admin.com",
          nome: "Joao",
          password: "admin",
          genero: 0,
          descricao: "teste",
          imagemUrl: "teste",
        })
        .then((res) => {
          res.should.have.status(200);
          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("email");
          chai.expect(res.body).to.have.property("nome");
          chai.expect(res.body).to.have.property("password");
          chai.expect(res.body).to.have.property("genero");
          chai.expect(res.body).to.have.property("descricao");
          chai.expect(res.body).to.have.property("imagem_url");

          //verificar tipos das propriedades
          chai.expect(res.body["email"]).to.be.a("string");
          chai.expect(res.body["nome"]).to.be.a("string");
          chai.expect(res.body["password"]).to.be.a("string");
          chai.expect(res.body["genero"]).to.be.a("number");
          if (res.body["descricao"] != null) {
            chai.expect(res.body["descricao"]).to.be.a("string");
          }
          if (res.body["imagem_url"] != null) {
            chai.expect(res.body["imagem_url"]).to.be.a("string");
          }
        });
    });
  });
});
