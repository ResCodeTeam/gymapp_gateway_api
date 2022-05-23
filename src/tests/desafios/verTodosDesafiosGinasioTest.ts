import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idGim = "a97e6887-31dc-4186-ad27-09e0fb7d645e"
let token = ''

describe("Teste Obter todos os desafios de um ginasio", () => {
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
        .get('/ginasio/' + idGim + '/desafios/')
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
        .get('/ginasio/' + idGim + '/desafios/')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Ver todos os desafios de um ginasio corretamente', () => {
    it('Deve retornar os desafios', () => {
      return chai
        .request(server)
        .get('/ginasio/' + idGim + '/desafios/')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          chai.expect(res.body).to.be.an("array")
          if (res.body.length > 0) {

            //verificar se as propriedades todas existem
            chai.expect(res.body[0]).to.be.an("object")
            chai.expect(res.body[0]).to.have.property("nome")
            chai.expect(res.body[0]).to.have.property("data_inicio")
            chai.expect(res.body[0]).to.have.property("data_fim")
            chai.expect(res.body[0]).to.have.property("recompensa")
            chai.expect(res.body[0]).to.have.property("descricao")
            chai.expect(res.body[0]).to.have.property("isEncerrado")




            //verificar tipos das propriedades 
            chai.expect(res.body[0]['nome']).to.be.a("string")
            chai.expect(res.body[0]['data_inicio']).to.be.a("string")
            chai.expect(res.body[0]['data_fim']).to.be.a("string")
            chai.expect(res.body[0]['recompensa']).to.be.a("number")
            chai.expect(res.body[0]['descricao']).to.be.a("string")
            chai.expect(res.body[0]['isEncerrado']).to.be.a("boolean")


          }
        })
    })
  })
})