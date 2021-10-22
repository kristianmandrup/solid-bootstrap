import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const AtoC = lazy(() => import("./A-C"));
const DtoL = lazy(() => import("./D-L"));
const MediaDisplay = lazy(() => import("./MediaDisplay"));
const ModalDisplay = lazy(() => import("./ModalDisplay"));
const NavbarDisplay = lazy(() => import("./NavbarDisplay"));
const NavsDisplay = lazy(() => import("./NavsDisplay"));
const PaginationDisplay = lazy(() => import("./PaginationDisplay"));
const PopoverDisplay = lazy(() => import("./PopoverDisplay"));
const ProgressDisplay = lazy(() => import("./ProgressDisplay"));
const StoT = lazy(() => import("./S-T"));

export default () => <>
      <h1>SolidStrap Showcase</h1>
      <Link class="nav" href="/">
        Home
      </Link>
      <Link class="nav" href="/a-c">
        A-C
      </Link>
      <Link class="nav" href="/d-l">
        D-L
      </Link>
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
    <Link class="nav" href="/s-t">
      S-T
    </Link>    
      <Routes>
        <Route path="/a-c" element={<AtoC />} /> 
        <Route path="/d-l" element={<DtoL />} /> 
        <Route path="/media" element={<MediaDisplay />} />
        <Route path="/modal" element={<ModalDisplay />} />
        <Route path="/navbar" element={<NavbarDisplay />} />
        <Route path="/navs" element={<NavsDisplay />} />
        <Route path="/pagination" element={<PaginationDisplay />} />
        <Route path="/popover" element={<PopoverDisplay />} />
        <Route path="/progress" element={<ProgressDisplay />} />
        <Route path="/s-t" element={<StoT />} />         
      </Routes>
      </>