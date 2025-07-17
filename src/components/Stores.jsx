import PageHeader from "../ui-components/PageHeader";


export default function Stores() {

  return (
  <div className="flex flex-col gap-5 w-full">
  <PageHeader title="Mağazalar" />

  <div className="flex flex-col items-center justify-center gap-[15px] min-h-[100vh] bg-gray-50 mt-[50px] pt-[20px] pb-[100px] p-[5px] lg:px-6">
    <h1 className="text-2xl  text-blue-500 font-bold overflow-hidden whitespace-nowrap border-r-4 border-black animate-typewriter">
      Tezliklə...
    </h1>
  </div>

  <style>
    {`
      @keyframes typing {
        0% { width: 0 }
        40% { width: 30% }
        60% { width: 30% }
        100% { width: 0 }
      }

      @keyframes blink {
        50% { border-color: transparent }
        100% { border-color: blue }
      }

      .animate-typewriter {
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        border-right: 4px solid blue;
        width: 0;
        animation:
          typing 4s steps(12) infinite,
          blink 0.7s step-end infinite;
      }
    `}
  </style>
</div>
  );
}
