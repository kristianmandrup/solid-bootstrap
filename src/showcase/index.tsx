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
const DropdownDisplay = lazy(() => import("./DropdownDisplay"));
const FadeDisplay = lazy(() => import("./FadeDisplay"));
const FormDisplay = lazy(() => import("./FormDisplay"));
const InputGroupDisplay = lazy(() => import("./InputGroupDisplay"));
const ListDisplay = lazy(() => import("./ListDisplay"));
const ListGroupDisplay = lazy(() => import("./ListGroupDisplay"));
const MediaDisplay = lazy(() => import("./MediaDisplay"));
const ModalDisplay = lazy(() => import("./ModalDisplay"));
const NavbarDisplay = lazy(() => import("./NavbarDisplay"));
const NavsDisplay = lazy(() => import("./NavsDisplay"));
const PaginationDisplay = lazy(() => import("./PaginationDisplay"));
const PopoverDisplay = lazy(() => import("./PopoverDisplay"));
const ProgressDisplay = lazy(() => import("./ProgressDisplay"));
const SpinnerDisplay = lazy(() => import("./SpinnerDisplay"));
const TableDisplay = lazy(() => import("./TableDisplay"));
const TabDisplay = lazy(() => import("./TabDisplay"));
const ToastDisplay = lazy(() => import("./ToastDisplay"));
const TooltipDisplay = lazy(() => import("./TooltipDisplay"));

export default () => <>
      <h1>SolidStrap Showcase</h1>
      <Link class="nav" href="/">
        Home
      </Link>
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
        <Route path="/accordion" element={<AccordionDisplay />} />
        <Route path="/alert" element={<AlertDisplay />} />
        <Route path="/badge" element={<BadgeDisplay />} />
        <Route path="/breadcrumb" element={<BreadcrumbDisplay />} />
        <Route path="/button" element={<ButtonDisplay />} />        
        <Route path="/button-group" element={<ButtonGroupDisplay />} />
        <Route path="/card" element={<CardDisplay />} />
        <Route path="/carousel" element={<CarouselDisplay />} />
        <Route path="/collapse" element={<CollapseDisplay />} />
        <Route path="/dropdown" element={<DropdownDisplay />} />
        <Route path="/fade" element={<FadeDisplay />} />
        <Route path="/form" element={<FormDisplay />} />
        <Route path="/input-group" element={<InputGroupDisplay />} />
        <Route path="/list" element={<ListDisplay />} />
        <Route path="/list-group" element={<ListGroupDisplay />} />  
        <Route path="/media" element={<MediaDisplay />} />
        <Route path="/modal" element={<ModalDisplay />} />
        <Route path="/navbar" element={<NavbarDisplay />} />
        <Route path="/navs" element={<NavsDisplay />} />
        <Route path="/pagination" element={<PaginationDisplay />} />
        <Route path="/popover" element={<PopoverDisplay />} />
        <Route path="/progress" element={<ProgressDisplay />} />        
        <Route path="/spinner" element={<SpinnerDisplay />} /> 
        <Route path="/table" element={<TableDisplay />} />
        <Route path="/tab" element={<TabDisplay />} />        
        <Route path="/toast" element={<ToastDisplay />} />        
        <Route path="/tooltip" element={<TooltipDisplay />} />        
      </Routes>
    </>