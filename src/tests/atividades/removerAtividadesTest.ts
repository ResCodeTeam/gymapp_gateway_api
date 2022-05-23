import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const server = "localhost:2900"
const idAtividade = '1b10c8a5-73e3-48dc-a989-fde02fd9ceee'

describe("Teste Remover Atividade:", () => {
  describe('- Remover atividade corretamente', () => {
    it('Deve retornar mensagem de remoção', () => {
      return chai
        .request(server)
        .delete('/backend/atividades/' + idAtividade)
        .then(res => {
          res.should.have.status(200);
          chai.expect(res.body).to.be.an("object");
        })
    })
  })
})