const Item = require("../items/model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

// Parent Test block for Items
describe("Items Testing", () => {
  beforeEach((done) => {
    // Emptying the database before every test
    Item.deleteMany({}, (err) => {
      done();
    });
  });

  // Testing the GET ALL ITEMS route /items
  describe("/GET items", () => {
    it("it should GET all the items", (done) => {
      chai
        .request(server)
        .get("/items")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // Testing the POST route /items
  describe("/POST item", () => {
    it("it should POST a item ", (done) => {
      let item = {
        name: "Juice",
        isSanitized: "true",
        quantity: 20,
        unit: "bottles",
        expiryDate: "08/20/2020",
        category: "Beverages",
        location: "Kitchen",
      };
      chai
        .request(server)
        .post("/items")
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("name");
          res.body.should.have.property("quantity");
          res.body.should.have.property("category");
          res.body.should.have.property("location");
          done();
        });
    });
  });

  // Testing the GET BY ID route /item/:id
  describe("/GET/:id item", () => {
    it("it should GET an item by id", (done) => {
      let item = new Item({
        name: "Cookies",
        isSanitized: "true",
        quantity: 5,
        unit: "packet",
        expiryDate: "12/10/2020",
        category: "Grocery",
        location: "Store",
      });
      item.save((err, item) => {
        chai
          .request(server)
          .get(`/item/${item.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("_id").eql(item.id);
            res.body.should.have.property("name");
            res.body.should.have.property("name");
            res.body.should.have.property("quantity");
            res.body.should.have.property("category");
            res.body.should.have.property("location");
            done();
          });
      });
    });
  });

  // Testing the PUT route /item/:id
  describe("/PUT/:id item", () => {
    it("it should UPDATE an item by the given id", (done) => {
      let item = new Item({
        name: "Oranges",
        isSanitized: "false",
        quantity: 2,
        unit: "kg",
        expiryDate: "05/20/2020",
        category: "Fruits&Veg",
        location: "Kitchen",
      });
      item.save((err, item) => {
        chai
          .request(server)
          .put(`/item/${item.id}`)
          .send({ quantity: 5 })
          .end((err, res) => {
            // using expect instead of should
            expect(res).to.have.status("200");
            expect(item).to.be.an("object");
            expect(item).to.have.property("id").equal(item.id);
            expect(res.body).to.have.property("nModified").eql(1);
            expect(item).to.have.property("updatedDate").not.eql("createdDate");
            done();
          });
      });
    });
  });

  describe("/DELETE/:id item", () => {
    it("it should DELETE the item with given id", (done) => {
      let item = new Item({
        name: "Burger Buns",
        quantity: 3,
        unit: "packets",
        expiryDate: "05/20/2020",
        category: "Grocery",
        location: "Kitchen",
      });
      item.save((err, item) => {
        chai
          .request(server)
          .delete(`/item/${item.id}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body).to.have.property("ok").eql(1);
            expect(res.body).to.have.property("deletedCount").eql(1);
            done();
          });
      });
    });
  });
});
