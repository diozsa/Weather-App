import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import searchIcon from '../icons/search.png'



/** Search widget.
 *
 * Appears in Navbar for searching a location.
 *
 * This component doesn't *do* the searching, but it renders the search
 * form and calls the `searchFor` function prop that runs in a parent to do the
 * searching.
 *
 * { NavBar } -> SearchForm
 */

const SearchForm = ({ searchFor, unit}) => {
  // console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setsearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(searchTerm, unit);
    setsearchTerm("");
  }

  const handleChange = (e) => {
    setsearchTerm(e.target.value);
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
        <Form.Group className="d-flex align-items-center">
        <Form.Control
          placeholder="Search for a city, address or zip code"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
            required
            // style={{ minWidth: "290px", width: "100%" }}
            className="form-control-md"
        />
        <Button
          type="submit"
          variant="outline-secondary"
          id="search-button"  
          >
          <img src={searchIcon} style={{ width: "20px" }} alt="Search Icon" />
        </Button>

        </Form.Group>
        </Form>
    </>
  );
}

export default SearchForm;