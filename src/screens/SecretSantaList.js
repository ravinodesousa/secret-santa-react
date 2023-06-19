import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Card,
  InputGroup,
  Form,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import CommonLayout from "../layouts";
import { writeFile, utils } from "xlsx";
import { getSantaList } from "../helpers/Axios";

export default function SecretSantaList() {
  const [secretSantaList, setSecretSantaList] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getSantaList().then((res) => {
      console.log("Res", res);
      setLoader(false);
      setSecretSantaList(res.data ?? []);
    });
  }, []);

  const csvGenerator = () => {
    const worksheet = utils.json_to_sheet(secretSantaList);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Santa List");

    /* fix headers */
    utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Employee_EmailID",
          "Employee_Name",
          "Secret_Child_EmailID",
          "Secret_Child_Name",
        ],
      ],
      {
        origin: "A1",
      }
    );

    /* create an XLSX file and try to save it */
    writeFile(
      workbook,
      `Secret-Santa-Game-Result-${new Date().getFullYear()}.xlsx`
    );
  };

  return (
    <CommonLayout>
      <Container>
        {secretSantaList.length > 0 &&
          secretSantaList.map((item1, idx1) => {
            return (
              <Card className="p-5 my-5" key={idx1}>
                <Card.Title>
                  Secret Santa List (
                  {item1.length > 0
                    ? item1[0]?.date?.split("T").length > 0
                      ? item1[0]?.date?.split("T")[0]
                      : ""
                    : ""}
                  )
                </Card.Title>
                <Card.Body>
                  <Table>
                    <thead>
                      <tr>
                        <th>Employee_Name</th>
                        <th>Employee_EmailID</th>
                        <th>Secret_Child_Name</th>
                        <th>Secret_Child_EmailID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item1.map((item, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{item?.employee_data?.name}</td>
                            <td>{item?.employee_data?.email}</td>
                            <td>{item?.secret_child_data?.name}</td>
                            <td>{item?.secret_child_data?.email}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            );
          })}
      </Container>
    </CommonLayout>
  );
}
