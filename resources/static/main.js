$(document).ready(function () {
    getTutorials()

    // Get all books and display in table
    function getTutorials() {
        $('#booksBody').html('');

        $.ajax({
            url: 'http://127.0.0.1:3000/api/v1/books',
            type: 'GET',
            datatype: JSON,
            success: function (data) {
                $(data).each(function (i, book) {
                    addRow(book)
                })
            }
        })

    }

    $('body').on('click', '#edit', function (data) {
        var id = $($(this)[0]).data("id")

        $.ajax({
            url: 'http://127.0.0.1:3000//api/v1/books/' + id,
            type: 'GET',
            datatype: JSON,
            success: function (book) {
                $('.form-update #id').val(book.id);
                $('.form-update #title').val(book.title);
                $('.form-update #description').val(book.description);
                $('.form-update #price').val(book.price);
            },
            error: function (e) {
                console.log(e)
            }
        })

        $('#exampleModal').modal('toggle');

    });

    $('body').on('click', '#btn-add', function (data) {

        $('#exampleModal-add').modal('toggle');

    });

    $('body').on('click', '#btn-delete', function (data) {

        $('#exampleModal-delete').modal('toggle');
        var id = $($(this)[0]).data("id")

        $.ajax({
            url: 'http://127.0.0.1:3000//api/v1/books/' + id,
            type: 'GET',
            datatype: JSON,
            success: function (book) {
                $('.form-delete #id').val(book.id);
                $('.form-delete #title').val(book.title);

            },
            error: function (e) {
                console.log(e)
            }
        })

    });

    //Delete a book by ID/
    $('body').on('submit', '#form-delete', function (e) {
        e.preventDefault()
        var id = $('.form-delete #id').val();

        $.ajax({
            url: 'http://127.0.0.1:3000/api/v1/books/' + id,
            type: 'DELETE',
            datatype: JSON,
            success: function (data) {
                console.log(data.title + " " + "eliminado correctamente")
                $('#exampleModal-delete').modal('toggle');
            },
            error: function (e) {
                console.log(e)
            }
        })

    });

    //Update a book
    $('body').on('submit', '#form-update', function (e) {
        e.preventDefault();

        let data = {
            "id": $('.form-update #id').val(),
            "title": $('.form-update #title').val(),
            "description": $('.form-update #description').val(),
            "price": $('.form-update #price').val()
        }

        $.ajax({
            url: 'http://127.0.0.1:3000/api/v1/books/' + data.id,
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (book) {
                console.log(book)
                $('#exampleModal').modal('toggle');
            },
            error: function (e) {
                console.log(e)
            }
        });


    });

    //Create a book
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();

        let data = {
            "title": $('.form-add #title').val(),
            "description": $('.form-add #description').val(),
            "price": $('.form-add #price').val()
        }

        $.ajax({
            url: 'http://127.0.0.1:3000/api/v1/books',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(data),
            success: function (book) {
                addRow(book)
                $('#exampleModal-add').modal('toggle');
            },
            error: function (e) {
                console.log(e)
            }
        });

    });

    function addRow(book) {
        $("#booksBody").append($("<tr>")
            .append($("<td>").append(book.id))
            .append($("<td>").append(book.title))
            .append($("<td>").append(book.description))
            .append($("<td>").append(book.price))
            .append($("<td>").append('<button class="btn btn-warning" id="edit"  data-id="' + book.id + '" style="margin-right:5px">Edit</button><button data-id="' + book.id + '" class="btn btn-danger" id="btn-delete">Delete</button>'))
        )
    }


})
