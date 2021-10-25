# SolidStrap: SolidJS components for Bootstrap 5.x

This library is a port of ReactStrap to SolidJS.

The components are based on [reactstrap bootstrap 5 branch](https://github.com/reactstrap/reactstrap/blob/bootstrap5/src)

This is currently a WIP, attempting to port over [reactstrap](https://reactstrap.github.io/) for [Bootstrap 5.x](https://getbootstrap.com/docs/5.1) to [SolidJS](https://www.solidjs.com/)

## UI tags (WIP)

### Accordion

(Context error)

- `Accordion`
- `AccordionBody`
- `AccordionContext`
- `AccordionHeader`
- `AccordionItem`

### Alert

- `Alert` (works)

### Badge

- `Badge` (works)

### Breadcrumb

- `Breadcrumb` (works)
- `BreadcrumbItem` (works)

### Button

- `Button` (works)
- `ButtonDropdown`
- `ButtonGroup` (works)
- `ButtonToggle`
- `ButtonToolbar`

### Card

- `Card` (works)
- `CardBody` (works)
- `CardColumns`
- `CardDeck` (works)
- `CardFooter` (works)
- `CardGroup`
- `CardHeader` (works)
- `CardImg` (works)
- `CardImgOverlay`
- `CardLink` (works)
- `CardSubtitle` (works)
- `CardText` (works)
- `CardTitle` (works)

### Carousel

(Context error)

- `Carousel`
- `CarouselCaption`
- `CarouselContext`
- `CarouselControl`
- `CarouselItem`

### Dropdown

(Context error)

- `Dropdown`
- `DropdownItem`
- `DropdownMenu`
- `DropdownToggle`

### Form

- `Form`
- `FormFeedback`
- `FormGroup`

#### Input

- `Input` (works)
- `InputGroup` (works)
- `InputGroupText` (works)

#### Label

- `Label` (works)

### List

- `List` (works)
- `ListGroup`
- `ListGroupItem`
- `ListInLineItem`

### Media

- `Media` (works)

### Modal

- `Modal`
- `ModalBody`
- `ModalFooter`
- `ModalHeader`

### Navigation

#### Navbar

(Context error)

- `Navbar`
- `NavbarBrand`
- `NavbarText`
- `NavbarToggler`

#### Navs

- `Nav` (works)
- `NavItem` (works)
- `NavLink` (works)

### Off Canvas

- `Offcanvas`
- `OffcanvasBody`
- `OffcanvasHeader`

### Pagination

- `Pagination` (works)
- `PaginationItem` (works)
- `PaginationLink` (works)

### Placeholder

- `Placeholder`
- `PlaceholderButton`

### Popover

- `Popover`
- `PopoverBody`
- `PopoverHeader`

## Layout (Rows and Columns)

Class error

- `Row`
- `Col`

### Tabs

(Context error)

- `TabContent`
- `TabContext`
- `TabPane`

### Table

- `Table` (works)

### Toast notifications

- `Toast` ("partly" works)
- `ToastBody` ("partly" works)
- `ToastHeader` ("partly" works)

### Misc.

- `Portal`
- `Progress` (works)
- `Spinner` (works)
- `Tooltip`

### Uncontrolled

- `UncontrolledAccordion`
- `UncontrolledAlert`
- `UncontrolledButtonDropdown`
- `UncontrolledCarousel`
- `UncontrolledCollapse`
- `UncontrolledDropdown`
- `UncontrolledPopover`
- `UncontrolledTooltip`

## Component maturity status

Note that components using `popper`, `portal`, lifecycle methods and `useContext` are very much WIP

## Popper tags

React Popper tags ported to SolidJS are also included in this libary (WIP)

- `Popper`
- `Manager`

### Usage

```ts
import { Popper, Manager } from "solid-bootstrap/popper";
```

## Dependencies

- [solid-popper](https://libraries.io/npm/solid-popper)
- [solid-transition-group](https://libraries.io/npm/solid-transition-group)

## Usage

```tsx
import { Badge } from "solid-bootstrap/components";

const App = () => <Badge color="red" />;
```

## How it works

Reactstrap uses dynamic tags. Most components allow passing in a `tag` string property to override the default tag (often a `div`)

To achieve dynamic tags in SolidJs we use the `Dynamic` component

### Using Dynamic component

From the `solidjs` codebase:

> Renders an arbitrary custom or native component and passes the other props

```typescript
<Dynamic component={multiline() ? "textarea" : "input"} value={value()} />
```

### Adding Bootstrap 5.x

You can include the bootstrap CSS and Javascript bundles directly in your `index.html`

```html
<!-- bootstrap 5.1 CSS -->
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>
<!-- bootstrap 5.1 JS -->
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
  crossorigin="anonymous"
></script>
```

Sample `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Bootstrap CSS -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />

    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>

    <!-- Option 2: Separate Popper and Bootstrap JS -->
    <!--
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    -->
  </body>
</html>
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
