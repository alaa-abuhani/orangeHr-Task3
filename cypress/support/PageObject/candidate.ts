export default class candidate {
  elements = {
    firstname: () => cy.get(".oxd-input").eq(1),
    middlename: () => cy.get(".oxd-input").eq(2),
    lastname: () => cy.get(".oxd-input").eq(3),
    email: () => cy.get(".oxd-input").eq(4),
  };
  addCandidate(firstName: string, middleName: string, lastName: string) {
    this.elements.firstname().type(firstName);
    this.elements.middlename().type(middleName);
    this.elements.lastname().type(lastName);
    this.elements.email().type("alaa@gmail.com");
  }
  uploadAttament(path: string, filename: string) {
    cy.get('input[type="file"]').selectFile(path, {
      force: true,
    });
    cy.get("button").contains("Save").click({ force: true });
    cy.get(".orangehrm-file-preview ").should("contain", filename);
  }
}
