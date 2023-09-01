import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from "./queries";
import {gql, useApolloClient, useQuery, useSubscription} from "@apollo/client";
import LoginForm from "./components/LoginForm";
import RecommendedBooks from "./components/RecommendedBooks";

import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import Books2 from "./components/Books";


loadDevMessages();
loadErrorMessages();

// function that takes care of manipulating cache
export const updateCache = async (cache, query, addedBook) => {
  // helper that is used to eliminate saving same Book twice
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.name;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  await cache.updateQuery(query, ({ allBooks}) => {
    console.log(allBooks)
    return { allBooks: uniqByName(allBooks?.concat(addedBook)) };
  });
};



const App = () => {
  const client = useApolloClient();



  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
        set.map((p) => p.title).includes(object.title);

    const dataInStore = client.readQuery({query: ALL_BOOKS,});
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {allBooks: dataInStore.allBooks.concat(addedBook)},
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onData: async ({ data }) => {
      alert(
        `New book added: ${data.data.bookAdded.title} by ${data.data.bookAdded.author.name}`,
      );
      console.log("In the subcsciption hook");
      console.log(data);
      const addedBook = data.data.bookAdded;
      // window.alert(`${addedBook.name} added`);
      notify(`${addedBook.title} added`);
      console.log(`${addedBook.title} added`);
        try {
          // updateCacheWith(addedBook);
          await updateCache(client.cache, {query: ALL_BOOKS}, addedBook);
        } catch(error) {
          console.log(error);
        }
    }
  });

  const [page, setPage] = useState("books");

  const books = useQuery(ALL_BOOKS);

  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    setLoggedIn(false);
    setPage("books");
    client.resetStore();
  };
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      setPage("books");
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  useEffect(() => {
    if (localStorage.getItem("library-user-token")) {
      setToken(localStorage.getItem("library-user-token"));
    }
  }, []);

  if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {loggedIn && (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
          </>
        )}

        {loggedIn ? (
          <button onClick={logout}>logout</button>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === "authors"}
        loggedIn={loggedIn}
      />

      <Books2 show={page === "books"} books={books.data.allBooks} refetch={books.refetch}/>

      <NewBook show={page === "add"} setError={notify} setPage={setPage} />
      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setError={notify}
      />

      <RecommendedBooks show={page === "recommended"}  />
    </div>
  );
};

export default App;

export const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};
