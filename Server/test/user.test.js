let chai = require("chai");

let chaiHttp = require("chai-http");

let server = require("../server");

// assertion style

chai.should();

chai.use(chaiHttp);

describe("WebBuddy User API TEST", () => {
  // test the login route

  describe("POST /api/login", () => {
    it("It should login a user", (done) => {
      chai

        .request(server)

        .post("/signin")

        .send({
          email: "dahalvidwat403@gmail.com",

          password: "Vid12345dAhal",
        })

        .end((err, res) => {
          res.should.have.status(201);

          done();
        });
    });
  });
});

describe("WebBuddy User API TEST", () => {
  // test the logout route

  describe("GET /logout", () => {
    it("It should logout a user", (done) => {
      chai

        .request(server)

        .get("/logout")

        .end((err, res) => {
          res.should.have.status(200);

          done();
        });
    });
  });
});

describe("WebBuddy User API TEST", () => {
  // test the userdetails route

  describe("GET /userdetails", () => {
    it("It should get a user details", (done) => {
      chai

        .request(server)

        .get("/user/:id")

        .end((err, res) => {
          res.should.have.status(401);

          done();
        });
    });
  });
});


