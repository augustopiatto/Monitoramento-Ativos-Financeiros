interface SpacerInterface {
  size?: string;
}

function Spacer({ size = "h-[100px]" }: SpacerInterface) {
  return <div className={`${size}`}></div>;
}

export default Spacer;
