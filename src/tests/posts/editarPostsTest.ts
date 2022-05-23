import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const idPost = '60b07b4b-bc6b-4b6d-9e12-9170f1419818'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste editar posts", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post("/auth/login")
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
                .put('/posts/' + idPost)
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
                .put('/posts/' + idPost)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar posts sem body', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .put('/posts/' + idPost)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar post corretamente', () => {
        it('Deve retornar post editado com sucesso', () => {
            return chai
                .request(server)
                .put('/posts/' + idPost)
                .set("Authorization", token)
                .send({
                    "descricao": "Proteína da PROZIS #FATImaaa"
                })
                .then(res => {
                    res.should.have.status(200)
                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("publicacao_id")
                    chai.expect(res.body).to.have.property("criador_id")
                    chai.expect(res.body).to.have.property("data")
                    chai.expect(res.body).to.have.property("descricao")
                    chai.expect(res.body).to.have.property("tipo")
                    chai.expect(res.body).to.have.property("imagens_publicacao")
                    chai.expect(res.body).to.have.property("gostos_publicacao")
                    chai.expect(res.body).to.have.property("identificacoes_publicacoes")
                    chai.expect(res.body).to.have.property("comentarios_publicacao")
                    chai.expect(res.body).to.have.property("_count")

                    //verificar tipos das propriedades
                    chai.expect(res.body['publicacao_id']).to.be.a("string")
                    chai.expect(res.body['criador_id']).to.be.a("string")
                    chai.expect(res.body['data']).to.be.a("string")
                    chai.expect(res.body['descricao']).to.be.a("string")
                    chai.expect(res.body['tipo']).to.be.a("number")
                    chai.expect(res.body['imagens_publicacao']).to.be.a("array")
                    chai.expect(res.body['gostos_publicacao']).to.be.a("array")
                    chai.expect(res.body['identificacoes_publicacoes']).to.be.a("array")
                    chai.expect(res.body['comentarios_publicacao']).to.be.a("array")
                    chai.expect(res.body['_count']).to.be.a("object")
                    chai.expect(res.body['_count']).to.have.property("gostos_publicacao")
                    chai.expect(res.body['_count']["gostos_publicacao"]).to.be.a("number")

                    //verificar se array das propriedades estão corretos
                    if (res.body['imagens_publicacao'].length > 0) {
                        //verificar se objeto do array é um objeto
                        chai.expect(res.body['imagens_publicacao']).to.be.a("object")

                        // verificar se existe url da imagem
                        chai.expect(res.body['imagens_publicacao']).to.have.property("url")

                        // verificar se url da imagem é uma string
                        chai.expect(res.body['imagens_publicacao']['url']).to.be.a("string")

                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['gostos_publicacao'].length > 0) {
                        //verificar se objeto do array é um objeto
                        chai.expect(res.body['gostos_publicacao']).to.be.a("array")

                        // verificar se existe users do gosto
                        chai.expect(res.body['gostos_publicacao'][0]).to.have.property("users")

                        // verificar se user é um objeto
                        chai.expect(res.body['gostos_publicacao'][0]['users']).to.be.a("object")

                        //verificar se existe propriedade nome em users
                        chai.expect(res.body['gostos_publicacao'][0]['users']).to.have.property("nome")
                        chai.expect(res.body['gostos_publicacao'][0]['users']).to.have.property("uid")
                        chai.expect(res.body['gostos_publicacao'][0]['users']).to.have.property("imagem_url")

                        //verificar se a propriedade nome é uma string
                        chai.expect(res.body['gostos_publicacao'][0]['users']['nome']).to.be.a("string")
                        chai.expect(res.body['gostos_publicacao'][0]['users']['uid']).to.be.a("string")
                        if (res.body['gostos_publicacao'][0]['users']['imagem_url'] != null) {
                            chai.expect(res.body['gostos_publicacao'][0]['users']['imagem_url']).to.be.a("string")
                        }
                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['identificacoes_publicacoes'].length > 0) {
                        //verificar se objeto do array é um objeto
                        chai.expect(res.body['identificacoes_publicacoes']).to.be.a("array")

                        // verificar se existe users do gosto
                        chai.expect(res.body['identificacoes_publicacoes'][0]).to.have.property("users")

                        // verificar se user é um objeto
                        chai.expect(res.body['identificacoes_publicacoes'][0]['users']).to.be.a("object")

                        //verificar se existe propriedade nome em users
                        chai.expect(res.body['identificacoes_publicacoes'][0]['users']).to.have.property("nome")
                        chai.expect(res.body['identificacoes_publicacoes'][0]['users']).to.have.property("uid")
                        chai.expect(res.body['identificacoes_publicacoes'][0]['users']).to.have.property("imagem_url")

                        //verificar se a propriedade nome é uma string
                        chai.expect(res.body['identificacoes_publicacoes'][0]['users']['nome']).to.be.a("string")
                        chai.expect(res.body['identificacoes_publicacoes'][0]['users']['uid']).to.be.a("string")
                        if (res.body['gostos_publicacao'][0]['users']['imagem_url'] != null) {
                            chai.expect(res.body['identificacoes_publicacoes'][0]['users']['imagem_url']).to.be.a("string")
                        }
                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['comentarios_publicacao'].length > 0) {
                        //verificar se objeto do array é um objeto
                        chai.expect(res.body['comentarios_publicacao']).to.be.a("array")

                        // verificar se existe users do gosto
                        chai.expect(res.body['comentarios_publicacao'][0]).to.have.property("users")
                        chai.expect(res.body['comentarios_publicacao'][0]).to.have.property("comentario")

                        // verificar se user é um objeto
                        chai.expect(res.body['comentarios_publicacao'][0]['users']).to.be.a("object")
                        chai.expect(res.body['comentarios_publicacao'][0]['comentario']).to.be.a("string")

                        //verificar se existe propriedade nome em users
                        chai.expect(res.body['comentarios_publicacao'][0]['users']).to.have.property("nome")
                        chai.expect(res.body['comentarios_publicacao'][0]['users']).to.have.property("uid")
                        chai.expect(res.body['comentarios_publicacao'][0]['users']).to.have.property("imagem_url")

                        //verificar se a propriedade nome é uma string
                        chai.expect(res.body['comentarios_publicacao'][0]['users']['nome']).to.be.a("string")
                        chai.expect(res.body['comentarios_publicacao'][0]['users']['uid']).to.be.a("string")
                        if (res.body['gostos_publicacao'][0]['users']['imagem_url'] != null) {
                            chai.expect(res.body['comentarios_publicacao'][0]['users']['imagem_url']).to.be.a("string")
                        }
                    }
                })
        })
    })

})
