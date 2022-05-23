import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const startDate = "2022-05-13"
const endDate = "2022-05-19"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste obter plano de treino semanal", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
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
            return chai.request(server).get(baseUrl + '/aluno/planoTreino/' + startDate + '/' + endDate)
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
                .get(baseUrl + '/aluno/planoTreino/' + startDate + '/' + endDate)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Obter plano de treino semanal corretamente', () => {
        it('Deve obter plano de treino semanal do utilizador', () => {
            return chai
                .request(server)
                .get(baseUrl + '/aluno/planoTreino/' + startDate + '/' + endDate)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.be.an("array")
                    chai.expect(res.body[0]).to.be.an("object")

                    chai.expect(res.body[0]).to.have.property("data")
                    chai.expect(res.body[0]).to.have.property("isRealizado")
                    chai.expect(res.body[0]).to.have.property("treinador")
                    chai.expect(res.body[0]).to.have.property("modalidade")
                    chai.expect(res.body[0]).to.have.property("bloco_treino")

                    chai.expect(res.body[0]['data']).to.be.a("string")
                    chai.expect(res.body[0]['isRealizado']).to.be.a("boolean")
                    chai.expect(res.body[0]['treinador']).to.be.a("object")
                    chai.expect(res.body[0]['modalidade']).to.be.a("object")
                    chai.expect(res.body[0]['bloco_treino']).to.be.a("array")


                    //Objeto Treinador
                    chai.expect(res.body[0]['treinador']).to.have.property("nome")
                    chai.expect(res.body[0]['treinador']).to.have.property("email")
                    chai.expect(res.body[0]['treinador']).to.have.property("imagem_url")

                    chai.expect(res.body[0]['treinador']['nome']).to.be.a("string")
                    chai.expect(res.body[0]['treinador']['email']).to.be.a("string")

                    if (res.body[0]['treinador']['imagem_url'] != null) {
                        chai.expect(res.body[0]['treinador']['imagem_url']).to.be.a("string")
                    }
                  
                    //Objeto Modalidade
                    chai.expect(res.body[0]['modalidade']).to.have.property("nome")
                    chai.expect(res.body[0]['modalidade']['nome']).to.be.a("string")

                    //Array Bloco Treino
                    if (res.body[0]['bloco_treino'].length > 0) {
                        chai.expect(res.body[0]['bloco_treino'][0]).to.be.an("object")
                        chai.expect(res.body[0]['bloco_treino'][0]).to.have.property("nome")
                        chai.expect(res.body[0]['bloco_treino'][0]).to.have.property("descricao")
                        chai.expect(res.body[0]['bloco_treino'][0]).to.have.property("exercicios_bloco")
                        
                        chai.expect(res.body[0]['bloco_treino'][0]['nome']).to.be.a("string")
                        chai.expect(res.body[0]['bloco_treino'][0]['descricao']).to.be.a("string")
                        chai.expect(res.body[0]['bloco_treino'][0]['exercicios_bloco']).to.be.a("array")
                    }

                })
        })
    })
})
