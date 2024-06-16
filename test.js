const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./code');
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /level-2', () => {
    function testFailed(number, done) {
        chai.request(server)
            .get('/level-2')
            .query({ number: number })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Failed!!');
                done();
            });
    }

    function testSuccess(number, done) {
        chai.request(server)
            .get('/level-2')
            .query({ number: number })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('Success!!');
                done();
            });
    }

    
    it('should return "Success!!" when number length is less than 4 and number is greater than 10000 (string comparison)', (done) => {
        testSuccess('200', done);  
    });

    it('should return "Failed!!" when number length is 4 or greater', (done) => {
        testFailed('1000', done); 
    });

    it('should return "Failed!!" when number is not a valid number', (done) => {
        testFailed('abcd', done);
    });
});
