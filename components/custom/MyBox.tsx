import { twMerge } from "tailwind-merge";

interface MyBoxProps {
  slot: number;
  available?: boolean;
}

const MyBox: React.FC<MyBoxProps> = ({ slot, available }) => {
  return (
    <div
      className={twMerge(
        "w-40 h-40 relative ccc bg-gray b",
        available ? "b-green" : "b-red"
      )}
    >
      <p className={twMerge("t74", available ? "t-green" : "t-red")}>
        {available ? "Available" : "Not Available"}
      </p>
      <p className="t44 absolute top-2 left-1/2 -translate-x-1/2">
        Slot {slot}
      </p>
    </div>
  );
};

export default MyBox;
