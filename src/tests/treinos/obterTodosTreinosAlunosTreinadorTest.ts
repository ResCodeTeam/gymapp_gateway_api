import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const userId = "000d1e14-617e-423e-8a1a-f63d4fa5af6a"

let token = ''

describe("Teste obter todos os treinos dos alunos treinador", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
            .send({
                email: "treinador@treinador.com",
                password: "treinador"
            })
            .end((err, res) => {
                token = `Bearer ${res.body.token}`;
                res.should.have.status(200);
                done();
            });
    });
    describe('- Sem token', () => {
        it('Deve retornar erro de authToken invalido', () => {
            return chai.request(server).get(baseUrl + '/treinador/treinos/')
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
                .get(baseUrl + '/treinador/treinos/')
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Obter todos os treinos dos alunos treinador corretamente', () => {
        it('Deve obter todos os treinos dos alunos treinador', () => {
            return chai
                .request(server)
                .get(baseUrl + '/treinador/treinos/')
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.be.an("array")
                    chai.expect(res.body[0]).to.be.an("object")

                    chai.expect(res.body[0]).to.have.property("nome")
                    chai.expect(res.body[0]).to.have.property("treinos")


                    chai.expect(res.body[0]['nome']).to.be.a("string")
                    chai.expect(res.body[0]['treinos']).to.be.a("object")

                    chai.expect(res.body[0]['treinos']).to.have.property("treino_id")
                    chai.expect(res.body[0]['treinos']).to.have.property("uid")
                    chai.expect(res.body[0]['treinos']).to.have.property("atividade_id")
                    chai.expect(res.body[0]['treinos']).to.have.property("modalidade_id")
                    chai.expect(res.body[0]['treinos']).to.have.property("duracao")
                    chai.expect(res.body[0]['treinos']).to.have.property("calorias")
                    chai.expect(res.body[0]['treinos']).to.have.property("distancia")
                    chai.expect(res.body[0]['treinos']).to.have.property("data")
                    chai.expect(res.body[0]['treinos']).to.have.property("isDeleted")

                    chai.expect(res.body[0]['treinos']['treino_id']).to.be.a("string")
                    chai.expect(res.body[0]['treinos']['uid']).to.be.a("string")
                    chai.expect(res.body[0]['treinos']['atividade_id']).to.be.a("string")
                    if (res.body[0]['treinos']['modalidade_id'] != null) {
                        chai.expect(res.body[0]['treinos']['modalidade_id']).to.be.a("string")
                    }
                    chai.expect(res.body[0]['treinos']['duracao']).to.be.a("string")
                    chai.expect(res.body[0]['treinos']['calorias']).to.be.a("number")
                    chai.expect(res.body[0]['treinos']['distancia']).to.be.a("number")
                    chai.expect(res.body[0]['treinos']['data']).to.be.a("string")
                    chai.expect(res.body[0]['treinos']['isDeleted']).to.be.a("boolean")

                })
        })
    })
})
