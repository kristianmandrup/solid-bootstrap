import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from '../components'

export default () => <div>
  <a href="https://reactstrap.github.io/?path=/docs/components-accordion--accordion">Accordion docs</a>
  <Accordion>
    <AccordionItem>
      <AccordionHeader targetId="item-1">Item 1</AccordionHeader>  
      <AccordionBody accordionId="item-1"></AccordionBody>
    </AccordionItem>  
    <AccordionItem>
      <AccordionHeader targetId="item-2">Item 2</AccordionHeader>  
      <AccordionBody accordionId="item-2"></AccordionBody>
    </AccordionItem>  
</Accordion>
</div>