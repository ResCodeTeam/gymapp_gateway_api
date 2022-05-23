import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"

describe('- Criar admin sem body', () => {
  it('Deve retornar erro de body incompleto', () => {
    return chai
      .request(server)
      .post('/backend/registo')
      .then(res => {
        res.should.have.status(500)
        chai.expect(res.body).to.be.an("object")
      })
  })
})

describe('- Criar admin corretamente', () => {
  it('Deve retornar admin criado', () => {
    return chai
      .request(server)
      .post('/backend/registo')
      .send({
        email: "admin32@admin.com",
        nome: "António",
        password: "admin",
        dataNasc: "2002-10-17",
        dataEntrada: "2022-10-05",
        genero: 1
      })
      .then(res => {

        res.should.have.status(200)
        // verificar se é um object
        chai.expect(res.body).to.be.an("object")

        //verificar se as propriedades todas existem
        chai.expect(res.body).to.have.property("email")
        chai.expect(res.body).to.have.property("nome")
        chai.expect(res.body).to.have.property("password")
        chai.expect(res.body).to.have.property("data_nasc")
        chai.expect(res.body).to.have.property("data_entrada")
        chai.expect(res.body).to.have.property("genero")

        //verificar tipos das propriedades
        chai.expect(res.body['email']).to.be.a("string")
        chai.expect(res.body['nome']).to.be.a("string")
        chai.expect(res.body['password']).to.be.a("string")
        chai.expect(res.body['data_nasc']).to.be.a("string")
        chai.expect(res.body['data_entrada']).to.be.a("string")
        chai.expect(res.body['genero']).to.be.a("number")
      })
  })
})