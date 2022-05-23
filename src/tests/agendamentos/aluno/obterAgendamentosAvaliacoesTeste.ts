import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste obter agendamentos de avaliações do aluno", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post("/auth/login")
            .send({
                email: "biancasilva@gmail.com",
                password: "passwd",
            })
            .end((err, res) => {
                token = `Bearer ${res.body.token}`;
                res.should.have.status(200);
                done();
            });
    });
    describe('- Sem token', () => {
        it('Deve retornar erro de authToken invalido', () => {
            return chai.request(server).get('/aluno/agenda/avaliacoes')
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
                .get('/aluno/agenda/avaliacoes')
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Obter agendamentos de avaliações do aluno corretamente', () => {
        it('Deve Obter agendamentos de avaliações do aluno corretamente', () => {
            return chai
                .request(server)
                .get('/aluno/agenda/avaliacoes')
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.be.an("array")
                    chai.expect(res.body[0]).to.be.an("object")

                    chai.expect(res.body[0]).to.have.property("agendamento_id")
                    chai.expect(res.body[0]).to.have.property("uid")
                    chai.expect(res.body[0]).to.have.property("data_agendamento")
                    chai.expect(res.body[0]).to.have.property("isAceite")
                    chai.expect(res.body[0]).to.have.property("ginasio_id")
                    chai.expect(res.body[0]).to.have.property("isDeleted")

                    chai.expect(res.body[0]['agendamento_id']).to.be.a("string")
                    chai.expect(res.body[0]['uid']).to.be.a("string")
                    chai.expect(res.body[0]['data_agendamento']).to.be.a("string")
                    chai.expect(res.body[0]['isAceite']).to.be.a("boolean")
                    chai.expect(res.body[0]['ginasio_id']).to.be.a("string")
                    chai.expect(res.body[0]['isDeleted']).to.be.a("boolean")
                })
        })
    })
})

