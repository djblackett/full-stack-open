

describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Doctor Testerman",
      username: "testU",
      password: "testP"
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });


  it("Login form is shown", function() {
    cy.contains("Log in to application");
  });

  it("login fails with wrong password", function() {
    // cy.contains("login").click();
    cy.get("#username").type("testU");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong username or password");

    cy.get("#login-error").should("have.css", "color", "rgb(255, 0, 0)");

  });


  it("login succeeds with correct credentials", function() {
    // cy.contains("login").click();
    cy.get("#username").type("testU");
    cy.get("#password").type("testP");
    cy.get("#login-button").click();

    cy.contains("blogs");
    cy.contains("Doctor Testerman logged in");
  });



  describe("When logged in", function() {
    beforeEach(function() {
      cy.get("#username").type("testU");
      cy.get("#password").type("testP");
      cy.get("#login-button").click();

      cy.get("#new-blog").click();
      cy.get("#title").type("Test Blog 1");
      cy.get("#author").type("Author 1");
      cy.get("#url").type("Test URL 1");
      cy.get("#submit-blog").click();
    });

    it("A blog can be created", function() {
      // test the form here

      cy.contains("a new blog Test Blog 1 by Author 1 added");
      cy.get("#login-success").should("have.css", "color", "rgb(0, 128, 0)");

      cy.contains("Test Blog 1 Author 1");

    });


    // does something get deleted from localStorage??


    it("A blog can be liked", function() {


      cy.get(".view-button").click();

      cy.get(".blog").should("contain", "Likes 0");
      cy.get(".like-button").click();
      cy.get(".blog").should("contain", "Likes 1");

    });

    it("User can delete their own blog", function() {
      cy.get(".view-button").click();

      cy.get(".full-view").should("contain", "remove");
      cy.get(".remove-button").click();

      cy.get("#blog-form").should("not.contain", "Test Blog 1 Author 1");



    });

    it("User cannot delete another user's blog", function() {

      const user = {
        name: "Doctor Testerman2",
        username: "testU2",
        password: "testP2"
      };

      cy.request("POST", "http://localhost:3003/api/users/", user);

      cy.get("#logout-button").click();

      cy.get("#username").type("testU2");
      cy.get("#password").type("testP2");
      cy.get("#login-button").click();

      cy.get(".view-button").click();

      cy.get(".blog").should("not.contain", "remove");
    });


    it("Blogs are sorted by likes", function() {

      cy.get(".view-button").click();

      cy.get(".blog").should("contain", "Likes 0");
      cy.get(".like-button").click();
      cy.get(".blog").should("contain", "Likes 1");

      cy.get("#new-blog").click();
      cy.get("#title").type("Test Blog 2");
      cy.get("#author").type("Author 2");
      cy.get("#url").type("Test URL 2");
      cy.get("#submit-blog").click();

      cy.get(".view-button").eq(1).click();

      cy.get(".like-button").eq(1).click();
      cy.wait(500);
      cy.get(".like-button").eq(1).click();


      cy.get(".blog").eq(0).should("contain", "Test Blog 2 Author 2");
      cy.get(".blog").eq(1).should("contain", "Test Blog 1 Author 1");
    });
  });


});
