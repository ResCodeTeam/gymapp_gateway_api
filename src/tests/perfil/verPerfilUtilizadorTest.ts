import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'
const userId = "000d1e14-617e-423e-8a1a-f63d4fa5af6a"

let token = ''

describe("Teste ver perfil de utilizador", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post("/auth/login")
            .send({
                email: "admin@admin.com",
                password: "admin",
            })
            .end((err, res) => {
                token = `Bearer ${res.body.token}`;
                res.should.have.status(200);
                done();
            });
    });
    describe('- Sem token', () => {
        it('Deve retornar erro de authToken invalido', () => {
            return chai.request(server).get('/user/' + userId)
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
                .get('/user/' + userId)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Obter ver perfil de utilizador corretamente', () => {
        it('Deve perfil de utilizador', () => {
            return chai
                .request(server)
                .get('/user/' + userId)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.be.an("object")

                    chai.expect(res.body).to.have.property("perfil")
                    chai.expect(res.body).to.have.property("posts")
                    chai.expect(res.body).to.have.property("treinos")


                    chai.expect(res.body['perfil']).to.be.a("array")
                    chai.expect(res.body['posts']).to.be.a("array")
                    chai.expect(res.body['treinos']).to.be.a("array")



                    if (res.body['perfil'].length > 0) {
                        //verificar se é um objeto
                        chai.expect(res.body['perfil'][0]).to.be.an("object")

                        chai.expect(res.body['perfil'][0]).to.have.property("nome")
                        chai.expect(res.body['perfil'][0]).to.have.property("hashtag")
                        chai.expect(res.body['perfil'][0]).to.have.property("descricao")
                        chai.expect(res.body['perfil'][0]).to.have.property("imagem_url")
                        chai.expect(res.body['perfil'][0]).to.have.property("definicoes_user")

                        chai.expect(res.body['perfil'][0]['nome']).to.be.a("string")
                        chai.expect(res.body['perfil'][0]['hashtag']).to.be.a("string")

                        if (res.body['perfil'][0]['descricao'] != null) {
                            chai.expect(res.body['perfil'][0]['descricao']).to.be.a("string")
                        }
                        if (res.body['perfil'][0]['imagem_url'] != null) {
                            chai.expect(res.body['perfil'][0]['imagem_url']).to.be.a("string")
                        }
                        chai.expect(res.body['perfil'][0]['definicoes_user']).to.be.a("object")
                        chai.expect(res.body['perfil'][0]['definicoes_user']).to.have.property("is_privado")
                        chai.expect(res.body['perfil'][0]['definicoes_user']['is_privado']).to.be.a("boolean")

                    }

                    if (res.body['posts'].length > 0) {
                        chai.expect(res.body['posts'][0]).to.be.an("object")

                        chai.expect(res.body['posts'][0]).to.have.property("publicacao_id")
                        chai.expect(res.body['posts'][0]).to.have.property("criador_id")
                        chai.expect(res.body['posts'][0]).to.have.property("ginasio_id")
                        chai.expect(res.body['posts'][0]).to.have.property("data")
                        chai.expect(res.body['posts'][0]).to.have.property("descricao")
                        chai.expect(res.body['posts'][0]).to.have.property("tipo")
                        chai.expect(res.body['posts'][0]).to.have.property("imagens_publicacao")
                        chai.expect(res.body['posts'][0]).to.have.property("gostos_publicacao")
                        chai.expect(res.body['posts'][0]).to.have.property("_count")

                        chai.expect(res.body['posts'][0]['publicacao_id']).to.be.a("string")
                        chai.expect(res.body['posts'][0]['criador_id']).to.be.a("string")
                        if (res.body['posts'][0]['ginasio_id'] != null) {
                            chai.expect(res.body['posts'][0]['ginasio_id']).to.be.a("string")
                        }
                        chai.expect(res.body['posts'][0]['data']).to.be.a("string")
                        chai.expect(res.body['posts'][0]['descricao']).to.be.a("string")
                        chai.expect(res.body['posts'][0]['tipo']).to.be.a("number")
                        chai.expect(res.body['posts'][0]['imagens_publicacao']).to.be.a("array")
                        chai.expect(res.body['posts'][0]['gostos_publicacao']).to.be.a("array")


                        chai.expect(res.body['posts'][0]['_count']).to.be.a("object")
                        chai.expect(res.body['posts'][0]['_count']).to.have.property("gostos_publicacao")
                        chai.expect(res.body['posts'][0]['_count']['gostos_publicacao']).to.be.a("number")

                    }

                    if (res.body['treinos'].length > 0) {
                        chai.expect(res.body['treinos'][0]).to.be.an("object")

                        chai.expect(res.body['treinos'][0]).to.have.property("treino_id")
                        chai.expect(res.body['treinos'][0]).to.have.property("uid")
                        chai.expect(res.body['treinos'][0]).to.have.property("atividade_id")
                        chai.expect(res.body['treinos'][0]).to.have.property("modalidade_id")
                        chai.expect(res.body['treinos'][0]).to.have.property("duracao")
                        chai.expect(res.body['treinos'][0]).to.have.property("calorias")
                        chai.expect(res.body['treinos'][0]).to.have.property("distancia")
                        chai.expect(res.body['treinos'][0]).to.have.property("data")
                        chai.expect(res.body['treinos'][0]).to.have.property("isDeleted")


                        chai.expect(res.body['treinos'][0]['treino_id']).to.be.a("string")
                        chai.expect(res.body['treinos'][0]['uid']).to.be.a("string")
                        if (res.body['treinos'][0]['ginasio_id'] != null) {
                            chai.expect(res.body['treinos'][0]['atividade_id']).to.be.a("string")
                        }
                        chai.expect(res.body['treinos'][0]['modalidade_id']).to.be.a("string")
                        chai.expect(res.body['treinos'][0]['duracao']).to.be.a("string")
                        chai.expect(res.body['treinos'][0]['calorias']).to.be.a("number")
                        chai.expect(res.body['treinos'][0]['distancia']).to.be.a("number")
                        chai.expect(res.body['treinos'][0]['data']).to.be.a("string")
                        chai.expect(res.body['treinos'][0]['isDeleted']).to.be.a("boolean")

                    }

                })
        })
    })
})
