import React, { useState } from 'react';
import fetchNotes, { editNotes } from '../../redux/api/notesApi';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

function Edit() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const dispatch = useDispatch();
  const id = useSelector((state) => state.notes.id);
  const loading = useSelector((state) => state.notes.status);
  const token = useSelector((state) => state.user.authToken);
  const { enqueueSnackbar } = useSnackbar();

  const handelOnChange = (e) => {
    const { id, value } = e.target;
    if (id === 'title') {
      setTitle(value);
    }
    if (id === 'tag') {
      setTag(value);
    }
    if (id === 'description') {
      setDescription(value);
    }
  };

  const handelOnClick = () => {
    const data = {
      title,
      description,
      tag,
      id,
      token,
    };

    dispatch(editNotes(data))
      .then(() => dispatch(fetchNotes(token)))
      .then(() => {
        if (loading === 'fulfilled') {
          enqueueSnackbar('Note Updated Successfully', { variant: 'success' });
        }
        if (loading === 'rejected') {
          enqueueSnackbar('Error: Note cannot be updated', { variant: 'error' });
        }
      })
      .catch((error) => {
        console.error('Error editing note:', error);
      });
  };

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" value={title} onChange={handelOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea className="form-control" id="description" value={description} onChange={handelOnChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input type="text" className="form-control" id="tag" value={tag} onChange={handelOnChange} />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" onClick={handelOnClick} className="btn btn-primary" data-bs-dismiss="modal">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
