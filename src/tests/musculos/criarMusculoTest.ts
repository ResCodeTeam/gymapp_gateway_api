import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";

describe("- Criar musculo sem body", () => {
  it("Deve retornar erro de body incompleto", () => {
    return chai
      .request(server)
      .post("/backend/musculos/")
      .then((res) => {
        // não mando nenhum send - tem que retornar mensagem 500 - erro
        res.should.have.status(500);
        chai.expect(res.body).to.be.an("object");
      });
  });
});

describe("- Criar musculo corretamente", () => {
  it("Deve retornar musculo criada", () => {
    return chai
      .request(server)
      .post("/backend/musculos/")
      .send({
        nome: "Teste3",
        image: "http://imagem/teste3",
      })
      .then((res) => {
        res.should.have.status(200);
        // verificar se é um objeto
        chai.expect(res.body).to.be.an("object");

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("nome");
        chai.expect(res.body).to.have.property("img_url");

        //verificar tipos das propriedades
        chai.expect(res.body["nome"]).to.be.a("string");
        chai.expect(res.body["img_url"]).to.be.a("string");
      });
  });
});
