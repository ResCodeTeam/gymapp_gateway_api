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

describe("Teste criar comentario post", () => {
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
                .post('/posts/' + idPost + '/comentarios')
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
                .post('/posts/' + idPost + '/comentarios')
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar comentario post', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .post('/posts/' + idPost + '/comentarios')
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar comentario post', () => {
        it('Deve retornar criar comentario post com sucesso', () => {
            return chai
                .request(server)
                .post('/posts/' + idPost + '/comentarios')
                .set("Authorization", token)
                .send({
                    comentario: "Estou a comentar uma publicação",
                    identificacao: [
                        "000d1e14-617e-423e-8a1a-f63d4fa5af6a",
                        "00b27390-ad57-47de-ac18-4c2a490caa97"
                      ]
                  })
                .then(res => {
                    res.should.have.status(200)

                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("comentario_id")
                    chai.expect(res.body).to.have.property("publicacao_id")
                    chai.expect(res.body).to.have.property("comentario")
                    chai.expect(res.body).to.have.property("criador_id") 
                    chai.expect(res.body).to.have.property("data") 

                    //verificar tipos das propriedades
                    chai.expect(res.body['comentario_id']).to.be.a("string")
                    chai.expect(res.body['publicacao_id']).to.be.a("string")
                    chai.expect(res.body['comentario']).to.be.a("string")
                    chai.expect(res.body['criador_id']).to.be.a("string")
                    chai.expect(res.body['data']).to.be.a("string")

                })
        })
    })

})
