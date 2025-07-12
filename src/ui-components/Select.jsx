import { useState } from "react";

export default function Select({ defaultName, data, onClick}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value) => {
    setOpen(false);
    onClick?.(value);
  };


  return (
    <div className="flex flex-col gap-[5px]">
      <div
        onClick={() => setOpen(!open)}
        className="border-[2px] text-[#666666] text-[15px] border-[#f7f7f7] h-[40px] p-[5px] rounded-[5px] cursor-pointer"
      >
        {defaultName}
      </div>

      <div
        className={`${
          open ? "flex flex-col" : "hidden"
        } noscroll border-[2px] h-[300px] overflow-y-scroll border-[#f7f7f7] p-[5px] rounded-[5px]`}
      >
        {data?.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="text-[#a9a9a9] list-none h-[35px] hover:bg-[#f7f7f7] flex items-center p-[5px] rounded-[5px]"
            >
              {item}
            </li>
          );
        })}
      </div>
    </div>
  );
}
