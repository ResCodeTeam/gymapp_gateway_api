import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const marcaId = 'd9017634-c824-423d-96a3-6da7f162917a'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''
describe("Teste criar notificação marca", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
            .send({
                email: "admin@admin.com",
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
                .post(baseUrl + '/admin/notificacao/marca/' + marcaId)
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
                .post(baseUrl + '/admin/notificacao/marca/' + marcaId)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar notificação marca', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .post(baseUrl + '/admin/notificacao/marca/' + marcaId)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Criar notificação marca', () => {
        it('Deve retornar criar notificação marca com sucesso', () => {
            return chai
                .request(server)
                .post(baseUrl + '/admin/notificacao/marca/' + marcaId)
                .set("Authorization", token)
                .send({
                    conteudo: "Teste de notificação",
                    tipo: 0
                })
                .then(res => {
                    res.should.have.status(200)

                    // verificar se é um object
                    chai.expect(res.body).to.be.an("object")

                    //verificar se as propriedades todas existem
                    chai.expect(res.body).to.have.property("message")
                    chai.expect(res.body).to.have.property("ginasios")

                    chai.expect(res.body['message']).to.be.a("string")
                    chai.expect(res.body['ginasios']).to.be.a("array")

                    if (res.body['ginasios'].length > 0) {

                        chai.expect(res.body['ginasios'][0]).to.be.an("object")

                        chai.expect(res.body['ginasios'][0]).to.have.property("marca_id")
                        chai.expect(res.body['ginasios'][0]).to.have.property("ginasio_id")
                        chai.expect(res.body['ginasios'][0]).to.have.property("aluno_ginasio")

                        chai.expect(res.body['ginasios'][0]['marca_id']).to.be.a("string")
                        chai.expect(res.body['ginasios'][0]['ginasio_id']).to.be.a("string")
                        chai.expect(res.body['ginasios'][0]['aluno_ginasio']).to.be.a("array")
                    }

                   /*  if (res.body['ginasios']['aluno_ginasio'].length > 0) {
                        chai.expect(res.body['ginasios']['aluno_ginasio']).to.have.property("user_id")
                        chai.expect(res.body['ginasios']['aluno_ginasio']).to.have.property("users")
                        chai.expect(res.body['ginasios']['aluno_ginasio']['user_id']).to.be.a("string")
                        chai.expect(res.body['ginasios']['aluno_ginasio']['users']).to.be.a("object")

                        chai.expect(res.body['ginasios']['aluno_ginasio']['users']).to.have.property("nome")
                        chai.expect(res.body['ginasios']['aluno_ginasio']['users']['nome']).to.be.a("string")
                    } */
                })
        })
    })
})