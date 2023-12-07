import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createNotes} from '../../redux/api/notesApi';
import fetchNotes from '../../redux/api/notesApi';

function Create() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tag, setTag] = useState();
  const dispatch = useDispatch();
  const id = useSelector((state) => state.notes.id)


  const handelOnChange = (e) => {
    const { id, value } = e.target
    if (id === 'title') {
      setTitle(value)
    }
    if (id === 'tag') {
      setTag(value)
    }
    if (id === 'description') {
      setDescription(value)
    }
  }

  const handelOnClick = () => {

    const data = {
      title,
      description,
      tag,
      id
    }
    dispatch(createNotes(data))
    dispatch(fetchNotes())
    // setTitle("")
    // setDescription("")
    // setTag("")

  }

  return (
    <>
      <div className=''>
     
        <div className="mb-3 row" id="#edit">
          <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
          <div className="col-sm-10">
            <input type="textbox" className="form-control" id="title" value={title} onChange={handelOnChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea type="textbox" className="form-control overflow-scroll" id="description" value={description} onChange={handelOnChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="tag" className="col-sm-2 col-form-label">Tag</label>
          <div className="col-sm-10">
            <input type="textbox" className="form-control" id="tag" value={tag} onChange={handelOnChange} />
          </div>
        </div>
        {/* <button onClick={handelOnClick} className='btn btn-primary'>Submit</button> */}
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  onClick={handelOnClick} className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
      </div>
      </div>
    </>
  )
}

export default Create