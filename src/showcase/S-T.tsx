import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const AtoC = lazy(() => import("./A-C"));
const DtoL = lazy(() => import("./D-L"));
const MtoP = lazy(() => import("./M-P"));
const SpinnerDisplay = lazy(() => import("./SpinnerDisplay"));
const TableDisplay = lazy(() => import("./TableDisplay"));
const TabDisplay = lazy(() => import("./TabDisplay"));
const ToastDisplay = lazy(() => import("./ToastDisplay"));
const TooltipDisplay = lazy(() => import("./TooltipDisplay"));

export default () => <>
  <h3>S-T</h3>
  <Link class="nav" href="/a-c">
  A-C
  </Link>      
  <Link class="nav" href="/d-l">
  D-L
  </Link>      
  <Link class="nav" href="/m-p">
  M-P
  </Link>      
  <Link class="nav" href="/spinner">
  Spinner
  </Link>      
  <Link class="nav" href="/table">
  Table
  </Link>      
  <Link class="nav" href="/tab">
  Tab
  </Link>      
  <Link class="nav" href="/toast">
  Toast
  </Link>      
  <Link class="nav" href="/tooltip">
  Tooltip
  </Link>    
  <Routes>
    <Route path="/a-c" element={<AtoC />} /> 
    <Route path="/d-l" element={<DtoL />} /> 
    <Route path="/m-p" element={<MtoP />} /> 
    <Route path="/spinner" element={<SpinnerDisplay />} /> 
    <Route path="/table" element={<TableDisplay />} />
    <Route path="/tab" element={<TabDisplay />} />        
    <Route path="/toast" element={<ToastDisplay />} />        
    <Route path="/tooltip" element={<TooltipDisplay />} />        
  </Routes>
</>