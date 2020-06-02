// Test library
const chai = require('chai');
chai.use(require('chai-http')).should();

// Setup
const app = require('../../src/app.js');

// Test definitions
describe("Endpoints", () => {
  describe("GET /api", () => {
    it("should return a 404 when accessed with invalid method", (done) => {
      chai.request(app)
        .get('/api')
        .end((error, response) => {
          response.status.should.equal(404);
          done();
        });
    });
  });
});