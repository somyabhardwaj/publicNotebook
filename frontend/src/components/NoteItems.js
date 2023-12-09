import React from 'react';
import { FaRegTrashCan, FaRegPenToSquare, FaFileCirclePlus, FaCircleInfo } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setId } from '../redux/reducers/noteSlice';
import fetchNotes, { deleteNote } from '../redux/api/notesApi';
import { useRef, useState } from 'react';
import Edit from '../components/crud/Edit';
import Create from './crud/Create';
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

function NoteItems() {
  const Notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.status);
  const [noteId, setNoteId] = useState();
  const [showDescription, setshowDescription] = useState();
  const [showTitle, setshowTitle] = useState();
  const [showTag, setshowTag] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const ref = useRef(null);
  const token = useSelector((state) => state.user.authToken);
  const dispatch = useDispatch();

  const handelonclickedit = async (id) => {
    dispatch(setId(id));
  };

  const handelDeleteClick = (noteId) => {
    dispatch(deleteNote({ noteId, token })).then((response) => {
      dispatch(fetchNotes(token));
      if (response.payload !== undefined) {
        enqueueSnackbar('Note deleted successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Error: Note cannot be deleted', { variant: 'error' });
      }
    });
  };

  const showPopup = (id) => {
    setNoteId(id);
  };

  const showModel = (data) => {
    const showNote = data;

    const setData = (showNote) => {
      setshowDescription(showNote.description);
      setshowTitle(showNote.title);
      setshowTag(showNote.tag);
    };
    setData(showNote);
    ref.current.click();
  };



  return (
    <>
      <button className="d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#showModal">
        <i className="" style={{ color: 'blue' }}>
          <FaRegPenToSquare />
        </i>
      </button>

      <div className="modal fade" id="showModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">
                {showTitle}
              </h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body border" style={{ height: '45vh', maxHeight: '70vh', overflow: 'scroll' }}>
              <div>
                <h5 className="text-info">{showTag}</h5>
              </div>
              <div className="text-center">
                <p className="d-flex flex-wrap">{showDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create a new note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Create />
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit your note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Edit />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Delete Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete note ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button
                onClick={() => {
                  handelDeleteClick(noteId);
                }}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container border border-dark mt-4">
        <div className="border-bottom">
          <div className="d-flex align-items-center justify-content-around">
            <h1>Your Notes</h1>
            <Link data-bs-toggle="modal" data-bs-target="#createModal">
              <button className="btn btn-success">
                <FaFileCirclePlus className="me-2" /> Create Note
              </button>
            </Link>
          </div>
        </div>

        <table className="table table-striped table-bordered mt-3 " style={{minHeight:"50vh"}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Tag</th>
              <th className="text-center" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          {!Notes ? (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  ... Loading
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {Notes.map((note, index) => (
                <tr key={note._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{note.title}</td>
                  <td>{note.description.substring(0, 20)}..</td>
                  <td>{note.tag}</td>
                  <td>
                    <div className="d-flex justify-content-between">
                      <Link className = "border-none mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <i
                          onClick={() => showPopup(note._id)}
                          className="h4 text-danger"
                        >
                          <FaRegTrashCan />
                        </i>
                      </Link>
                      <Link data-bs-toggle="modal" data-bs-target="#editModal">
                        <i
                          onClick={() => handelonclickedit(note._id)}
                          className="h4 text-primary"
                        >
                          <FaRegPenToSquare />
                        </i>
                      </Link>
                      <Link className = "border-none mx-2" data-bs-toggle="modal" data-bs-target="#showModal">
                        <i
                          onClick={() => showModel({ title: note.title, description: note.description, tag: note.tag })}
                          className="h4 text-info"
                        >
                          <FaCircleInfo />
                        </i>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default NoteItems;
