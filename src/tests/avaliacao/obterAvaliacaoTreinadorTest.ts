import { doesNotReject } from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const alunoId = "000d1e14-617e-423e-8a1a-f63d4fa5af6a"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste obter avaliacao do aluno treinador", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post("/auth/login")
            .send({
                email: "treinador@treinador.com",
                password: "treinador"
            })
            .end((err, res) => {
                token = `Bearer ${res.body.token}`;
                res.should.have.status(200);
                done()
            });
    });


    describe('- Sem token', () => {
        it('Deve retornar erro de authToken invalido', () => {
            return chai
                .request(server)
                .get('/treinador/avaliacoes/' + alunoId)
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
                .get('/treinador/avaliacoes/' + alunoId)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })


    describe('- Obter avaliacao do aluno treinador', () => {
        it('Deve retornar avaliacao do aluno treinador com sucesso', () => {
            return chai
                .request(server)
                .get('/treinador/avaliacoes/' + alunoId)
                .set("Authorization", token)

                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.be.an("array")
                    chai.expect(res.body[0]).to.be.an("object")

                    chai.expect(res.body[0]).to.have.property("avaliacao_id")
                    chai.expect(res.body[0]).to.have.property("data")
                    chai.expect(res.body[0]).to.have.property("peso")
                    chai.expect(res.body[0]).to.have.property("musculo")
                    chai.expect(res.body[0]).to.have.property("gordura_corporal")
                    chai.expect(res.body[0]).to.have.property("gordura_visceral")
                    chai.expect(res.body[0]).to.have.property("agua")
                    chai.expect(res.body[0]).to.have.property("massa_ossea")
                    chai.expect(res.body[0]).to.have.property("metabolismo_basal")
                    chai.expect(res.body[0]).to.have.property("avaliacao_imagens")
                    chai.expect(res.body[0]).to.have.property("medidas_avaliacao")
                    chai.expect(res.body[0]).to.have.property("users_avaliacoes_treinador_idTousers")

                    chai.expect(res.body[0]['avaliacao_id']).to.be.a("string")
                    chai.expect(res.body[0]['data']).to.be.a("string")
                    chai.expect(res.body[0]['peso']).to.be.a("number")
                    chai.expect(res.body[0]['musculo']).to.be.a("number")
                    chai.expect(res.body[0]['gordura_corporal']).to.be.a("number")
                    chai.expect(res.body[0]['gordura_visceral']).to.be.a("number")
                    chai.expect(res.body[0]['agua']).to.be.a("number")
                    chai.expect(res.body[0]['massa_ossea']).to.be.a("number")
                    chai.expect(res.body[0]['metabolismo_basal']).to.be.a("number")
                    chai.expect(res.body[0]['avaliacao_imagens']).to.be.a("array")
                    chai.expect(res.body[0]['medidas_avaliacao']).to.be.a("array")
                    chai.expect(res.body[0]['users_avaliacoes_treinador_idTousers']).to.be.a("object")


                    if (res.body[0]['avaliacao_imagens'].length > 0) {
                        chai.expect(res.body[0]['avaliacao_imagens'][0]).to.be.a("object")
                        chai.expect(res.body[0]['avaliacao_imagens'][0]).to.have.property("url")
                        if (res.body[0]['avaliacao_imagens'][0]['url'] != null) {
                            chai.expect(res.body[0]['avaliacao_imagens'][0]['url']).to.be.a("string")
                        } 
                    }

                    if (res.body[0]['medidas_avaliacao'].length > 0) {
                        chai.expect(res.body[0]['medidas_avaliacao'][0]).to.be.a("object")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]).to.have.property("medida")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]).to.have.property("unidade_medida")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]).to.have.property("locais_medidas")

                        chai.expect(res.body[0]['medidas_avaliacao'][0]['medida']).to.be.a("string")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]['unidade_medida']).to.be.a("string")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]['locais_medidas']).to.be.a("object")

                        chai.expect(res.body[0]['medidas_avaliacao'][0]['locais_medidas']).to.have.property("descricao")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]['locais_medidas']).to.have.property("unilado")

                        chai.expect(res.body[0]['medidas_avaliacao'][0]['locais_medidas']['descricao']).to.be.a("string")
                        chai.expect(res.body[0]['medidas_avaliacao'][0]['locais_medidas']['unilado']).to.be.a("boolean")
                    }

                    chai.expect(res.body[0]['users_avaliacoes_treinador_idTousers']).to.have.property("nome")
                    chai.expect(res.body[0]['users_avaliacoes_treinador_idTousers']).to.have.property("imagem_url")

                    chai.expect(res.body[0]['users_avaliacoes_treinador_idTousers']['nome']).to.be.a("string")
                    if (res.body[0]['users_avaliacoes_treinador_idTousers']['imagem_url'] != null) {
                        chai.expect(res.body[0]['users_avaliacoes_treinador_idTousers']['imagem_url']).to.be.a("string")
                    }

                })
        })
    })
})