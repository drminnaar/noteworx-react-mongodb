import React from 'react';
import PropTypes from 'prop-types';

const NoteTable = (props) => {
    const notes = props.notes;

    const noteRows = notes.map(note => {

        let classes = `small ${!!note.isNew ? 'table-success' : ''}`;
        
        return (
            <tr key={note.id.toString()} className={classes}>
                <td className="align-middle" style={{width: '80px'}}>
                    <div className="d-flex flex-row">
                        <a data-toggle="tooltip" data-placement="top" title="Edit Note" className="p-2" onClick={() => props.onOpenEditNoteModal(note.id)}>
                            <i className="fa fa-pencil fa-lg text-primary"></i>
                        </a>
                        <a data-toggle="tooltip" data-placement="top" title="Delete Note" className="p-2" onClick={() => props.onDeleteNote(note.id)}>
                            <i className="fa fa-trash fa-lg text-danger"></i>
                        </a>
                    </div>                
                </td>
                <td className="align-middle">{note.title}</td>
                <td className="align-middle">
                    <span className="d-inline-block text-truncate" style={{maxWidth: '200px'}}>
                        {note.content}
                    </span>                
                </td>
                <td className="align-middle">{`${new Date(note.updatedDate).toISOString().slice(0, 10)} ${new Date(note.updatedDate).toISOString().slice(11, 16)}`}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th></th>
                        <th className="align-middle text-center">Title</th>
                        <th className="align-middle text-center">Content</th>
                        <th className="align-middle text-center">Updated Date</th>
                    </tr>
                </thead>
                <tbody>
                    {noteRows}
                </tbody>
            </table>
        </div>
    );
};

NoteTable.propTypes = {
    notes: PropTypes.array,
    onDeleteNote: PropTypes.func,
    onOpenEditNoteModal: PropTypes.func
};

export default NoteTable;