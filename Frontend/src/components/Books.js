import React, { useState, useEffect } from 'react';

export const Books = () => {

    const API = process.env.REACT_APP_API;

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [books, setBooks] = useState([]);

    const [edit, setEdit] = useState(false);


    const getBooks = async () => {
        const response = await fetch(API);
        const data = await response.json();
        setBooks(data);
    }

    useEffect(() => {
        getBooks()
        console.log(API)
    }, []);

    const handlerSubmit = async (e) => {
        e.preventDefault();

        if (!edit) {
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price
                })

            })

            const data = await response.json();

            console.log(data);
            console.log("Creado correctamente");

        } else {
            const response = await fetch(API + "/" + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    price
                })

            })

            const data = await response.json();

            console.log(data);

            setEdit(false);
            setId('');

            console.log("Actualizado correctamente");
        }

        setTitle("");
        setDescription("");
        setPrice(0);

        await getBooks();

    }

    const deleteBook = async (id) => {

        const confirm = window.confirm("Are you sure you want to delete it?");

        if (confirm) {

            const response = await fetch(API + "/" + id, {
                method: 'DELETE',
            });

            const data = await response.json();

            console.log(data);

            await getBooks();

        }

    }

    const editBook = async (id) => {

        const response = await fetch(API + "/" + id);
        const data = await response.json();

        setEdit(true);
        setId(id);

        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);

    }


    return (
        <div className="row">

            <div className="col-md-5">

                <div className="card border-primary">
                    <div className="card card-body ">

                        <div className="card-title"><h5>{edit ? 'Edit Book' : 'Create Book'}</h5></div>


                        <form onSubmit={handlerSubmit}>

                            <div className="form-group">
                                <input type="text" placeholder="Insert title" onChange={e => setTitle(e.target.value)} value={title} className="form-control" />
                            </div>

                            <div className="form-group">
                                <input type="text" placeholder="Insert description" onChange={e => setDescription(e.target.value)} value={description} className="form-control" />
                            </div>

                            <div className="form-group">
                                <input type="number" placeholder="Insert price" onChange={e => setPrice(e.target.value)} value={price} className="form-control" />
                            </div>

                            <input type="submit" className="btn btn-primary" value="Send" />

                        </form>

                    </div>

                </div>

            </div>

            <div className="col-md-7">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            books.map(book => (
                                <tr key={book.id}>
                                    <th scope="row">{book.id}</th>
                                    <td>{book.title}</td>
                                    <td>{book.description}</td>
                                    <td>${book.price}</td>
                                    <td><button onClick={() => editBook(book.id)} className="btn btn-outline-warning">Edit</button> <button onClick={() => deleteBook(book.id)} className="btn btn-outline-danger">Delete</button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>

        </div>
    )
}






