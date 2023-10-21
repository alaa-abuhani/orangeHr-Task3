export default class employee {
  addEmloyeeViaAPI(
    firstName: string,
    middleName: string,
    lastName: string,
    empPicture: null,
    employeeId: string,
    password: string
  ) {
    cy.request({
      method: "POST",
      url: "/api/v2/pim/employees",
      body: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        empPicture: empPicture,
        employeeId: employeeId,
      },
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      console.log(response, "emp");
      const empNumber = response.body.data.empNumber;
      cy.log("empNumber", empNumber);
      cy.request({
        method: "POST",
        url: "/api/v2/admin/users",
        body: {
          username: firstName,
          password: password,
          status: true,
          userRoleId: 2,
          empNumber: empNumber,
        },
      }).then((response) => {
        console.log(response, "user");
        expect(response).property("status").to.equal(200);
        cy.logout();
        cy.wait(1000);
      });
    });
  }
}
