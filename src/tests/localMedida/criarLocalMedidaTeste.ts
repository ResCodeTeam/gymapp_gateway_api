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
describe("Teste criar local de medida:", () => {
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
        .post("/admin/marca/" + idMarca + "/localMedida")
        .send({
          descricao: "dorsal",
          unilado: false,
        })

        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });
  describe("-Registar aluno corretamente", () => {
    it("Deve retornar aluno criado", () => {
      return chai
        .request(server)
        .post("/admin/marca/" + idMarca + "/localMedida")
        .set("Authorization", token)

        .send({
          descricao: "dorsal",
          unilado: false,
        })

        .then((res) => {
          res.should.have.status(200);
          console.log(res.body);
          chai.expect(res.body).to.be.an("object");

          //verificar se é um objeto
          //verificar se as propriedades todas existem

          chai.expect(res.body).to.have.property("descricao");
          chai.expect(res.body).to.have.property("unilado");
          chai.expect(res.body).to.have.property("local_medida_id");

          chai.expect(res.body["descricao"]).to.be.a("string");
          chai.expect(res.body["unilado"]).to.be.a("boolean");
          chai.expect(res.body["local_medida_id"]).to.be.a("string");
        });
    });
  });
});
