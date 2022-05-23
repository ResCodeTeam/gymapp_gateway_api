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
const idDesafio = "55036574-d7a8-43ec-87b5-2e72f25fbccf";

let token = "";

describe("Teste Obter Info de um desafio", () => {
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
        .get("/desafios/" + idDesafio)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Token invalido", () => {
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .get("/desafios/" + idDesafio)
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter info desafio corretamente", () => {
    it("Deve retornar um desafio", () => {
      return chai
        .request(server)
        .get("/desafios/" + idDesafio)
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          // verificar se é um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("desafio_id");
          chai.expect(res.body).to.have.property("nome");
          chai.expect(res.body).to.have.property("data_inicio");
          chai.expect(res.body).to.have.property("data_fim");
          chai.expect(res.body).to.have.property("recompensa");
          chai.expect(res.body).to.have.property("isEncerrado");
          chai.expect(res.body).to.have.property("descricao");
          chai.expect(res.body).to.have.property("user");
          chai.expect(res.body).to.have.property("modalidades_ginasio");
          chai.expect(res.body).to.have.property("regras_desafio");
          chai.expect(res.body).to.have.property("exercicios_desafio");

          //verificar tipos das propriedades
          chai.expect(res.body["desafio_id"]).to.be.a("string");
          chai.expect(res.body["nome"]).to.be.a("string");
          chai.expect(res.body["data_inicio"]).to.be.a("string");
          chai.expect(res.body["data_fim"]).to.be.a("string");
          chai.expect(res.body["recompensa"]).to.be.a("number");
          chai.expect(res.body["isEncerrado"]).to.be.a("boolean");
          chai.expect(res.body["descricao"]).to.be.a("number");
          chai.expect(res.body["user"]).to.be.an("array"); //
          chai.expect(res.body["modalidades_ginasio"]).to.be.an("array");
          chai.expect(res.body["regras_desafio"]).to.be.an("array");
          chai.expect(res.body["exercicios_desafio"]).to.be.an("array");

          //verificar se array das propriedades estão corretos
          if (res.body["user"].length > 0) {
            //verificar se objeto do array é um objeto
            chai.expect(res.body["user"]).to.be.an("object");

            chai.expect(res.body["user"]).to.have.property("nome");
            chai.expect(res.body["user"]).to.have.property("email");
            chai.expect(res.body["user"]).to.have.property("imagem_url");

            chai.expect(res.body["user"]["nome"]).to.be.a("string");
            chai.expect(res.body["user"]["email"]).to.be.a("string");
            chai.expect(res.body["user"]["imagem_url"]).to.be.a("string");
          }

          //verificar se array das propriedades estão corretos
          if (res.body["modalidades_ginasio"].length > 0) {
            chai.expect(res.body["modalidades_ginasio"]).to.be.an("object");

            chai
              .expect(res.body["modalidades_ginasio"])
              .to.have.property("nome");

            chai
              .expect(res.body["modalidades_ginasio"]["nome"])
              .to.be.a("string");
          }

          //verificar se array das propriedades estão corretos
          if (res.body["regras_desafio"].length > 0) {
            chai.expect(res.body["regras_desafio"]).to.be.an("object");

            chai
              .expect(res.body["regras_desafio"])
              .to.have.property("descricao");

            chai
              .expect(res.body["regras_desafio"]["descricao"])
              .to.be.a("string");
          }

          //verificar se array das propriedades estão corretos
          if (res.body["exercicios_desafio"].length > 0) {
            chai.expect(res.body["exercicios_desafio"]).to.be.an("object");

            chai
              .expect(res.body["exercicios_desafio"])
              .to.have.property("n_ordem_exercicio");
            chai
              .expect(res.body["exercicios_desafio"])
              .to.have.property("genero");
            chai
              .expect(res.body["exercicios_desafio"])
              .to.have.property("exercicios");
            chai
              .expect(res.body["exercicios_desafio"])
              .to.have.property("series_desafio");

            chai
              .expect(res.body["exercicios_desafio"]["n_ordem_exercicio"])
              .to.be.an("int");
            chai
              .expect(res.body["exercicios_desafio"]["genero"])
              .to.be.an("int");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.be.an("array");
            chai
              .expect(res.body["exercicios_desafio"]["series_desafio"])
              .to.be.an("array");
          }

          //verificar se array das propriedades estão corretos
          if (res.body["exercicios_desafio"]["exercicios"].length > 0) {
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.be.an("object");

            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.have.property("nome");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.have.property("descricao");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.have.property("is_tempo");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.have.property("imagens");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"])
              .to.have.property("musculos");

            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["nome"])
              .to.be.a("string");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["descricao"])
              .to.be.a("string");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["is_tempo"])
              .to.be.a("boolean");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["imagens"])
              .to.be.an("array");
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["musculos"])
              .to.be.an("array");
          }

          //verificar se array das propriedades estão corretos
          if (
            res.body["exercicios_desafio"]["exercicios"]["imagens"].length > 0
          ) {
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["imagens"])
              .to.be.an("object");

            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["imagens"])
              .to.have.property("url");

            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["imagens"]["url"]
              )
              .to.be.a("string");
          }

          //verificar se array das propriedades estão corretos
          if (
            res.body["exercicios_desafio"]["exercicios"]["musculos"].length > 0
          ) {
            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["musculos"])
              .to.be.an("object");

            chai
              .expect(res.body["exercicios_desafio"]["exercicios"]["musculos"])
              .to.have.property("musculos");

            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["musculos"][
                  "musculos"
                ]
              )
              .to.be.an("array");
          }

          //verificar se array das propriedades estão corretos
          if (
            res.body["exercicios_desafio"]["exercicios"]["musculos"]["musculos"]
              .length > 0
          ) {
            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["musculos"][
                  "musculos"
                ]
              )
              .to.be.an("object");

            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["musculos"][
                  "musculos"
                ]
              )
              .to.have.property("nome");
            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["musculos"][
                  "musculos"
                ]
              )
              .to.have.property("imagem_url");

            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["musculos"][
                  "musculos"
                ]["nome"]
              )
              .to.be.a("string");
            chai
              .expect(
                res.body["exercicios_desafio"]["exercicios"]["musculos"][
                  "musculos"
                ]["imagem_url"]
              )
              .to.be.a("string");
          }
        });
    });
  });
});
