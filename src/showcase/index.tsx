import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const AtoC = lazy(() => import("./A-C"));
const DtoL = lazy(() => import("./D-L"));
const MtoP = lazy(() => import("./M-P"));
const StoT = lazy(() => import("./S-T"));

export default () => <>
      <h1>SolidStrap Showcase</h1>
      <Link class="nav" href="/">
        Home
      </Link>
      <Link class="nav" href="/a-c">
        A-C
      </Link>
      <Link class="nav" href="/a-c">
        D-L
      </Link>
      <Link class="nav" href="/a-c">
        M-P
      </Link>
      <Link class="nav" href="/a-c">
        S-T
      </Link> 
      <Routes>
        <Route path="/a-c" element={<AtoC />} />
        <Route path="/d-l" element={<DtoL />} />
        <Route path="/m-p" element={<MtoP />} />
        <Route path="/s-t" element={<StoT />} />
      </Routes>
    </>