import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste criar treino", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
            .send({
                email: "biancasilva@gmail.com",
                password: "passwd"
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
                .post(baseUrl + '/aluno/treinos')
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
                .post(baseUrl + '/aluno/treinos')
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar treino', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .post(baseUrl + '/aluno/treinos')
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar  treino', () => {
        it('Deve retornar criar treino com sucesso', () => {
            return chai
                .request(server)
                .post(baseUrl + '/aluno/treinos ')
                .set("Authorization", token)
                .send({
                    atividadeId: null,
                    modalidadeId: "4272f33a-b2c9-46bf-83ab-c8a1a85fbd52",
                    duracao: "10",
                    calorias: 100,
                    distancia: 500,
                    data: "2022-04-18T17:51:26.567Z",
                    isDeleted: false
                })
                .then(res => {
                    res.should.have.status(200)
                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("treino_id")
                    chai.expect(res.body).to.have.property("uid")
                    chai.expect(res.body).to.have.property("modalidade_id")
                    chai.expect(res.body).to.have.property("duracao")
                    chai.expect(res.body).to.have.property("calorias")
                    chai.expect(res.body).to.have.property("distancia")
                    chai.expect(res.body).to.have.property("data")
                    chai.expect(res.body).to.have.property("isDeleted")   

                    //verificar tipos das propriedades
                    chai.expect(res.body['treino_id']).to.be.a("string")
                    chai.expect(res.body['uid']).to.be.a("string")
                    chai.expect(res.body['modalidade_id']).to.be.a("string")
                    chai.expect(res.body['duracao']).to.be.a("string")
                    chai.expect(res.body['calorias']).to.be.a("number")
                    chai.expect(res.body['distancia']).to.be.a("number")
                    chai.expect(res.body['data']).to.be.a("string")
                    chai.expect(res.body['isDeleted']).to.be.a("boolean")
                   

                })
        })
    })

})