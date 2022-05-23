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

describe("Teste criar avaliacao treinador", () => {
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
                .post('/treinador/avaliacoes')
                .send({
                    aluno_id: "000d1e14-617e-423e-8a1a-f63d4fa5af6a"
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
                .post('/treinador/avaliacoes')
                .set("Authorization", tokenInvalido)
                .send({
                    aluno_id: "000d1e14-617e-423e-8a1a-f63d4fa5af6a"
                })
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar avaliacao treinador', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .post('/treinador/avaliacoes')
                .set("Authorization", token)
                .send({
                    aluno_id: "000d1e14-617e-423e-8a1a-f63d4fa5af6a"
                })
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar avaliacao treinador', () => {
        it('Deve retornar criar avaliacao treinador com sucesso', () => {
            return chai
                .request(server)
                .post('/treinador/avaliacoes')
                .set("Authorization", token)
                .send({
                    aluno_id: "000d1e14-617e-423e-8a1a-f63d4fa5af6a",
                    peso: 55,
                    unidadePeso: "Kg",
                    musculo: 80,
                    gorduraCorporal: 1,
                    gorduraVisceral: 1,
                    agua: 30,
                    proteina: 20,
                    massaOssea: 10,
                    metabolismoBasal: 1600,
                    imagens: [
                      "https://imagem.1",
                      "https://imagem.2",
                      "https://imagem.3",
                      "https://imagem.4"
                    ],
                    medidas: [
                      {
                        medida: "50",
                        unidadeMedida: "cm",
                        localMedidaId: "df7b9d8a-d149-4d68-9caa-6809ec090f88"
                      },
                      {
                        medida: "30x30",
                        unidadeMedida: "cm",
                        localMedidaId: "a6b6c833-16ef-4a16-bf51-3014f28fd149"
                      }
                    ]
                  })
                  .then(res => {
                    res.should.have.status(200)

                    chai.expect(res.body).to.be.an("object")

                    chai.expect(res.body).to.have.property("avaliacao_id")
                    chai.expect(res.body).to.have.property("aluno_id")
                    chai.expect(res.body).to.have.property("data")
                    chai.expect(res.body).to.have.property("peso")
                    chai.expect(res.body).to.have.property("unidade_peso")
                    chai.expect(res.body).to.have.property("treinador_id")
                    chai.expect(res.body).to.have.property("musculo")
                    chai.expect(res.body).to.have.property("gordura_corporal")
                    chai.expect(res.body).to.have.property("gordura_visceral")
                    chai.expect(res.body).to.have.property("agua")
                    chai.expect(res.body).to.have.property("proteina")
                    chai.expect(res.body).to.have.property("massa_ossea")
                    chai.expect(res.body).to.have.property("metabolismo_basal")
                    chai.expect(res.body).to.have.property("isDeleted")

                    chai.expect(res.body['avaliacao_id']).to.be.a("string")
                    chai.expect(res.body['aluno_id']).to.be.a("string")
                    chai.expect(res.body['data']).to.be.a("string")
                    chai.expect(res.body['peso']).to.be.a("number")
                    chai.expect(res.body['unidade_peso']).to.be.a("string")
                    chai.expect(res.body['treinador_id']).to.be.a("string")
                    chai.expect(res.body['musculo']).to.be.a("number")
                    chai.expect(res.body['gordura_corporal']).to.be.a("number")
                    chai.expect(res.body['gordura_visceral']).to.be.a("number")
                    chai.expect(res.body['agua']).to.be.a("number")
                    chai.expect(res.body['proteina']).to.be.a("number")
                    chai.expect(res.body['massa_ossea']).to.be.a("number")
                    chai.expect(res.body['metabolismo_basal']).to.be.a("number")
                    chai.expect(res.body['isDeleted']).to.be.a("boolean")  
                })
        })
    })
})