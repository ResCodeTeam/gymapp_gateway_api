import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idMarca = 'b3c934d4-483c-4358-b7e6-caa1d75d8fe5'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste editar marca", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
      .send({
        email: "admin7@admin.com",
        password: "admin",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });
  describe('- Sem token', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/admin/marca/' + idMarca)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Token invalido', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .put(baseUrl + '/admin/marca/' + idMarca)
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Editar marca sem body', () => {
    it('Deve retornar erro de body incompleto', () => {
      return chai
        .request(server)
        .put(baseUrl + '/admin/marca/' + idMarca)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Editar marca corretamente', () => {
    it('Deve retornar marca editada com sucesso', () => {
      return chai
        .request(server)
        .put(baseUrl + '/admin/marca/' + idMarca)
        .set("Authorization", token)
        .send({
          nome: "teste unitario",
          mobilidade: false,
          cor: "vermelho",
          logotipo: "teste"
        })
        .then(res => {

          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("object")

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("nome")
          chai.expect(res.body).to.have.property("mobilidade")
          chai.expect(res.body).to.have.property("cor")
          chai.expect(res.body).to.have.property("logotipo")

          //verificar tipos das propriedades
          chai.expect(res.body['nome']).to.be.a("string")
          chai.expect(res.body['mobilidade']).to.be.a("boolean")
          chai.expect(res.body['cor']).to.be.a("string")
          chai.expect(res.body['logotipo']).to.be.a("string")
        })
    })
  })
})

