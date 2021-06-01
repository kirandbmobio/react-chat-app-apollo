const expect = require("chai").expect;
const resolver = require("../graphql/resolver");

const url = `http://localhost:4000/`;
const request = require("supertest")(url);
let token = "";
let authHeaders = {};

describe("Simple Math Test", () => {
  beforeEach((done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{login(email: "kd@gmail.com", password: "1234") {id username token}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        token = res.body.data.login.token;
        authHeaders = {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        };
        done();
      });
  });
  it("should check truthy getMessages", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{getMessages(from: "kiran4"){id content}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getMessages[1].content).equal("how are you?");
        done();
      });
  });
  it("should check falsy getMessages", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{getMessages(from: "kiran4"){id content}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getMessages[1].content).not.equal("how are you1?");
        done();
      });
  });
  it("should check truthy getUsers", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{getUsers{id username}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getUsers[1].username).equal("kdb1");
        done();
      });
  });

  it("should check falsy getUsers", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{getUsers{id username}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.getUsers[1].username).not.equal("kdb11");
        done();
      });
  });

  it("should check truthy messages", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{messages {id content from}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.messages[1].content).equal("how are you?");
        done();
      });
  });

  it("should check falsy messages", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query: `{messages {id content from}}`,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.messages[1].content).not.equal("how are ?");
        done();
      });
  });

  it("should check truthy postMessage", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query:
          'mutation {postMessage(to:"kiran4", content:"this is it.") {id content from}}',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.postMessage.content).equal("this is it.");
        done();
      });
  });

  it("should check falsy postMessage", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query:
          'mutation {postMessage(to:"kiran4", content:"this is it.") {id content from}}',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.data.postMessage.content).not.equal("this is t.");
        done();
      });
  });

  it("should check already exist user if not then create one", (done) => {
    request
      .post("")
      .set(authHeaders)
      .expect(200)
      .send({
        query:
          'mutation {register(userInput:{username:"hey there", email:"hey@gmail.com", password:"1234"}){id username token}}',
      })
      .end((err, res) => {
        if (err) return done(err);
        if (res.body.errors.length > 0) {
          expect(res.body.errors[0].message).equal("Already Exist");
        }
        if (res.body.data) {
          expect(res.body.data.register.username).equal("hey there");
        }
        done();
      });
  });
});
