import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idTreino1 = '48474843-d48b-4786-9678-fe69248923dc'

const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

// buscar o token de quem está logado - neste caso a Bianca - linha 25
let token = ''

describe("Teste Remover treinos do user", () => {
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
  describe('- Sem token', () => {
    it('Deve retornar erro de authToken invalido', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/aluno/treino/' + idTreino1 + '/')
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
        .delete(baseUrl + '/aluno/treino/' + idTreino1 + '/')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Remover treino corretamente', () => {
    it('Deve retornar mensagem de remoção', () => {
      return chai
        .request(server)
        .delete(baseUrl + '/aluno/treino/' + idTreino1 + '/')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("msg")

          //verificar tipos das propriedades 
          chai.expect(res.body['msg']).to.be.a("string")
        })
    })
  })
})

