from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/api-python'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(100))
    price = db.Column(db.Float)

    def __init__(self, id, title, description, price):
        self.id = id
        self.title = title
        self.description = description
        self.price = price

    def __str__(self):
        return str(self.id) + " " + self.title + ", " + self.description + " " + str(self.price)


db.create_all()


class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'price')


book_schema = BookSchema()
books_schema = BookSchema(many=True)


# Create a book
@app.route("/api/v1/books", methods=['POST'])
def create_book():
    id = request.json['id']
    title = request.json['title']
    description = request.json['description']
    price = request.json['price']

    new_book = Book(id, title, description, price)

    db.session.add(new_book)
    db.session.commit()

    return "received"


# Get all books
@app.route("/api/v1/books", methods=['GET'])
def get_books():
    all_books = Book.query.all()
    results = books_schema.dump(all_books)

    return jsonify(results)


# Get a single book
@app.route("/api/v1/books/<id>", methods=['GET'])
def get_book(id):
    book = Book.query.get(id)

    return book_schema.jsonify(book)


# Get single book by title
@app.route("/api/v1/books/ByTitle/<title>", methods=['GET'])
def get_bookByTitle(title):
    book = Book.query.filter_by(title=title).first()

    return book_schema.jsonify(book)


# Update a book
@app.route("/api/v1/books/<id>", methods=['PUT'])
def update_book(id):
    book = Book.query.get(id)

    title = request.json['title']
    description = request.json['description']
    price = request.json['price']

    book.title = title
    book.description = description
    book.price = price

    db.session.commit()

    return book_schema.jsonify(book)


# Delete a book
@app.route("/api/v1/books/<id>", methods=['DELETE'])
def delete_book(id):
    book = Book.query.get(id)
    db.session.delete(book)
    db.session.commit()

    return "delete"


# Run server
if __name__ == "__main__":
    app.run(debug=True, port="3000")
