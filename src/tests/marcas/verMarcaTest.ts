import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTIyNTk1MzAsImV4cCI6MTY1MjI2MDQzMCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.WEtDbxCu7zu8jA2cFsIlgz7vYreilB0xrhN4qmNcP0I'
const idMarca = "f34fdd41-8670-4b50-9311-ebdb0ad993c4"
let token = ''

describe("Teste Obter uma marca", () => {
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
        .get('/admin/marca/' + idMarca)
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
        .get('/admin/marca/' + idMarca)
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Obter a marca corretamente', () => {
    it('Deve retornar a marca', () => {
      return chai
        .request(server)
        .get('/admin/marca/' + idMarca)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("marca_id")
          chai.expect(res.body).to.have.property("dono_id")
          chai.expect(res.body).to.have.property("nome")
          chai.expect(res.body).to.have.property("mobilidade")
          chai.expect(res.body).to.have.property("cor")
          chai.expect(res.body).to.have.property("logotipo")
          chai.expect(res.body).to.have.property("isDeleted")


          //verificar tipos das propriedades 
          chai.expect(res.body['marca_id']).to.be.a("string")
          chai.expect(res.body['dono_id']).to.be.a("string")
          chai.expect(res.body['nome']).to.be.a("string")
          chai.expect(res.body['mobilidade']).to.be.a("boolean")
          chai.expect(res.body['cor']).to.be.a("string")
          chai.expect(res.body['logotipo']).to.be.a("string")
          chai.expect(res.body['isDeleted']).to.be.a("boolean")

        })
    })
  })
})