import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"

let token = ''

describe("Teste autenticacao:", () => {

  describe('-Autenticacao corretamente', () => {
    it('Deve retornar tokens de autenticacao', () => {
      return chai
        .request(server)
        .post('/auth/login')
        .set("Authorization", token)
        .send({
            email: "biancasilva@gmail.com",
            password: "passwd"
          })

        .then(res => {
          res.should.have.status(200)
          console.log(res.body)
          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem
          
          chai.expect(res.body).to.have.property("message")
          chai.expect(res.body).to.have.property("token")
          chai.expect(res.body).to.have.property("refreshToken")

          chai.expect(res.body['message']).to.be.a("string")
          chai.expect(res.body['token']).to.be.a("string")
          chai.expect(res.body['refreshToken']).to.be.a("string")

        })

    })
  })

})