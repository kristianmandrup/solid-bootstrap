import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from '../components'

export default () => <Accordion>
    <AccordionItem>
      <AccordionHeader targetId="item-1">Item 1</AccordionHeader>  
      <AccordionBody accordionId="item-1"></AccordionBody>
    </AccordionItem>  
    <AccordionItem>
      <AccordionHeader targetId="item-2">Item 2</AccordionHeader>  
      <AccordionBody accordionId="item-2"></AccordionBody>
    </AccordionItem>  
</Accordion>