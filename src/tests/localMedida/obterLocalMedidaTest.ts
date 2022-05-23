import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTIyNTk1MzAsImV4cCI6MTY1MjI2MDQzMCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.WEtDbxCu7zu8jA2cFsIlgz7vYreilB0xrhN4qmNcP0I'

let token = ''

describe("Teste Obter toda a informação dos musculos", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
      .send({
        email: "treinador@treinador.com",
        password: "treinador",
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
        .get(baseUrl + '/treinador/locaisMedida/')
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
        .get(baseUrl + '/treinador/locaisMedida/')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Obter todos os locais de medida corretamente', () => {
    it('Deve retornar locais de medida', () => {
      return chai
        .request(server)
        .get(baseUrl + '/treinador/locaisMedida/')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)
          chai.expect(res.body).to.be.an("array")
          if (res.body.length > 0) {
            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("local_medida_id")
            chai.expect(res.body[0]).to.have.property("descricao")
            chai.expect(res.body[0]).to.have.property("unilado")

            //verificar tipos das propriedades 
            chai.expect(res.body[0]['local_medida_id']).to.be.a("string")
            chai.expect(res.body[0]['descricao']).to.be.a("string")
            chai.expect(res.body[0]['unilado']).to.be.a("boolean")
          }
        })
    })
  })
})