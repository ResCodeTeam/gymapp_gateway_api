import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const idGinasio = '69a12d9f-654b-4496-9200-348c9bbe9db5'
const modalidadeId = '2f13010f-ab56-42d3-a43a-b369e3724b2b'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste editar ginásio modalidade", () => {
    beforeEach((done) => {
        chai
            .request(server)
            .post(baseUrl + "/auth/login")
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
                .put(baseUrl + '/admin/ginasio/' + idGinasio + '/modalidades/' + modalidadeId)
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
                .put(baseUrl + '/admin/ginasio/' + idGinasio + '/modalidades/' + modalidadeId)
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })


    describe('- Editar ginásio modalidade', () => {
        it('Deve retornar editar ginásio modalidade com sucesso', () => {
            return chai
                .request(server)
                .put(baseUrl + '/admin/ginasio/' + idGinasio + '/modalidades/' + modalidadeId)
                .set("Authorization", token)
                .send({
                    "nome": "Bicicleta",
                    "imagemUrl": "https://www.worten.pt/i/cad388e000d6ca935b2ad49b2b0e28f874b3257a",
                    "isDeleted": false
                })
                .then(res => {

                    res.should.have.status(200)
                   
                    chai.expect(res.body).to.have.property("nome")
                    chai.expect(res.body).to.have.property("imagem_url")
                    chai.expect(res.body).to.have.property("isDeleted")

                    //verificar tipos das propriedades
                    chai.expect(res.body['nome']).to.be.a("string")
                    chai.expect(res.body['imagem_url']).to.be.a("string")
                    chai.expect(res.body['isDeleted']).to.be.a("boolean")

                })
        })
    })

})
