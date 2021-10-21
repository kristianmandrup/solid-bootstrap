import { createSignal } from "solid-js";
import { Button, Tooltip } from "../components";

const TooltipItem = (props: any) => {
  const { item, id } = props;
  const [tooltipOpen, setTooltipOpen] = createSignal(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <span>
      <Button className="mr-1" color="secondary" id={"Tooltip-" + id}>
        {item.text}
      </Button>
      <Tooltip
        placement={item.placement}
        isOpen={tooltipOpen()}
        target={"Tooltip-" + id}
        toggle={toggle}
      >
        Tooltip Content!
      </Tooltip>
    </span>
  );
};

export default () => {
  return (
    <>
      {[
        {
          placement: "top",
          text: "Top"
        },
        {
          placement: "bottom",
          text: "Bottom"
        },
        {
          placement: "left",
          text: "Left"
        },
        {
          placement: "right",
          text: "Right"
        }
      ].map((tooltip, i) => {
        return <TooltipItem key={i} item={tooltip} id={i} />;
      })}
    </>
  );
};