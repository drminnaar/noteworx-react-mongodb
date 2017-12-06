import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';


class EditNoteForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.note.id,
            title: props.note.title,
            content: props.note.content,
            tags: props.note.tags,
            validationErrors: []
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onTagsChange = this.onTagsChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    
    onTitleChange(event) {
        const title = event.target.value;

        this.validateTitle(title);

        this.setState({ title: title });
    }


    onContentChange(event) {
        const content = event.target.value;

        this.validateContent(content);
        
        this.setState({ content: content });
    }


    onTagsChange(event) {
        const tags = event.target.value;

        if (this.validateTags(tags)) {            
            this.setState({ tags: tags.split(',')});
        }        
    }

    
    onSave(event) {
        event.preventDefault();

        if (this.state.validationErrors && this.state.validationErrors.length === 0) {
            const { title, content } = this.state;
            
            if (this.validateTitle(title) && this.validateContent(content)) {
                this.props.onSaveNote({
                    id: this.state.id,
                    title: this.state.title,
                    content: this.state.content,
                    tags: this.state.tags
                });
            }
        }
    }
    

    validateTitle(title) {
        const message = 'Title is required';

        if (title === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateContent(content) {
        const message = 'Content is required';

        if (content === '') {
            this.addValidationError(message);
            return false;
        } else {
            this.removeValidationError(message);
            return true;
        }
    }


    validateTags(tags) {
        const message = 'Tags must be a comma separated list';
        
        if (tags !== '') {
            var regex = new RegExp(/^([\w]+[\s]*[,]?[\s]*)+$/);

            if (!regex.test(tags)) {                
                this.addValidationError(message);
                return false;
            } else {
                this.removeValidationError(message);
                return true;
            }
        } else {
            this.removeValidationError(message);
        }
    }

    
    addValidationError(message) {        
        this.setState((previousState) => {
            const validationErrors = [...previousState.validationErrors];
            validationErrors.push({message});
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    removeValidationError(message) {
        this.setState((previousState) => {
            const validationErrors = previousState
                .validationErrors
                .filter(error => error.message !== message);
            
            return {
                validationErrors: validationErrors
            };
        });      
    }

    
    render() {

        const validationErrorSummary = this.state.validationErrors.map(error => 
            <div key={uuidv1()} className="alert alert-danger alert-dismissible fade show">
                {error.message}
                <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                </button>
            </div>
        );

        return (
            <div className="card card-body">
                <div className="mb-2">        
                    <span className="h4 my-auto"><i className="fa fa-file-text-o fa-lg"></i> Edit Note</span>
                    <a className="float-right ml-auto" onClick={this.props.onCloseModal}>
                        <i className="fa fa-remove mr-2 fa-2x text-danger"></i>
                    </a>
                </div>
                {validationErrorSummary}
                <form onSubmit={this.onSave} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" autoFocus onChange={this.onTitleChange} value={this.state.title}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea className="form-control" name="content" rows="3" onChange={this.onContentChange} value={this.state.content}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Tags</label>
                        <input type="text" className="form-control" name="tags" onChange={this.onTagsChange} value={this.state.tags.join(',')} />
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-4 col-md-3 col-xl-2 ml-auto">
                            <button type="submit" className="btn btn-success btn-block">
                                <i className="fa fa-save mr-2"></i>Save
                            </button>
                        </div>
                        <div className="col-sm-4 col-md-3 col-xl-2">
                            <button className="btn btn-danger btn-block mt-2 mt-sm-0"
                                onClick={this.props.onCloseModal}
                                type="button">
                                <i className="fa fa-remove mr-2"></i>Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

EditNoteForm.propTypes = {
    note: PropTypes.object,
    onCloseModal: PropTypes.func,
    onSaveNote: PropTypes.func
};

export default EditNoteForm;