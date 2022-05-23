import { doesNotReject } from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''
describe("Teste criar exercicio", () => {
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
                .post('/treinador/exercicios/')
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
                .post('/treinador/exercicios/')
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar exercicio', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .post('/treinador/exercicios/')
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar exercicio', () => {
        it('Deve retornar criar exercicio com sucesso', () => {
            return chai
                .request(server)
                .post('/treinador/exercicios/')
                .set("Authorization", token)
                .send({
                    nome: "Bicicleta",
                    descricao: "Andar de bicicleta",
                    isTempo: true,
                    imagens: [
                        "url1",
                        "url2",
                        "url3",
                        "url4"
                    ],
                    musculos: [
                        "13d6659f-b559-4545-b74d-8a7ba4896a3e",
                        "2a7fe3e5-368e-4e0c-88b5-b84270e93af2",
                        "7c21ea99-d663-408a-bb5e-7e7e9d4c2a9e"
                    ]
                })
                .then(res => {
                    res.should.have.status(200)

                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("nome")
                    chai.expect(res.body).to.have.property("descricao")
                    chai.expect(res.body).to.have.property("is_tempo")
                    chai.expect(res.body).to.have.property("imagens")
                    chai.expect(res.body).to.have.property("users")

                    chai.expect(res.body['nome']).to.be.a("string")
                    chai.expect(res.body['descricao']).to.be.a("string")
                    chai.expect(res.body['is_tempo']).to.be.a("boolean")
                    chai.expect(res.body['imagens']).to.be.a("array")
                    chai.expect(res.body['users']).to.be.a("object")

                    if (res.body['imagens'].length > 0) {
                        chai.expect(res.body['imagens'][0]).to.be.an("object")

                        chai.expect(res.body['imagens'][0]).to.have.property("imagem_id")
                        chai.expect(res.body['imagens'][0]).to.have.property("url")

                        chai.expect(res.body['imagens'][0]['imagem_id']).to.be.a("string")
                        chai.expect(res.body['imagens'][0]['url']).to.be.a("string")
                    }

                    chai.expect(res.body['users']).to.have.property("uid")
                    chai.expect(res.body['users']).to.have.property("nome")
                    chai.expect(res.body['users']).to.have.property("email")
                    chai.expect(res.body['users']).to.have.property("imagem_url")

                    chai.expect(res.body['users']['uid']).to.be.a("string")
                    chai.expect(res.body['users']['nome']).to.be.a("string")
                    chai.expect(res.body['users']['email']).to.be.a("string")
                    if (res.body['users']['imagem_url'] != null) {
                        chai.expect(res.body['users']['imagem_url']).to.be.a("string")
                    }

                })
        })
    })
})