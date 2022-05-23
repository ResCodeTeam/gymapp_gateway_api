import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"

let token = ''

describe("Teste registar CP:", () => {

  describe('-Registar cp corretamente', () => {
    it('Deve retornar cp criada', () => {
      return chai
        .request(server)
        .post(baseUrl + '/backend/cp')
        .set("Authorization", token)
        .send({
            cp: 4760,
            cpExt: 363,
            rua: "Travessa dos testes",
            localidade: "Vila Nova de Famalicao"
          })

        .then(res => {
          res.should.have.status(200)
          console.log(res.body)
          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem
          
          chai.expect(res.body).to.have.property("msg")

          chai.expect(res.body['msg']).to.be.a("string")
        })

    })
  })

})