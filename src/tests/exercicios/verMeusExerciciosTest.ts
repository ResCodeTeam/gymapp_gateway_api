import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste Obter Exercicios do treinador logado", () => {
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
    it('Deve retornar erro de token invalido', () => {
      return chai
        .request(server)
        .get(baseUrl + '/treinador/exercicios/treinador')
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Token invalido', () => {
    it('Deve retornar erro de token invalido', () => {
      return chai
        .request(server)
        .get(baseUrl + '/treinador/exercicios/treinador')
        .set("Authorization", tokenInvalido)
        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('- Obter exercicios corretamente', () => {
    it('Deve retornar os exercicios do treinador logado', () => {
      return chai
        .request(server)
        .get(baseUrl + '/treinador/exercicios/treinador')
        .set("Authorization", token)
        .then(res => {
          res.should.have.status(200)
          // verificar se é um object
          chai.expect(res.body).to.be.an("array")

          if (res.body.length > 0) {
            chai.expect(res.body[0]).to.have.property("exercicio_id")
            chai.expect(res.body[0]).to.have.property("nome")
            chai.expect(res.body[0]).to.have.property("descricao")
            chai.expect(res.body[0]).to.have.property("is_tempo")
            chai.expect(res.body[0]).to.have.property("imagens")
            chai.expect(res.body[0]).to.have.property("musculos")


            chai.expect(res.body[0]['exercicio_id']).to.be.an("string")
            chai.expect(res.body[0]['nome']).to.be.an("string")
            chai.expect(res.body[0]['descricao']).to.be.an("string")
            chai.expect(res.body[0]['is_tempo']).to.be.an("boolean")
            chai.expect(res.body[0]['imagens']).to.be.an("array")
            chai.expect(res.body[0]['musculos']).to.be.an("array")



            if (res.body[0]['imagens'].length > 0) {

              chai.expect(res.body[0]['imagens'][0]).to.be.an("object")

              chai.expect(res.body[0]['imagens'][0]).to.have.property("url")

              chai.expect(res.body[0]['imagens'][0]['url']).to.be.a("string")

            }

            if (res.body[0]['musculos'].length > 0) {

              chai.expect(res.body[0]['musculos'][0]).to.be.an("object")

              chai.expect(res.body[0]['musculos'][0]).to.have.property("musculos")

              chai.expect(res.body[0]['musculos'][0]['musculos']).to.be.an("array")


              if (res.body[0]['musculos'][0]['musculos'].length > 0) {

                chai.expect(res.body[0]['musculos'][0]['musculos'][0]).to.be.an("object")

                chai.expect(res.body[0]['musculos'][0]['musculos'][0]).to.have.property("nome")
                chai.expect(res.body[0]['musculos'][0]['musculos'][0]).to.have.property("img_url")

                chai.expect(res.body[0]['musculos'][0]['musculos'][0]['nome']).to.be.a("string")
                chai.expect(res.body[0]['musculos'][0]['musculos'][0]['img_url']).to.be.a("string")

              }

            }


          }
        })
    })
  })
})
