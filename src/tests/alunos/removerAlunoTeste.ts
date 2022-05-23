import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idAluno = '0e3025e1-1449-4805-921d-95b86830bd30'

let token = ''

describe("Teste Remover aluno:", () => {
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
    it('Deve retornar erro de token invalido', () => {
      return chai
        .request(server)
        .delete('/admin/aluno/remover/' + idAluno)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Token expirado', () => {
    it('Deve retornar erro de token invalido', () => {
      return chai
        .request(server)
        .delete('/admin/aluno/remover/' + idAluno)
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Remover aluno corretamente', () => {
    it('Deve retornar mensagem de remoção', () => {
      return chai
        .request(server)
        .delete('/admin/aluno/remover/' + idAluno)
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)

          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem

          chai.expect(res.body).to.have.property("uid")
          chai.expect(res.body).to.have.property("email")
          chai.expect(res.body).to.have.property("nome")
          chai.expect(res.body).to.have.property("password")
          chai.expect(res.body).to.have.property("data_nasc")
          chai.expect(res.body).to.have.property("hashtag")
          chai.expect(res.body).to.have.property("data_entrada")
          chai.expect(res.body).to.have.property("funcao_id")
          chai.expect(res.body).to.have.property("refresh_token")
          chai.expect(res.body).to.have.property("genero")
          chai.expect(res.body).to.have.property("pontos")
          chai.expect(res.body).to.have.property("descricao")
          chai.expect(res.body).to.have.property("isDeleted")
          chai.expect(res.body).to.have.property("imagem_url")

          chai.expect(res.body['uid']).to.be.a("string")
          chai.expect(res.body['email']).to.be.a("string")
          chai.expect(res.body['nome']).to.be.a("string")
          chai.expect(res.body['password']).to.be.a("string")
          chai.expect(res.body['data_nasc']).to.be.a("string")
          chai.expect(res.body['hashtag']).to.be.a("string")
          chai.expect(res.body['data_entrada']).to.be.a("string")
          chai.expect(res.body['funcao_id']).to.be.a("string")
          chai.expect(res.body['genero']).to.be.a("number")
          chai.expect(res.body['pontos']).to.be.a("number")

          if (res.body['isDeleted'] != null) {
            chai.expect(res.body['isDeleted']).to.be.a("boolean")
          }

          if (res.body['refresh_token'] != null) {
            chai.expect(res.body['refresh_token']).to.be.a("string")
          }

          if (res.body['descricao'] != null) {
            chai.expect(res.body['descricao']).to.be.a("string")
          }

          if (res.body['imagem_url'] != null) {
            chai.expect(res.body['imagem_url']).to.be.a("string")
          }
        })
    })
  })
})
