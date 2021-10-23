import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const SpinnerDisplay = lazy(() => import("./SpinnerDisplay"));
const TableDisplay = lazy(() => import("./TableDisplay"));
const TabDisplay = lazy(() => import("./TabDisplay"));
const ToastDisplay = lazy(() => import("./ToastDisplay"));
const TooltipDisplay = lazy(() => import("./TooltipDisplay"));

export default () => <>
  <h3>S-T</h3>
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
    <Route path="/spinner" element={<SpinnerDisplay />} /> 
    <Route path="/table" element={<TableDisplay />} />
    <Route path="/tab" element={<TabDisplay />} />        
    <Route path="/toast" element={<ToastDisplay />} />        
    <Route path="/tooltip" element={<TooltipDisplay />} />        
  </Routes>
</>