import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const idMarca = "d9017634-c824-423d-96a3-6da7f162917a"

let token = ''

describe("Teste registar um ginásio:", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post(baseUrl + "/auth/login")
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
        .post(baseUrl + '/admin/marca/' + idMarca + '/ginasio/')
        .send({
          nome: "Ginasio Tester",
          rua: "Rua dos combatentes",
          cp: 3850,
          imagemUrl: "imagem",
          lat: "0",
          long: "0",
          cpExt: 821
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
        .post(baseUrl + '/admin/marca/' + idMarca + '/ginasio/')
        .set("Authorization", tokenInvalido)
        .send({
          nome: "Ginasio Tester",
          rua: "Rua dos combatentes",
          cp: 3850,
          imagemUrl: "imagem",
          lat: "0",
          long: "0",
          cpExt: 821
        })

        .then(res => {
          res.should.have.status(500)
          chai.expect(res.body).to.have.property("status")
          chai.expect(res.body).to.have.property("message")
        })
    })
  })

  describe('-Registar ginasio corretamente', () => {
    it('Deve retornar ginasio criado', () => {
      return chai
        .request(server)
        .post(baseUrl + '/admin/marca/' + idMarca + '/ginasio/')
        .set("Authorization", token)
        .send({
            nome: "Ginasio Tester",
            rua: "Rua dos combatentes",
            cp: 3850,
            imagemUrl: "imagem",
            lat: "0",
            long: "0",
            cpExt: 821
          })

        .then(res => {
          res.should.have.status(200)
          console.log(res.body)
          chai.expect(res.body).to.be.an("object")

          //verificar se é um objeto
          //verificar se as propriedades todas existem

          
          chai.expect(res.body).to.have.property("nome")
          chai.expect(res.body).to.have.property("rua")
          chai.expect(res.body).to.have.property("cp_id")
          chai.expect(res.body).to.have.property("imagem_url")
          chai.expect(res.body).to.have.property("lat")
          chai.expect(res.body).to.have.property("long")

          chai.expect(res.body['nome']).to.be.a("string")
          chai.expect(res.body['rua']).to.be.a("string")
          chai.expect(res.body['cp_id']).to.be.a("string")
          chai.expect(res.body['imagem_url']).to.be.a("string")
          chai.expect(res.body['lat']).to.be.a("string")
          chai.expect(res.body['long']).to.be.a("string")

          if (res.body['imagem_url'] != null) {
            chai.expect(res.body['imagem_url']).to.be.a("string")
          }

        })

    })
  })

})