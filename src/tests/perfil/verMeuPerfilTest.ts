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

describe("Teste Obter Perfil do utilizador logado", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
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
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .get(baseUrl + "/perfil")
        .then((res) => {
          res.should.have.status(500);
          chai.expect(res.body).to.have.property("status");
          chai.expect(res.body).to.have.property("message");
        });
    });
  });

  describe("- Token invalido", () => {
    it("Deve retornar erro de token invalido", () => {
      return chai
        .request(server)
        .get(baseUrl + "/perfil")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Obter perfil corretamente", () => {
    it("Deve retornar um perfil", () => {
      return chai
        .request(server)
        .get(baseUrl + "/perfil")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);
          // verificar se é um object
          chai.expect(res.body).to.be.an("object");
          console.log(res.body);

          chai.expect(res.body).to.have.property("perfil");
          chai.expect(res.body).to.have.property("posts");

          chai.expect(res.body["perfil"]).to.be.an("object");
          chai.expect(res.body["posts"]).to.be.an("array");

          chai.expect(res.body["perfil"]).to.have.property("uid");
          chai.expect(res.body["perfil"]).to.have.property("email");
          chai.expect(res.body["perfil"]).to.have.property("nome");
          chai.expect(res.body["perfil"]).to.have.property("password");
          chai.expect(res.body["perfil"]).to.have.property("data_nasc");
          chai.expect(res.body["perfil"]).to.have.property("hashtag");
          chai.expect(res.body["perfil"]).to.have.property("data_entrada");
          chai.expect(res.body["perfil"]).to.have.property("funcao_id");
          chai.expect(res.body["perfil"]).to.have.property("refresh_token");
          chai.expect(res.body["perfil"]).to.have.property("genero");
          chai.expect(res.body["perfil"]).to.have.property("pontos");
          chai.expect(res.body["perfil"]).to.have.property("descricao");
          chai.expect(res.body["perfil"]).to.have.property("imagem_url");
          chai.expect(res.body["perfil"]).to.have.property("isDeleted");

          chai.expect(res.body["perfil"]["uid"]).to.be.a("string");
          chai.expect(res.body["perfil"]["email"]).to.be.a("string");
          chai.expect(res.body["perfil"]["nome"]).to.be.a("string");
          chai.expect(res.body["perfil"]["password"]).to.be.a("string");
          chai.expect(res.body["perfil"]["data_nasc"]).to.be.a("string");
          chai.expect(res.body["perfil"]["hashtag"]).to.be.a("string");
          chai.expect(res.body["perfil"]["data_entrada"]).to.be.a("string");
          chai.expect(res.body["perfil"]["funcao_id"]).to.be.a("string");
          chai.expect(res.body["perfil"]["refresh_token"]).to.be.a("string");
          chai.expect(res.body["perfil"]["genero"]).to.be.a("number");
          chai.expect(res.body["perfil"]["pontos"]).to.be.a("number");
          chai.expect(res.body["perfil"]["descricao"]).to.be.a("null");
          chai.expect(res.body["perfil"]["imagem_url"]).to.be.a("null");
          chai.expect(res.body["perfil"]["isDeleted"]).to.be.a("boolean");

          if (res.body["posts"].length > 0) {
            chai.expect(res.body["posts"][0]).to.have.property("publicacao_id");
            chai.expect(res.body["posts"][0]).to.have.property("criador_id");
            chai.expect(res.body["posts"][0]).to.have.property("ginasio_id");
            chai.expect(res.body["posts"][0]).to.have.property("data");
            chai.expect(res.body["posts"][0]).to.have.property("descricao");
            chai.expect(res.body["posts"][0]).to.have.property("tipo");
            chai
              .expect(res.body["posts"][0])
              .to.have.property("imagens_publicacao");
            chai
              .expect(res.body["posts"][0])
              .to.have.property("gostos_publicacao");
            chai.expect(res.body["posts"][0]).to.have.property("_count");

            chai
              .expect(res.body["posts"][0]["publicacao_id"])
              .to.be.a("string");
            chai.expect(res.body["posts"][0]["criador_id"]).to.be.a("string");
            chai.expect(res.body["posts"][0]["ginasio_id"]).to.be.a("null");
            chai.expect(res.body["posts"][0]["data"]).to.be.a("string");
            chai.expect(res.body["posts"][0]["descricao"]).to.be.a("string");
            chai.expect(res.body["posts"][0]["tipo"]).to.be.a("number");
            chai
              .expect(res.body["posts"][0]["imagens_publicacao"])
              .to.be.an("array");
            chai
              .expect(res.body["posts"][0]["gostos_publicacao"])
              .to.be.an("array");
            chai.expect(res.body["posts"][0]["_count"]).to.be.an("object");

            chai
              .expect(res.body["posts"][0]["_count"])
              .to.have.property("gostos_publicacao");
            chai
              .expect(res.body["posts"][0]["_count"]["gostos_publicacao"])
              .to.be.a("number");
          }
        });
    });
  });
});
