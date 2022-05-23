import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"

let token = ''

describe("Teste registar função:", () => {

  describe('-Registar ginasio corretamente', () => {
    it('Deve retornar funcao criada', () => {
      return chai
        .request(server)
        .post(baseUrl + '/backend/funcoes')
        .set("Authorization", token)
        .send({
            nome: "Tester"
          })

        .then(res => {
          res.should.have.status(200)
          console.log(res.body)
          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem
          
          chai.expect(res.body).to.have.property("funcao_id")
          chai.expect(res.body).to.have.property("descricao")

          chai.expect(res.body['funcao_id']).to.be.a("string")
          chai.expect(res.body['descricao']).to.be.a("string")

        })

    })
  })

})