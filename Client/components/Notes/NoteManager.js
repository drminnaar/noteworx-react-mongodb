import React, { Component } from 'react';
import Modal from 'react-modal';
import AddNoteForm from './AddNoteForm';
import EditNoteForm from './EditNoteForm';
import NoteTable from './NoteTable';
import ControlPanel from './ControlPanel';
const NoteService = require('../../services/note-service');

class NoteManager extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            notes: [],
            selectedNote: null,
            isAddNoteModalOpen: false,
            isEditNoteModalOpen: false
        };

        
        this.handleOnAddNote = this.handleOnAddNote.bind(this);
        this.handleOnEditNote = this.handleOnEditNote.bind(this);
        this.handleOnDeleteNote = this.handleOnDeleteNote.bind(this);
        this.handleOnFindNotes = this.handleOnFindNotes.bind(this);
        
        this.handleOpenAddNoteModal = this.handleOpenAddNoteModal.bind(this);
        this.handleOnCloseAddNoteModal = this.handleOnCloseAddNoteModal.bind(this);

        this.handleOpenEditNoteModal = this.handleOpenEditNoteModal.bind(this);
        this.handleOnCloseEditNoteModal = this.handleOnCloseEditNoteModal.bind(this);
    }


    componentDidMount() {
        this.listNotes();
    }


    listNotes() {
        NoteService
            .listNotes()
            .then(notes => {
                this.setState({notes});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnDeleteNote(noteId) {

        if (noteId < 1) {
            throw Error('Cannot remove note. Invalid note id specified');
        }
        
        const confirmation = confirm('Are you sure you wish to remove note?');

        if (confirmation) {
            NoteService
                .removeNote(noteId)
                .then(() => {
                    NoteService
                        .listNotes()
                        .then(notes => {
                            this.setState({notes});
                            return;
                        })
                        .catch(error => {
                            console.log(error);
                            return;
                        });
                })
                .catch(error => {
                    console.log(error);
                    return;
                });
        }
    }


    handleOnFindNotes(title) {
        
        if (!title || title === '') {
            this.listNotes();
            return;
        }
        
        NoteService
            .findNotesByTitle(title)
            .then(notes => {
                if (!notes) {
                    notes = [];
                }
                this.setState({notes});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnAddNote(note) {

        this.setState({ isAddNoteModalOpen: false });

        const { title, content, tags } = note;

        if (!title || title.length === 0) {
            throw Error('Title is required');
        }

        if (!content || content.length === 0) {
            throw Error('Content is required');
        }

        if (!Array.isArray(tags)) {
            throw Error('Tags must be an array');
        }

        NoteService
            .addNote(title, content, tags)
            .then(newNote => {             
                NoteService
                    .listNotes()
                    .then(notes => {
                        notes.forEach(n => n.id === newNote.id ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({notes});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    handleOnCloseAddNoteModal() {
        this.setState({isAddNoteModalOpen: false});
    }


    handleOpenAddNoteModal() {
        this.setState({isAddNoteModalOpen: true});
    }


    handleOnCloseEditNoteModal() {
        this.setState({isEditNoteModalOpen: false});
    }


    handleOpenEditNoteModal(noteId) {

        if (!noteId || noteId < 1) {
            throw Error('Cannot edit note. Invalid note id specified.');
        }

        NoteService
            .findNote(noteId)
            .then(note => {
                this.setState({selectedNote: note});
                this.setState({isEditNoteModalOpen: true});
                return;
            })
            .catch(error => {
                console.log(error);
                return;
            });
    }


    handleOnEditNote(note) {
        this.setState({ isEditNoteModalOpen: false });
        
        const { title, content, tags } = note;
        
        if (!title || title.length === 0) {
            throw Error('Title is required');
        }
        
        if (!content || content.length === 0) {
            throw Error('Content is required');
        }
        
        if (!Array.isArray(tags)) {
            throw Error('Tags must be an array');
        }

        NoteService
            .updateNote(note)
            .then(() => {                
                NoteService
                    .listNotes()
                    .then(notes => {
                        notes.forEach(n => n.id === note.id ? n.isNew = 'true' : n.isNew = undefined);                
                        this.setState({notes});
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>                                
                <Modal isOpen={this.state.isAddNoteModalOpen} onRequestClose={this.handleOnCloseAddNoteModal}>
                    <AddNoteForm onSaveNote={this.handleOnAddNote} onCloseModal={this.handleOnCloseAddNoteModal} />
                </Modal>
                <Modal isOpen={this.state.isEditNoteModalOpen} onRequestClose={this.handleOnCloseEditNoteModal}>
                    <EditNoteForm onSaveNote={this.handleOnEditNote} onCloseModal={this.handleOnCloseEditNoteModal} note={this.state.selectedNote} />
                </Modal>
                <div className="mb-3">
                    <ControlPanel openAddNoteModal={this.handleOpenAddNoteModal} onFindNotes={this.handleOnFindNotes} />
                </div>
                <NoteTable notes={this.state.notes} onDeleteNote={this.handleOnDeleteNote} onOpenEditNoteModal={this.handleOpenEditNoteModal} />
            </div>
        );
    }
}

export default NoteManager;