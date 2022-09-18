import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("matchRecords", () => {
  describe("POST /", () => {
    // Test to get all students record
    it("should insert 1 match record", function (done) {
      this.timeout(10000);
      chai
        .request(app)
        .post("/taskB/findMatch")
        .send({ email: "Test", difficulty: "high" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("GET /", () => {
    // Test to get all students record
    it("should retrieve 1 match record", function (done) {
      this.timeout(10000);
      chai
        .request(app)
        .get("/taskB/retrieveMatch")
        .send({ email: "Test", difficulty: "high" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("PUT /", () => {
    // Test to get all students record
    it("should retrieve 1 match record", function (done) {
      this.timeout(10000);
      chai
        .request(app)
        .put("/taskB/updateMatch")
        .send({ email: "Test", difficulty: "high", newDifficutly: "low" })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("DELETE /", () => {
    // Test to get all students record
    it("should delete 1 match record", function (done) {
      this.timeout(10000);
      chai
        .request(app)
        .delete("/taskB/deleteMatch")
        .send({ email: "Test", difficulty: "low" })
        .end((err, res) => {
          this.timeout(10000);
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
