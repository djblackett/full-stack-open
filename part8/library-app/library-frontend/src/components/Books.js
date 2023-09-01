import { useEffect, useState } from "react";
import { useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import {ALL_BOOKS, ALL_BOOKS_BY_GENRE, BOOK_ADDED} from "../queries";
import { updateCache } from "../App";

const Books = ({ show, books, refetch }) => {

  const [genreList, setGenreList] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [renderedBooks, setRenderedBooks] = useState(books);
  const [filteredBooks, result] = useLazyQuery(ALL_BOOKS, {
    variables: {genre: selectedGenre === "all" ? null : selectedGenre},
    onCompleted: ({data}) => setRenderedBooks(data.allBooks)
  })

  // set up list of genres for the genre buttons
  useEffect(() => {
    if (books) {
      const set = new Set();
      books.forEach((book) =>
        book.genres.forEach((genre) => set.add(genre)),
      );

      setGenreList(Array.from(new Set([...genreList, ...set])));
    }
  }, [books]);


  useEffect(() => {
    if (selectedGenre === "all") {
      setRenderedBooks(books)
    } else {
      setRenderedBooks(result?.data?.allBooks)
    }
  }, [selectedGenre, result?.data?.allBooks, filteredBooks, books]);

  if (!show) {
    return null;
  }

  const handleGenreClick = async (genre) => {
    if (selectedGenre === genre) {
      setSelectedGenre("all");
      await filteredBooks({variables: {genre: null}})
    } else {
      setSelectedGenre(genre);
      await filteredBooks({variables: {genre: genre}})

    }
  };

  const handleClickAll = () => {
    setSelectedGenre("all");
  };

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {renderedBooks &&
            renderedBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}

        </tbody>
      </table>
      <div>
        {genreList &&
          genreList.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              style={{
                border:
                  selectedGenre === genre
                    ? "2px solid blue"
                    : "1px solid black",
              }}
            >
              {genre}
            </button>
          ))}
        <button
          onClick={() => handleClickAll()}
          style={{
            border:
              selectedGenre === "all" ? "2px solid blue" : "1px solid black",
          }}
        >
          all
        </button>
      </div>
    </div>
  );
};

export default Books;
