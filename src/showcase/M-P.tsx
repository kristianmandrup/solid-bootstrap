import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const MediaDisplay = lazy(() => import("./MediaDisplay"));
const ModalDisplay = lazy(() => import("./ModalDisplay"));
const NavbarDisplay = lazy(() => import("./NavbarDisplay"));
const NavsDisplay = lazy(() => import("./NavsDisplay"));
const PaginationDisplay = lazy(() => import("./PaginationDisplay"));
const PopoverDisplay = lazy(() => import("./PopoverDisplay"));
const ProgressDisplay = lazy(() => import("./ProgressDisplay"));

export default () => <>
      <h3>M-P</h3>
      <Link class="nav" href="/media">
      Media
    </Link>      
    <Link class="nav" href="/modal">
      Modal
    </Link>      
    <Link class="nav" href="/navbar">
      Navbar
    </Link>      
    <Link class="nav" href="/navs">
      Navs
    </Link>      
    <Link class="nav" href="/pagination">
      Pagination
    </Link>      
    <Link class="nav" href="/popover">
      Popover
    </Link>      
    <Link class="nav" href="/progress">
      Progress
    </Link>    
      <Routes>
        <Route path="/media" element={<MediaDisplay />} />
        <Route path="/modal" element={<ModalDisplay />} />
        <Route path="/navbar" element={<NavbarDisplay />} />
        <Route path="/navs" element={<NavsDisplay />} />
        <Route path="/pagination" element={<PaginationDisplay />} />
        <Route path="/popover" element={<PopoverDisplay />} />
        <Route path="/progress" element={<ProgressDisplay />} />
      </Routes>
      </>