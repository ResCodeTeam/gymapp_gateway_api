import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idExercicio = "10ab5b75-c3e3-4222-86ca-ef7a8d131800"

let token = ''

describe("Teste adicionar imagem ao exercicio:", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
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
        .post('/treinador/exercicios/' + idExercicio + '/imagens')
        .send({
          imagem_id: "7e23788c-ba54-454f-9690-db0ae379ca7f",
          exercicio_id: "10ab5b75-c3e3-4222-86ca-ef7a8d131800",
          url: "https://urlimagem.com"
        })

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
        .post('/treinador/exercicios/' + idExercicio + '/imagens')
        .set("Authorization", tokenInvalido)
        .send({
            imagem_id: "7e23788c-ba54-454f-9690-db0ae379ca7f",
            exercicio_id: "10ab5b75-c3e3-4222-86ca-ef7a8d131800",
            url: "https://urlimagem.com"
          })

        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('-Adicionar imagem ao exercicio corretamente', () => {
    it('Deve retornar uma imagem no exercicio', () => {
      return chai
        .request(server)
        .post('/treinador/exercicios/' + idExercicio + '/imagens')
        .set("Authorization", token)
        .send({
            imagem_id: "7e23788c-ba54-454f-9690-db0ae379ca7f",
            exercicio_id: "10ab5b75-c3e3-4222-86ca-ef7a8d131800",
            url: "https://urlimagem.com"
          })

        .then(res => {
          res.should.have.status(200)
          console.log(res.body)
          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem

          
          chai.expect(res.body).to.have.property("imagem_id")
          chai.expect(res.body).to.have.property("exercicio_id")
          chai.expect(res.body).to.have.property("url")

          chai.expect(res.body['imagem_id']).to.be.a("string")
          chai.expect(res.body['exercicio_id']).to.be.a("string")
          chai.expect(res.body['url']).to.be.a("string")
          
        })

    })
  })

})