import React, { useState, useRef, useContext } from "react";
import classes from "./AssignmentInformation.module.css";
import axios from "axios";
import AuthContext from "../../store/auth-context";

const AssignmentInformation = (props) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authContext = useContext(AuthContext);
  const inputFileRef = useRef();

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      if (!file) {
        throw new Error("Something went wrong!");
      }

      const formData = new FormData();

      formData.append("file", file);

      const res = await axios({
        url: "/single",
        method: "POST",
        headers: {
          Authorization: "Bearer " + authContext.token,
        },
        data: formData,
      });
      console.log(res);

      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }

      console.log("Work uploaded Successfully!");
      setSuccess(true);
    } catch (error) {
      setError("Something went wrong!");
    }

    setIsSubmitting(false);
    setFile(null);
    inputFileRef.current.value = null;
  };

  return (
    <div className={classes["main"]}>
      <div className={classes["assignment_information-heading"]}>
        <h2>{props.title}</h2>
        <button
          className={classes["back-btn"]}
          onClick={() => props.assignmentInformToggle(false)}
        >
          Back
        </button>
      </div>
      <hr style={{ marginTop: "0.5rem" }} />
      <div className={classes["assignment_information-description"]}>
        <div style={{ margin: "1rem 0", fontWeight: "bold" }}>Description</div>
        {props.description}
      </div>

      <form className={classes.actions} onSubmit={fileUploadHandler}>
        {success ? (
          <span
            style={{ color: "darkgreen", margin: "0 1rem", fontSize: "0.9rem" }}
          >
            Work submitted Successfully!
          </span>
        ) : (
          <span style={{ color: "blue", margin: "0 1rem", fontSize: "0.9rem" }}>
            Submit your work here (pdf file) :
          </span>
        )}

        <input
          type="file"
          name="file"
          id="file"
          onChange={handleFile}
          ref={inputFileRef}
        />
        <button type="submit" className={classes.btn}>
          {isSubmitting ? "Uploading File..." : "Upload File"}
        </button>
      </form>

      {error && <span style={{ color: "red" }}>{error}</span>}

      <div style={{ marginTop: "4rem", textAlign: "left" }}>
        <span style={{ marginRight: "auto" }}>
          Marks Obtained :{props.marks}
        </span>
      </div>
    </div>
  );
};

export default AssignmentInformation;
