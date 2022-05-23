import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:2900"
const idGinasio = '69a12d9f-654b-4496-9200-348c9bbe9db5'
const modalidadeId = 'bb317ebd-d559-42ff-a0c3-1e00528f3793'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste remover ginásio modalidade", () => {
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
                .delete('/admin/ginasio/' + idGinasio + '/modalidades/' + modalidadeId)
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
                .delete('/admin/ginasio/' + idGinasio + '/modalidades/' + modalidadeId)
                    .set("Authorization", tokenInvalido)
                    .then(res => {
                        res.should.have.status(500)
                        chai.expect(res.body).to.have.property("status")
                        chai.expect(res.body).to.have.property("message")
                    })
        })
    })


    describe('- Remover ginásio modalidade', () => {
        it('Deve retornar remover ginásio modalidade com sucesso', () => {
            return chai
                .request(server)
                .delete('/admin/ginasio/' + idGinasio + '/modalidades/' + modalidadeId)
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.have.property("msg")
                 
                })
        })
    })

})
