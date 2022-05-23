import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900";

describe("- Criar atividade sem body", () => {
  it("Deve retornar erro de body incompleto", () => {
    return chai
      .request(server)
      .post("/backend/atividades")
      .then((res) => {
        res.should.have.status(500);
        chai.expect(res.body).to.be.an("object");
      });
  });
});

describe("- Criar atividade corretamente", () => {
  it("Deve retornar atividade criada", () => {
    return chai
      .request(server)
      .post("/backend/atividades")
      .send({
        descricao: "teste unitario2",
        icon: "img",
      })
      .then((res) => {
        res.should.have.status(200);
        // verificar se é um object
        chai.expect(res.body).to.be.an("object");

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("atividade_id");
        chai.expect(res.body).to.have.property("descricao");
        chai.expect(res.body).to.have.property("icon");

        //verificar tipos das propriedades
        chai.expect(res.body["atividade_id"]).to.be.a("string");
        chai.expect(res.body["descricao"]).to.be.a("string");
        chai.expect(res.body["icon"]).to.be.a("string");
      });
  });
});
