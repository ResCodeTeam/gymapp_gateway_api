import { doesNotReject } from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste editar avaliacao treinador", () => {
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
                .put('/treinador/avaliacoes')
                .send({
                    avaliacaoId: "640e1f20-938f-4ed6-8ef4-7b02ab98b486",
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
                .put('/treinador/avaliacoes')
                .set("Authorization", tokenInvalido)
                .send({
                    avaliacaoId: "640e1f20-938f-4ed6-8ef4-7b02ab98b486",
                })
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar avaliacao treinador', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .put('/treinador/avaliacoes')
                .set("Authorization", token)
                .send({
                    avaliacaoId: "640e1f20-938f-4ed6-8ef4-7b02ab98b486",
                })
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar avaliacao treinador', () => {
        it('Deve retornar editar avaliacao treinador com sucesso', () => {
            return chai
                .request(server)
                .put('/treinador/avaliacoes')
                .set("Authorization", token)
                .send({
                    avaliacaoId: "640e1f20-938f-4ed6-8ef4-7b02ab98b486",
                    peso: 55,
                    unidade_peso: "kg",
                    musculo: 80,
                    gordura_corporal: 1,
                    gordura_visceral: 1,
                    agua: 30,
                    proteina: 20,
                    massa_ossea: 10,
                    metabolismo_basal: 1600,
                    imagens: [
                      {
                        imagemUrl: "https://imagem.1"
                      }
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
                    chai.expect(res.body).to.have.property("data")
                    chai.expect(res.body).to.have.property("peso")
                    chai.expect(res.body).to.have.property("musculo")
                    chai.expect(res.body).to.have.property("gordura_corporal")
                    chai.expect(res.body).to.have.property("gordura_visceral")
                    chai.expect(res.body).to.have.property("agua")
                    chai.expect(res.body).to.have.property("massa_ossea")
                    chai.expect(res.body).to.have.property("metabolismo_basal")
                    chai.expect(res.body).to.have.property("avaliacao_imagens")
                    chai.expect(res.body).to.have.property("medidas_avaliacao")
                    chai.expect(res.body).to.have.property("users_avaliacoes_treinador_idTousers")

                    chai.expect(res.body['avaliacao_id']).to.be.a("string")
                    chai.expect(res.body['data']).to.be.a("string")
                    chai.expect(res.body['peso']).to.be.a("number")
                    chai.expect(res.body['musculo']).to.be.a("number")
                    chai.expect(res.body['gordura_corporal']).to.be.a("number")
                    chai.expect(res.body['gordura_visceral']).to.be.a("number")
                    chai.expect(res.body['agua']).to.be.a("number")
                    chai.expect(res.body['massa_ossea']).to.be.a("number")
                    chai.expect(res.body['metabolismo_basal']).to.be.a("number")
                    chai.expect(res.body['avaliacao_imagens']).to.be.a("array")
                    chai.expect(res.body['medidas_avaliacao']).to.be.a("array")
                    chai.expect(res.body['users_avaliacoes_treinador_idTousers']).to.be.a("object")


                    if (res.body['avaliacao_imagens'].length > 0) {
                        chai.expect(res.body['avaliacao_imagens'][0]).to.be.a("object")
                        chai.expect(res.body['avaliacao_imagens'][0]).to.have.property("url")
                        if (res.body['avaliacao_imagens'][0]['url'] != null) {
                            chai.expect(res.body['avaliacao_imagens'][0]['url']).to.be.a("string")
                        } 
                    }

                    if (res.body['medidas_avaliacao'].length > 0) {
                        chai.expect(res.body['medidas_avaliacao'][0]).to.be.a("object")
                        chai.expect(res.body['medidas_avaliacao'][0]).to.have.property("medida")
                        chai.expect(res.body['medidas_avaliacao'][0]).to.have.property("unidade_medida")
                        chai.expect(res.body['medidas_avaliacao'][0]).to.have.property("locais_medidas")

                        chai.expect(res.body['medidas_avaliacao'][0]['medida']).to.be.a("string")
                        chai.expect(res.body['medidas_avaliacao'][0]['unidade_medida']).to.be.a("string")
                        chai.expect(res.body['medidas_avaliacao'][0]['locais_medidas']).to.be.a("object")

                        chai.expect(res.body['medidas_avaliacao'][0]['locais_medidas']).to.have.property("descricao")
                        chai.expect(res.body['medidas_avaliacao'][0]['locais_medidas']).to.have.property("unilado")

                        chai.expect(res.body['medidas_avaliacao'][0]['locais_medidas']['descricao']).to.be.a("string")
                        chai.expect(res.body['medidas_avaliacao'][0]['locais_medidas']['unilado']).to.be.a("boolean")
                    }

                    chai.expect(res.body['users_avaliacoes_treinador_idTousers']).to.have.property("nome")
                    chai.expect(res.body['users_avaliacoes_treinador_idTousers']).to.have.property("imagem_url")

                    chai.expect(res.body['users_avaliacoes_treinador_idTousers']['nome']).to.be.a("string")
                    if (res.body['users_avaliacoes_treinador_idTousers']['imagem_url'] != null) {
                        chai.expect(res.body['users_avaliacoes_treinador_idTousers']['imagem_url']).to.be.a("string")
                    }

                })
        })
    })
})