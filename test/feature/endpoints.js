// Dependencies
const chai = require('chai');
const app = require('../../src/app.js');
const { expect } = require('chai');

// Setup
chai.use(require('chai-http'));

const defaultPayload = {
  provider: 'gas',
  callbackUrl:'https://localhost:3001/callback'
};

// Test definitions
describe("Endpoints", () => {
  describe("GET /api", () => {
    it("should return a 404 when accessed with invalid method", (done) => {
      chai.request(app)
        .get('/api')
        .end((error, response) => {
          expect(response.status).to.eq(404);
          done();
        });
    });
  });

  describe("POST /api", () => {
    it("should validate that the body contains both provider and callbackUrl properties", (done) => {
      chai.request(app)
        .post('/api')
        .send(defaultPayload)
        .end((error, response) => {
          expect(response.status).to.eq(200);
          done();
        })
    });
    
    it("should validate that the body is missing both provider and callbackUrl properties", (done) => {
      chai.request(app)
        .post('/api')
        .send({})
        .end((error, response) => {
          expect(response.status).to.eq(422);
          expect(response.body).to.have.key('errors');
          expect(response.body.errors).to.have.lengthOf(2);
          done();
        })
    });

    it("should validate that the callback provider is gas or internet", (done) => {
      chai.request(app)
        .post('/api')
        .send({...defaultPayload, provider: 'invalid'})
        .end((error, response) => {
          expect(response.status).to.eq(422);
          expect(response.body).to.have.key('errors');
          expect(response.body.errors.shift()).property('msg', 'Property must be gas or internet');
          done();
        })
    });
  });
});