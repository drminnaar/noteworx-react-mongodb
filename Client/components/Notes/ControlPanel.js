import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ControlPanel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ''
        };

        this.onSearchTitleChanged = this.onSearchTitleChanged.bind(this);
    }

    onSearchTitleChanged(event) {
        const title = event.target.value;
        this.setState({title});
    }

    render () {
        return (
            <div>
                <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.props.openAddNoteModal}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </span>
                    <input type="text" className="form-control" placeholder="Search for note by title ..." value={this.state.title} onChange={this.onSearchTitleChanged} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={() => this.props.onFindNotes(this.state.title)} >
                            <i className="fa fa-search"></i>
                        </button>
                    </span>
                </div>        
            </div>
        );
    }
}

ControlPanel.propTypes = {
    openAddNoteModal: PropTypes.func,
    onFindNotes: PropTypes.func
};

export default ControlPanel;