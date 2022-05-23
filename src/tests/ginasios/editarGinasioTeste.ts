import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const idGinasio = '69a12d9f-654b-4496-9200-348c9bbe9db5'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste editar ginasio", () => {
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
                .put('/admin/ginasio/editar/' + idGinasio)
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
                .put('/admin/ginasio/editar/' + idGinasio)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar ginasio sem body', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .put('/admin/ginasio/editar/' + idGinasio)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar ginasio corretamente', () => {
        it('Deve retornar ginasio editada com sucesso', () => {
            return chai
                .request(server)
                .put('/admin/ginasio/editar/' + idGinasio)
                .set("Authorization", token)
                .send({
                    nome: "Ginásio da Prozis #VSKI",
                    rua: "Rua das Castanhas",
                    descricao: "null",
                    imagemUrl: "teste",
                    lat: "0",
                    long: "0"
                })
                .then(res => {

                    res.should.have.status(200)

                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("nome")
                    chai.expect(res.body).to.have.property("rua")
                    chai.expect(res.body).to.have.property("descricao")
                    chai.expect(res.body).to.have.property("imagem_url")
                    chai.expect(res.body).to.have.property("lat")
                    chai.expect(res.body).to.have.property("long")

                    //verificar tipos das propriedades
                    chai.expect(res.body['nome']).to.be.a("string")
                    chai.expect(res.body['rua']).to.be.a("string")
                    chai.expect(res.body['descricao']).to.be.a("string")
                    chai.expect(res.body['imagem_url']).to.be.a("string")
                    chai.expect(res.body['lat']).to.be.a("string")
                    chai.expect(res.body['long']).to.be.a("string")
                })
        })
    })

})
