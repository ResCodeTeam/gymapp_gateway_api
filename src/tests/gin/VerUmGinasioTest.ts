import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTIyNTk1MzAsImV4cCI6MTY1MjI2MDQzMCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.WEtDbxCu7zu8jA2cFsIlgz7vYreilB0xrhN4qmNcP0I'
const idGin = "99d625ce-4fac-436c-8fcc-4528fda96598"
let token = ''

describe("Teste Obter um ginasio", () => {
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
  describe('- Sem token', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .get('/admin/ginasio/' + idGin)
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
        .get('/admin/ginasio/' + idGin)
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Obter um ginasio corretamente', () => {
    it('Deve retornar o ginasio', () => {
      return chai
        .request(server)
        .get('/admin/ginasio/' + idGin)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("ginasio_id")
          chai.expect(res.body).to.have.property("nome")
          chai.expect(res.body).to.have.property("rua")
          chai.expect(res.body).to.have.property("cp_id")
          chai.expect(res.body).to.have.property("marca_id")
          chai.expect(res.body).to.have.property("tag")
          chai.expect(res.body).to.have.property("descricao")
          chai.expect(res.body).to.have.property("imagem_url")
          chai.expect(res.body).to.have.property("lat")
          chai.expect(res.body).to.have.property("long")
          chai.expect(res.body).to.have.property("isDeleted")



          //verificar tipos das propriedades 
          chai.expect(res.body['ginasio_id']).to.be.a("string")
          chai.expect(res.body['nome']).to.be.a("string")
          chai.expect(res.body['rua']).to.be.a("string")
          chai.expect(res.body['cp_id']).to.be.a("string")
          chai.expect(res.body['marca_id']).to.be.a("string")
          chai.expect(res.body['tag']).to.be.a("string")
          chai.expect(res.body['descricao']).to.be.a("null")
          chai.expect(res.body['imagem_url']).to.be.a("string")
          chai.expect(res.body['lat']).to.be.a("string")
          chai.expect(res.body['long']).to.be.a("string")
          chai.expect(res.body['isDeleted']).to.be.a("boolean")


        })
    })
  })
})