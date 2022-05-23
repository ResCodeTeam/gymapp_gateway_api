import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"
const idUser = "332b256d-d646-4877-8a4f-f5538472e0d4"

let token = ''

describe("Teste registar um ginásio:", () => {
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

  describe('-Gerar token corretamente', () => {
    it('Deve retornar novo token', () => {
      return chai
        .request(server)
        .post('/auth/token')
        .set("Authorization", token)
        .send({
            id: "332b256d-d646-4877-8a4f-f5538472e0d4",
            
          })

        .then(res => {
          res.should.have.status(200)
          console.log(res.body)
          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem   
          chai.expect(res.body).to.have.property("token")

          chai.expect(res.body['token']).to.be.a("string")

        })

    })
  })

})