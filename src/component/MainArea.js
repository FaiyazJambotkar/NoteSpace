import React, { useState, useEffect } from "react";
import classes from "./MainArea.module.css";
import { ReactComponent as Folder } from "../icons/folder-outline.svg";
import ProjectFolder from "./ProjectFolder";
import { ReactComponent as Doc } from "../icons/document-outline.svg";
import NotesBox from "./NotesBox";
import { ReactComponent as Add } from "../icons/add-circle-outline.svg";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MainArea = (props) => {
  const { currentUser } = useAuth();
  const [noteData, setNoteData] = useState(null);

  useEffect(() => {
    db.collection(currentUser.uid)
      .doc("notes")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setNoteData(doc.data());
        } else {
          console.log("document not found");
        }
      });
  }, []);

  const navigate = useNavigate();

  const onAddNoteHandler = () => {
    navigate("/new-note");
  };

  const onAddProjectHandler = () => {};

  // console.log('running in main area')
  return (
    <div className={classes["main-container"]}>
      <div className={classes.heading}>Welcome back, name!</div>
      <div className={classes.projects}>
        <p className={classes["project-heading"]}>
          <Folder className={classes.icons} /> My Projects{" "}
          <Add onClick={onAddProjectHandler} className={classes.icons} />
        </p>

        <div className={classes["folder-container"]}>
          <ProjectFolder />
          <ProjectFolder />
          <ProjectFolder />
          <ProjectFolder />
        </div>
      </div>
      <div className={classes.notes}>
        <p className={classes["notes-heading"]}>
          <Doc className={classes.icons} />
          My Notes <Add onClick={onAddNoteHandler} className={classes.icons} />
        </p>
        <div className={classes["notes-box-container"]}>
          
            {noteData &&
              Object.values(noteData).map((doc, index) => (
                <NotesBox key={index} note={doc.note} title={doc.title} date={doc.date} />
              ))}
          
          {/* <NotesBox note='testnote' title='test title' date='randomdate'/>
          <NotesBox note='testnote' title='test title' date='randomdate'/> */}
        </div>
      </div>
    </div>
  );
};

export default MainArea;
