// import { useState } from "react";
import { FaRegTrashCan, FaRegPenToSquare, } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setId } from "../redux/reducers/noteSlice";
import { deleteNote } from "../redux/api/notesApi";
function NoteItems() {

    const Notes = useSelector((state) => state.notes.notes)
    
    const dispatch = useDispatch();

    const handelonclickedit =  async (id) => {
       
        dispatch(setId(id))
    }
    const handelDeleteClick=(id)=>{

        dispatch(deleteNote(id))

    }


    return (
        <>
        <div className="container border border-dark mt-4">
        <div className="text-center border-bottom">
            <h1>Your Notes</h1>
        </div>
                   <table className="table">
                <thead>
                    <tr>
                        <th scope="col">SR. No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Tag</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                {Notes.map((note, index) => (


                    <tbody key={note._id}>
                        <tr>
                            <th scope="row">{index}</th>
                            <td>{note.title}</td>
                            <td>{note.description}</td>
                            <td>{note.tag}</td>
                            <td>
                                <div>
                                    <Link to="#" > <i onClick={()=>{handelDeleteClick(note._id)}} className='h4' style={{ color: "green" }}><FaRegTrashCan /></i> </Link>
                                    <Link to="/edit" onClick={()=>{handelonclickedit(note._id)}}> <i className='h4' style={{ color: "blue" }}><FaRegPenToSquare /></i></Link>
                                </div>
                            </td>
                        </tr>

                    </tbody>


                ))}
            </table>
            </div>
 
        </>
    );
}

export default NoteItems;
