import { useRef, useState, useEffect } from "react";
import {
  ButtonGroup,
  Button,
  ButtonToolbar,
  Form,
  InputGroup,
} from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


function PokeSearch(props) {

    const inputSearch = useRef(null)
    const navigate = useNavigate()
    
    useEffect(() => {
      navigate(`/${props.regions[props.region]}`)
    }, []);


    const handleSelect = (e) => {
        props.handleFilter(e)
    }
    

  return (
    <ButtonToolbar className="my-4 mx-2 d-flex justify-content-center " aria-label="Toolbar with Button groups">
      <ButtonGroup  aria-label="First group" className="w-100">
        <Form.Select aria-label="Default select example" className="me-3" onChange={handleSelect}>
            <option disabled>Trier par région  </option>
            <option value="0" className="fw-bold">Toutes</option>
            <option value="1">Kanto</option>
            <option value="2">Johto</option>
            <option value="3">Hoenn</option>
            <option value="4">Sinnoh</option>
            <option value="5">Unys</option>
            <option value="6">Kalos</option>
            <option value="7">Alola</option>
            <option value="8">Galar</option>
        </Form.Select>
        <form className="w-100">
            <InputGroup>
                <Form.Control
                    id="search-bar"
                    type="search"
                    placeholder="Rechercher"
                    aria-label="Input group example"
                    aria-describedby="btnGroupAddon"
                    onChange={props.search}
                    ref={inputSearch}
                    autoComplete="off"
                    />
            </InputGroup>
        </form>
      </ButtonGroup>
    </ButtonToolbar>
  );
}

export default PokeSearch;
