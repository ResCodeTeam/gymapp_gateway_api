import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste Obter toda a informação das atividades", () => {
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
  describe('- Sem token', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .get('/atividades')
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
        .get('/atividades')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Obter todas as atividades corretamente', () => {
    it('Deve retornar atividades', () => {
      return chai
        .request(server)
        .get('/atividades')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)
          chai.expect(res.body).to.be.an("array")
          if (res.body.length > 0) {
            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.have.property("atividade_id")
            chai.expect(res.body[0]).to.have.property("descricao")
            chai.expect(res.body[0]).to.have.property("icon")

            //verificar tipos das propriedades 
            chai.expect(res.body[0]['atividade_id']).to.be.a("string")
            chai.expect(res.body[0]['descricao']).to.be.a("string")
            chai.expect(res.body[0]['icon']).to.be.a("string")
          }
        })
    })
  })
})