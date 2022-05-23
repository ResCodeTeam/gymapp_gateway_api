import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const idPost = '60b07b4b-bc6b-4b6d-9e12-9170f1419818'
const idComentario = '5b1cd87a-dcec-49e8-a283-51cb4e5d86b2'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste remover comentario post", () => {
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
                .delete('/posts/' + idPost + '/comentario/' + idComentario)
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
                .delete('/posts/' + idPost + '/comentario/' + idComentario)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })


    describe('- Remover comentario post', () => {
        it('Deve retornar remover comentario post com sucesso', () => {
            return chai
                .request(server)
                .delete('/posts/' + idPost + '/comentario/' + idComentario)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(200)

                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("msg")
                    
                    chai.expect(res.body['msg']).to.be.a("string")

                })
        })
    })

})
