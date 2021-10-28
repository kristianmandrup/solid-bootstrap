import { createSignal } from "solid-js";
import { Button, Tooltip } from "../components";

const TooltipItem = (props: any) => {
  const { item, id } = props;
  const [tooltipOpen, setTooltipOpen] = createSignal(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <div style="margin: 0.2em">
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
    </div>
  );
};

export default () => {
  return (
    <>
      <a href="https://reactstrap.github.io/components/tooltips/">Tooltips</a>
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