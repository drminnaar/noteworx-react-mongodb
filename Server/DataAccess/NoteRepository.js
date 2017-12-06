'use strict';

const ObjectID = require('mongodb').ObjectID;
const DbConnection = require('./DbConnection');

const collection = 'notes';

const connect = () => new DbConnection('mongodb://127.0.0.1:27017/noteworx');

const filters = {
    id: (id) => {
        return { _id: new ObjectID(id) };
    },
    tag: (tag) => {
        return { tags: { $regex: new RegExp(tag, 'i') } };
    },
    title: (title) => {
        return { 'title': { $regex: new RegExp(title, 'i') } };
    }
};

class NoteRepository {

    addNote(note) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.title(note.title))
                        .then(noteData => {
                            if (noteData) {
                                connection.close();
                                reject(Error('Note already exists'));
                            } else {
                                connection.Db
                                    .collection(collection)
                                    .insertOne(note)
                                    .then(result => {
                                        connection.close();
                                        resolve({ id: result.insertedId });
                                    })
                                    .catch(error => {
                                        connection.close();
                                        reject(error);
                                    });
                            }
                        })
                        .catch(error => {
                            connection.close();
                            reject(error);
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findNoteById(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .findOne(filters.id(id))
                        .then(note => {
                            resolve(note);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findNotesByTag(tag) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.tag(tag))
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(notes => {
                            resolve(notes);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    findNotesByTitle(title) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find(filters.title(title))
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(notes => {
                            resolve(notes);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    listNotes() {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db.collection(collection)
                        .find()
                        .sort({ updated_date: -1})
                        .toArray()
                        .then(notes => {
                            resolve(notes);
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => reject(error));
        });
    }


    removeNote(id) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndDelete(filters.id(id))
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }


    tagNote(id, tags) {
        const connection = connect();

        const update = {
            $addToSet: {
                tags: {
                    $each: tags
                }
            }
        };

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .findOneAndUpdate(
                            filters.id(id),
                            update
                        )
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    reject(error);
                    connection.close();
                });
        });
    }


    updateNote(id, note) {
        const connection = connect();

        return new Promise((resolve, reject) => {
            connection
                .open()
                .then(() => {
                    connection.Db
                        .collection(collection)
                        .update(
                            filters.id(id),
                            {
                                $set: {
                                    title: note.title,
                                    content: note.content,
                                    tags: note.tags,
                                    updated_date: note.updated_date
                                }
                            })
                        .then(() => {
                            resolve();
                            connection.close();
                        })
                        .catch(error => {
                            reject(error);
                            connection.close();
                        });
                })
                .catch(error => {
                    resolve(error);
                    connection.close();
                });
        });
    }
}

module.exports = NoteRepository;