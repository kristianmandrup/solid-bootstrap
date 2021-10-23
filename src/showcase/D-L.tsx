import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const DropdownDisplay = lazy(() => import("./DropdownDisplay"));
const FadeDisplay = lazy(() => import("./FadeDisplay"));
const FormDisplay = lazy(() => import("./FormDisplay"));
const InputGroupDisplay = lazy(() => import("./InputGroupDisplay"));
const ListDisplay = lazy(() => import("./ListDisplay"));
const ListGroupDisplay = lazy(() => import("./ListGroupDisplay"));

export default () => <>
      <h3>D-L</h3>
      <Link class="nav" href="/dropdown">
        Dropdown
      </Link>      
      <Link class="nav" href="/fade">
        Fade
      </Link>      
      <Link class="nav" href="/form">
        Form
      </Link>  
      <Link class="nav" href="/input-group">
        InputGroup
      </Link>      
      <Link class="nav" href="/list">
        List
      </Link>      
      <Link class="nav" href="/list-group">
        ListGroup
      </Link>  
      <Routes>
        <Route path="/dropdown" element={<DropdownDisplay />} />
        <Route path="/fade" element={<FadeDisplay />} />
        <Route path="/form" element={<FormDisplay />} />
        <Route path="/input-group" element={<InputGroupDisplay />} />
        <Route path="/list" element={<ListDisplay />} />
        <Route path="/list-group" element={<ListGroupDisplay />} />             
        </Routes>
    </>        