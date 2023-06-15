import React, { useState } from "react";
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
import { generateSantaList, saveGeneratedList } from "../helpers/Axios";
import { writeFile, utils } from "xlsx";

export default function Home() {
  const [secretSantaList, setSecretSantaList] = useState([]);
  const [file, setFile] = useState();
  const [errors, setErrors] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const submitFormHandler = (e) => {
    console.log("file", file);
    if (!file) {
      alert("Select file to upload");
      return;
    }

    let formData = new FormData();
    formData.append("file", file);

    generateSantaList(formData)
      .then((response) => {
        console.log("response", response);
        setSecretSantaList(response.data ?? []);
        setErrors(null);
      })
      .catch((err) => {
        console.log("error", err);
        setErrors(err?.response?.data?.message);
      });
  };

  const saveDataHandler = (e) => {
    saveGeneratedList({ secretSantaList })
      .then((response) => {
        console.log("response", response);
        alert("Successfully saved Data. Close this alert to download csv file");
        csvGenerator();
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

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
        <Card className="p-5">
          <Card.Title>Upload Employee List</Card.Title>
          <Card.Body>
            <InputGroup className="mb-3">
              <Form.Control type="file" onChange={handleFileChange} />
              <Button onClick={submitFormHandler} variant="primary">
                Upload
              </Button>
            </InputGroup>
            {errors != null && <span className="text-danger">{errors}</span>}
          </Card.Body>
        </Card>

        {secretSantaList.length > 0 && (
          <Card className="p-5 mt-5">
            <Card.Title>Secret Santa List</Card.Title>
            <Card.Body>
              <Button onClick={saveDataHandler} variant="primary">
                Save and Generate CSV
              </Button>
              <Button
                className="ms-2"
                onClick={submitFormHandler}
                variant="primary"
              >
                Refresh
              </Button>

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
                  {secretSantaList.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item["Employee_Name"]}</td>
                        <td>{item["Employee_EmailID"]}</td>
                        <td>{item["Secret_Child_Name"]}</td>
                        <td>{item["Secret_Child_EmailID"]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </CommonLayout>
  );
}
