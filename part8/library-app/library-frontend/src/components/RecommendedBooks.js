import { useQuery } from "@apollo/client";
import {ALL_BOOKS, ME} from "../queries";

const RecommendedBooks = ({ show }) => {
  const user = useQuery(ME);
  const books = useQuery(ALL_BOOKS);

  if (!show || !books) {
    return null;
  }

  if (user.loading) {
    return <div>loading...</div>;
  }

  if (user.error) {
    return <div>error</div>
  }

  console.log(user.data);

  const booksArray = books.data.allBooks;
  console.log(booksArray);

  return (
    <div>
      <h2>Recommended Books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksArray
            .filter((book) => book.genres?.includes(user.data.me.favoriteGenre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendedBooks;
