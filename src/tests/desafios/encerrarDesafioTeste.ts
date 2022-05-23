import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const desafioId = 'fefa26e4-90ea-4a5e-8878-c051faffeb29'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste encerrar desafio", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
            .send({
                email: "admin2@admin.com",
                password: "admin"
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
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId)
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
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Encerrar desafio sem body', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Encerrar desafio corretamente', () => {
        it('Deve retornar desafio encerrado com sucesso', () => {
            return chai
                .request(server)
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId)
                .set("Authorization", token)
                .send({
                    "isEncerrado": true
                  })
                .then(res => {

                    res.should.have.status(200)
                    // verificar se é um object
                    chai.expect(res.body).to.have.property("message")

                })
        })
    })
})
