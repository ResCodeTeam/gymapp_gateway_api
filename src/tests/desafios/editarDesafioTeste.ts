import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1"
const server = "localhost:8000"
const desafioId = 'fefa26e4-90ea-4a5e-8878-c051faffeb29'
const tokenInvalido = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk'

let token = ''

describe("Teste editar desafio", () => {
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
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId + '/editar')
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
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId + '/editar')
                .set("Authorization", tokenInvalido)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar desafio sem body', () => {
        it('Deve retornar erro de body incompleto', () => {
            return chai
                .request(server)
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId + '/editar')
                .set("Authorization", token)
                .then(res => {
                    res.should.have.status(500)
                    chai.expect(res.body).to.have.property("status")
                    chai.expect(res.body).to.have.property("message")
                })
        })
    })

    describe('- Editar desafio corretamente', () => {
        it('Deve retornar desafio editado com sucesso', () => {
            return chai
                .request(server)
                .put(baseUrl + '/adminTreinador/desafio/' + desafioId + '/editar')
                .set("Authorization", token)
                .send({

                    nome: "Caminhar",
                    modalidade: "4272f33a-b2c9-46bf-83ab-c8a1a85fbd52",
                    recompensa: 100,
                    descricao: "teste"

                })
                .then(res => {
                    res.should.have.status(200)
                    chai.expect(res.body).to.be.an("object")
                    // verificar se é um object
                    chai.expect(res.body).to.have.property("desafio_id")
                    chai.expect(res.body).to.have.property("nome")
                    chai.expect(res.body).to.have.property("data_inicio")
                    chai.expect(res.body).to.have.property("data_fim")
                    chai.expect(res.body).to.have.property("recompensa")
                    chai.expect(res.body).to.have.property("isEncerrado")
                    chai.expect(res.body).to.have.property("descricao")
                    chai.expect(res.body).to.have.property("users")
                    chai.expect(res.body).to.have.property("modalidades_ginasio")
                    chai.expect(res.body).to.have.property("regras_desafio")
                    chai.expect(res.body).to.have.property("exercicios_desafio")


                    //verificar tipos das propriedades
                    chai.expect(res.body['desafio_id']).to.be.a("string")
                    chai.expect(res.body['nome']).to.be.a("string")
                    chai.expect(res.body['data_inicio']).to.be.a("string")
                    chai.expect(res.body['data_fim']).to.be.a("string")
                    chai.expect(res.body['recompensa']).to.be.a("number")
                    chai.expect(res.body['isEncerrado']).to.be.a("boolean")
                    chai.expect(res.body['descricao']).to.be.a("string")
                    chai.expect(res.body['users']).to.be.an("object") //
                    chai.expect(res.body['modalidades_ginasio']).to.be.an("object")
                    chai.expect(res.body['regras_desafio']).to.be.an("array")
                    chai.expect(res.body['exercicios_desafio']).to.be.an("array")


                    //verificar se array das propriedades estão corretos
                    if (res.body['users'].length > 0) {
                        //verificar se objeto do array é um objeto
                        chai.expect(res.body['users']).to.be.an("object")

                        chai.expect(res.body['users']).to.have.property("nome")
                        chai.expect(res.body['users']).to.have.property("email")
                        chai.expect(res.body['users']).to.have.property("imagem_url")

                        chai.expect(res.body['users']['nome']).to.be.a("string")
                        chai.expect(res.body['users']['email']).to.be.a("string")
                        chai.expect(res.body['users']['imagem_url']).to.be.a("string")
                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['modalidades_ginasio'].length > 0) {

                        chai.expect(res.body['modalidades_ginasio']).to.be.an("object")

                        chai.expect(res.body['modalidades_ginasio']).to.have.property("nome")

                        chai.expect(res.body['modalidades_ginasio']['nome']).to.be.a("string")
                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['regras_desafio'].length > 0) {

                        chai.expect(res.body['regras_desafio'][0]).to.be.an("object")

                        chai.expect(res.body['regras_desafio'][0]).to.have.property("descricao")

                        chai.expect(res.body['regras_desafio'][0]['descricao']).to.be.a("string")
                    }


                    //verificar se array das propriedades estão corretos
                    if (res.body['exercicios_desafio'].length > 0) {

                        chai.expect(res.body['exercicios_desafio'][0]).to.be.an("object")

                        chai.expect(res.body['exercicios_desafio'][0]).to.have.property("n_ordem_exercicio")
                        chai.expect(res.body['exercicios_desafio'][0]).to.have.property("genero")
                        chai.expect(res.body['exercicios_desafio'][0]).to.have.property("exercicios")
                        chai.expect(res.body['exercicios_desafio'][0]).to.have.property("series_desafio")


                        chai.expect(res.body['exercicios_desafio'][0]['n_ordem_exercicio']).to.be.an("number")
                        chai.expect(res.body['exercicios_desafio'][0]['genero']).to.be.an("number")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.be.an("object")
                        chai.expect(res.body['exercicios_desafio'][0]['series_desafio']).to.be.an("array")
                    }


                    //verificar se array das propriedades estão corretos
                    if (res.body['exercicios_desafio'][0]['exercicios'].length > 0) {


                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.be.an("object")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.have.property("nome")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.have.property("descricao")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.have.property("is_tempo")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.have.property("imagens")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']).to.have.property("musculos")


                        chai.expect(res.body['exercicios_desafio']['exercicios']['nome']).to.be.a("string")
                        chai.expect(res.body['exercicios_desafio']['exercicios']['descricao']).to.be.a("string")
                        chai.expect(res.body['exercicios_desafio']['exercicios']['is_tempo']).to.be.a("boolean")
                        chai.expect(res.body['exercicios_desafio']['exercicios']['imagens']).to.be.an("array")
                        chai.expect(res.body['exercicios_desafio']['exercicios']['musculos']).to.be.an("array")
                    }


                    //verificar se array das propriedades estão corretos
                    if (res.body['exercicios_desafio'][0]['exercicios']['imagens'].length > 0) {

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['imagens']).to.be.an("array")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['imagens'][0]).to.have.property("url")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['imagens'][0]['url']).to.be.a("string")
                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['exercicios_desafio'][0]['exercicios']['musculos'].length > 0) {

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]).to.be.an("object")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]).to.have.property("musculos")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos']).to.be.an("object")
                    }

                    //verificar se array das propriedades estão corretos
                    if (res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos'].length > 0) {

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos']).to.be.an("object")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos']).to.have.property("nome")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos']).to.have.property("imagem_url")

                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos']['nome']).to.be.a("string")
                        chai.expect(res.body['exercicios_desafio'][0]['exercicios']['musculos'][0]['musculos']['imagem_url']).to.be.a("string")
                    }

                })
        })
    })
})
