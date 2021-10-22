import { lazy } from "solid-js";
import { Routes, Route, Link } from "solid-app-router";

const AccordionDisplay = lazy(() => import("./AccordionDisplay"));
const AlertDisplay = lazy(() => import("./AlertDisplay"));
const BadgeDisplay = lazy(() => import("./BadgeDisplay"));
const BreadcrumbDisplay = lazy(() => import("./BreadcrumbDisplay"));
const ButtonDisplay = lazy(() => import("./ButtonDisplay"));
const ButtonGroupDisplay = lazy(() => import("./ButtonGroupDisplay"));
const CardDisplay = lazy(() => import("./CardDisplay"));
const CarouselDisplay = lazy(() => import("./CarouselDisplay"));
const CollapseDisplay = lazy(() => import("./CollapseDisplay"));
const DtoL = lazy(() => import("./D-L"));
const MtoP = lazy(() => import("./M-P"));
const StoT = lazy(() => import("./S-T"));

export default () => <>
      <h3>A-C</h3>
      <Link class="nav" href="/accordion">
        Accordion
      </Link>
      <Link class="nav" href="/alert">
        Alert
      </Link>
      <Link class="nav" href="/badge">
        Badge
      </Link>
      <Link class="nav" href="/breadcrumb">
        Breadcrumb
      </Link>
      <Link class="nav" href="/button">
        Button
      </Link>
      <Link class="nav" href="/button-group">
        Button Group
      </Link>
      <Link class="nav" href="/card">
        Card
      </Link>
      <Link class="nav" href="/card">
        Carousel
      </Link>
      <Link class="nav" href="/collapse">
        Collapse
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
        <Route path="/accordion" element={<AccordionDisplay />} />
        <Route path="/alert" element={<AlertDisplay />} />
        <Route path="/badge" element={<BadgeDisplay />} />
        <Route path="/breadcrumb" element={<BreadcrumbDisplay />} />
        <Route path="/button" element={<ButtonDisplay />} />        
        <Route path="/button-group" element={<ButtonGroupDisplay />} />
        <Route path="/card" element={<CardDisplay />} />
        <Route path="/carousel" element={<CarouselDisplay />} />
        <Route path="/collapse" element={<CollapseDisplay />} /> 
        <Route path="/d-l" element={<DtoL />} />
        <Route path="/m-p" element={<MtoP />} />
        <Route path="/s-t" element={<StoT />} />
      </Routes>
    </>