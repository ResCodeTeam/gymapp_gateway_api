import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTIyNTk1MzAsImV4cCI6MTY1MjI2MDQzMCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.WEtDbxCu7zu8jA2cFsIlgz7vYreilB0xrhN4qmNcP0I";

let token = "";

describe("Teste Obter todos os treinos de um aluno", () => {
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
        .get("/aluno/treinos/")
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
        .get("/aluno/treinos/")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter todos os treinos de um aluno corretamente", () => {
    it("Deve retornar treinos", () => {
      return chai
        .request(server)
        .get("/aluno/treinos/")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          chai.expect(res.body).to.be.an("array");
          if (res.body.length > 0) {
            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("treino_id");
            chai.expect(res.body[0]).to.have.property("uid");
            chai.expect(res.body[0]).to.have.property("atividade_id");
            chai.expect(res.body[0]).to.have.property("modalidade_id");
            chai.expect(res.body[0]).to.have.property("duracao");
            chai.expect(res.body[0]).to.have.property("calorias");
            chai.expect(res.body[0]).to.have.property("distancia");
            chai.expect(res.body[0]).to.have.property("data");
            chai.expect(res.body[0]).to.have.property("isDeleted");

            //verificar tipos das propriedades
            chai.expect(res.body[0]["treino_id"]).to.be.a("string");
            chai.expect(res.body[0]["uid"]).to.be.a("string");
            if (res.body[0]["atividade_id"] != null) {
              chai.expect(res.body[0]["modalidade_id"]).to.be.a("null");
            }
            if (res.body[0]["modalidade_id"] != null) {
              chai.expect(res.body[0]["atividade_id"]).to.be.a("null");
            }
            chai.expect(res.body[0]["duracao"]).to.be.a("string");
            chai.expect(res.body[0]["calorias"]).to.be.a("number");
            chai.expect(res.body[0]["distancia"]).to.be.a("number");
            chai.expect(res.body[0]["data"]).to.be.a("string");
            chai.expect(res.body[0]["isDeleted"]).to.be.a("boolean");
          }
        });
    });
  });
});
