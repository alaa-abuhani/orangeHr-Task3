import login from "../../support/PageObject/login";
import recruitment from "../../support/PageObject/recruitment";

const loginObj: login = new login();
// const reruitmentObj = new recruitment();

describe("recruitment functionality", () => {
  beforeEach(() => {
    cy.intercept("/web/index.php/dashboard/index").as("loginpage");
    cy.visit("https://opensource-demo.orangehrmlive.com");
    cy.fixture("login.json").as("logininfo");
    cy.fixture("employeeInfo").as("EmpInfo");
    cy.get("@logininfo").then((logininfo: any) => {
      loginObj.loginValid(logininfo[0].Username, logininfo[0].Password);
    });
  });
  it(" add emplpyeaa via API", () => {
    cy.get("@EmpInfo").then((EmpInfo: any) => {
      cy.request({
        method: "POST",
        url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees",
        body: {
          firstName: "alaa",
          // firstName: EmpInfo.user.firstName,
          middleName: "gha",

          // middleName: EmpInfo.user.middleName,
          lastName: "hani",
          // lastName: EmpInfo.user.lastName,
          // empPicture: EmpInfo.user.empPicture,
          empPicture: null,
          // employeeId: EmpInfo.user.id,
          employeeId: "0349",
        },
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        console.log(response);
        const empNumber = response.body.data.empNumber;
        cy.log("empNumber", empNumber);
        cy.request({
          method: "POST",
          url: "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/users",
          body: {
            username: "alaaa",
            password: "123456a",
            status: true,
            userRoleId: 2,
            empNumber: empNumber,
          },
        });

        // pimObj.successAddEmployee(
        //   empNumber,
        //   EmpInfo.user.firstName,

        // );
      });
    });
  });
});
