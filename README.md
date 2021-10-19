# SolidJS Bootstrap 5

Bootstrap 5 JSX tags for SolidJS (WIP)

This effort is based on [reactstrap bootstrap 5 branch](https://github.com/reactstrap/reactstrap/blob/bootstrap5/src) via [solid-styled-jsx](https://www.npmjs.com/package/solid-styled-jsx)

This is currently an experiment in the feasibility of porting over [reactstrap](https://reactstrap.github.io/) for [Bootstrap 5.x](https://getbootstrap.com/docs/5.1) to [SolidJS](https://www.solidjs.com/)

## UI tags (WIP)

- Accordion
- AccordionBody
- AccordionContext
- AccordionHeader
- AccordionItem
- Alert
- Badge
- Breadcrumb
- BreadcrumbItem
- Button
- ButtonDropdown
- ButtonGroup
- ButtonToggle
- ButtonToolbar
- Card
- CardBody
- CardColumns
- CardDeck
- CardFooter
- CardGroup
- CardHeader
- CardImg
- CardImgOverlay
- CardLink
- CardSubtitle
- CardText
- CardTitle
- Carousel
- CarouselCaption
- CarouselContext
- CarouselControl
- CarouselItem
- Dropdown
- DropdownItem
- DropdownMenu
- DropdownToggle
- Form
- FormFeedback
- FormGroup
- Input
- InputGroup
- InputGroupText
- Label
- List
- ListGroup
- ListGroupItem
- ListInLineItem
- Media
- ModalBody
- ModalFooter
- ModalHeader
- Nav
- Navbar
- NavbarBrand
- NavbarText
- NavbarToggler
- NavItem
- NavLink
- Offcanvas
- OffcanvasBody
- OffcanvasHeader
- Pagination
- PaginationItem
- PaginationLink
- Portal

Note that all components using `solid-popper` are very much incomplete and WIP

## Dependencies

- [solid-popper](https://libraries.io/npm/solid-popper)
- [solid-transition-group](https://libraries.io/npm/solid-transition-group)

## Usage

```tsx
import { Badge } from "solid-bootstrap/components";

const App = () => <Badge color="red" />;
```

## Install

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
