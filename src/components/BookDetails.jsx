import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookDetails() {
    const [bookDetails, setBookDetails] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const data = await response.json();
                setBookDetails(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!bookDetails) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">{bookDetails.volumeInfo.title}</h1>
            <p><strong>Author(s):</strong> {bookDetails.volumeInfo.authors.join(', ')}</p>
            <p><strong>Published Date:</strong> {bookDetails.volumeInfo.publishedDate}</p>
            <p><strong>Rating:</strong> {bookDetails.volumeInfo.averageRating}</p>
            <p><strong>Description:</strong> {bookDetails.volumeInfo.description}</p>
            {/* Add more details as needed  */}
        </div>
    );
}

export default BookDetails;
