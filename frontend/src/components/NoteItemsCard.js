// import { useState } from "react";
import { FaRegTrashCan, FaRegPenToSquare, FaFileCirclePlus, FaCircleInfo, FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { setId } from "../redux/reducers/noteSlice";
import fetchNotes, { deleteNote } from "../redux/api/notesApi";
import { useRef, useState } from "react";
import Edit from '../components/crud/Edit';
import Create from "./crud/Create";
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';


function NoteItemsCard() {

  const Notes = useSelector((state) => state.notes.notes)
  const loading = useSelector((state)=> state.notes.status)
  const { enqueueSnackbar } = useSnackbar();   
  const [noteId, setNoteId] = useState();
  const [showDescription, setshowDescription] = useState();
  const [showTitle, setshowTitle] = useState();
  const [showTag, setshowTag] = useState();
  const ref = useRef(null)
  const token = useSelector((state) => state.user.authToken);
  const dispatch = useDispatch();



  // Button to edit 
  const handelonclickedit = async (id) => {
    dispatch(setId(id))
  }

  const handelDeleteClick = (noteId) => {

    dispatch(deleteNote(noteId))
      .then(() => dispatch(fetchNotes(token)))
      .then(()=>{
        if(loading === 'fulfilled'){
          enqueueSnackbar('Note Deleted Successfully',{ variant: 'success'})
      }
      if(loading === 'rejected'){
          enqueueSnackbar("Error:note can not be deleted", {varient:'error'})
      }
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  const showPopup = (id) => {
    setNoteId(id)
  }


  const showModel = (data) => {
    const showNote = data;

    const setData = (showNote) => {
      setshowDescription(showNote.description);
      setshowTitle(showNote.title);
      setshowTag(showNote.tag);
    }
    // Call the setData function
    setData(showNote)
    ref.current.click()

  };



  return (
    <>
      {/* Model to show note */}
      {/* <!-- Button Show modal --> */}
      <button className="d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#showModal">
        <i className='' style={{ color: "blue" }}><FaRegPenToSquare /></i>
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="showModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title" id="exampleModalLabel">{showTitle}</h2>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body border" style={{ height: "45vh", maxHeight: '70vh', overflow: 'scroll' }}>
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

      {/* Model for create note */}
      {/* <!-- Modal --> */}
      <div className="modal fade" id="createModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Create a new note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Create />
            </div>

          </div>
        </div>
      </div>

      {/* Model for edit note */}

      {/* <!-- Modal --> */}
      <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit your note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Edit />
            </div>

          </div>
        </div>
      </div>

      {/* <!-- Modal for delete note --> */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Delete Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete note ?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={() => { handelDeleteClick(noteId) }} type="button" className="btn btn-primary" data-bs-dismiss="modal">Continue</button>
            </div>
          </div>
        </div>
      </div>
      {/* Add note symbol */}



      {/* This is the note table  */}
      <div className="container border border-dark mt-4" style={{maxHeight:"100 vh"}}>
        <div className=" border-bottom">
        <div>
          <Link to ="/home"><i><FaArrowLeft /></i></Link>
        </div>
          <div className="d-flex align-items-center justify-content-around ">
            <h1>Your Notes</h1>
            {/* <!-- Button Create modal --> */}
            <Link data-bs-toggle="modal" data-bs-target="#createModal">
              <i className="h4 mt-4 " style={{ color: "green", cursor: "pointer" }}><FaFileCirclePlus /></i>
            </Link>
          </div>
        </div>


        {/* // Crads start from here */}

        <div className="row">

          {Notes.map((note, index) => (
            <div className="col-md-3 mt-4">
            <div class="card w-75" key={note._id}>
            <p>{index}</p>
              <div class="card-body">
                <h5 class="card-title">{note.title}</h5>
                <p class="card-text">{note.description.substring(0,20)}</p>

                <div className="d-flex text-center justify-content-center  ">
                  {/* <!-- Button Delete modal --> */}
                  <Link className="border-none mx-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    <i onClick={() => { showPopup(note._id) }} className='h4' style={{ color: "green", cursor: "pointer" }}><FaRegTrashCan /></i>
                  </Link>
                  {/* <!-- Button Edit modal --> */}
                  <Link className="border-none mx-3" data-bs-toggle="modal" data-bs-target="#editModal">
                    <i onClick={() => { handelonclickedit(note._id) }} className='h4' style={{ color: "blue", cursor: "pointer" }}><FaRegPenToSquare /></i>
                  </Link>
                  {/* <!-- Button Show modal --> */}
                  <Link className="border-none mx-3" data-bs-toggle="modal" data-bs-target="#showModal">
                    <i onClick={() => { showModel({ title: note.title, description: note.description, tag: note.tag }) }} className='h4' style={{ color: "red", cursor: "pointer" }}><FaCircleInfo /></i>
                  </Link>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>



    </>
  );
}

export default NoteItemsCard
