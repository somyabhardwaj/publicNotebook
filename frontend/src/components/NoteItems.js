// import { useState } from "react";
import { FaRegTrashCan, FaRegPenToSquare, FaFileCirclePlus, FaCircleInfo } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { setId } from "../redux/reducers/noteSlice";
import fetchNotes, { deleteNote } from "../redux/api/notesApi";
import { useRef, useState } from "react";
import Edit from '../components/crud/Edit';
import Create from "./crud/Create";
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom";


function NoteItems() {

    const Notes = useSelector((state) => state.notes.notes)
    const loading = useSelector((state)=>state.notes.status)
    const [noteId, setNoteId] = useState();
    const [showDescription, setshowDescription] = useState();
    const [showTitle, setshowTitle] = useState();
    const [showTag, setshowTag] = useState();
    const { enqueueSnackbar } = useSnackbar();    
    const ref = useRef(null)
    const token = useSelector((state) => state.user.authToken);
    const dispatch = useDispatch();


    // Button to edit 
    const handelonclickedit = async (id) => {
        dispatch(setId(id))
    }

    const handelDeleteClick = (noteId) => {

        dispatch(deleteNote({noteId,token}))
            .then((response) => {
                dispatch(fetchNotes(token))
                    if(response.payload !== undefined){
                        enqueueSnackbar("Note deleted successfully", {varient:'success'})
                    }
                    else{
                        enqueueSnackbar("Error: Note can not be deleted", {varient: 'error'})
                    }
            })            
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


            <div className="container border border-dark mt-4">
                <div className=" border-bottom">
                    <div className="d-flex align-items-center justify-content-around ">
                        <h1>Your Notes</h1>
                        {/* <!-- Button Create modal --> */}
                        <Link data-bs-toggle="modal" data-bs-target="#createModal">
                            <i className="h4 mt-4 " style={{ color: "green", cursor:"pointer" }}><FaFileCirclePlus /></i>
                        </Link>
                    </div>
                </div>


                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SR. No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Tag</th>
                            <th className="text-center" scope="col">Edit</th>
                        </tr>
                    </thead>
                    {!Notes ? "... Loading" : (Notes.map((note, index) => (


                        <tbody key={note._id}>
                            <tr>
                                <th scope="row">{index}</th>
                                <td>{note.title}</td>
                                <td>{note.description.substring(0, 20)}</td>
                                <td>{note.tag}</td>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        {/* <!-- Button Delete modal --> */}
                                        <Link className="border-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                            <i onClick={() => { showPopup(note._id) }} className='h4' style={{ color: "green",cursor:"pointer" }}><FaRegTrashCan /></i>
                                        </Link>
                                        {/* <!-- Button Edit modal --> */}
                                        <Link data-bs-toggle="modal" data-bs-target="#editModal">
                                            <i onClick={() => { handelonclickedit(note._id) }} className='h4' style={{ color: "blue",cursor:"pointer" }}><FaRegPenToSquare /></i>
                                        </Link>
                                        {/* <!-- Button Show modal --> */}
                                        <Link data-bs-toggle="modal" data-bs-target="#showModal">
                                            <i onClick={() => { showModel({ title: note.title, description: note.description, tag: note.tag }) }} className='h4' style={{ color: "red",cursor:"pointer" }}><FaCircleInfo /></i>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    )))}
                </table>
            </div>

        </>
    );
}

export default NoteItems;
