import { ReactElement } from "react";

type propsType = {
  icon?: ReactElement;
  title: string;
};

export default function Button({ icon, title }: propsType) {
  return (
    <button className="flex items-center space-x-2 hover:text-slate-100">
      {icon}
      <p>{title}</p>
    </button>
  );
}
