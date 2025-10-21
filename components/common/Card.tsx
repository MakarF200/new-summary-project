export default function Card() {
  return (
    <>
      <div className="rounded-lg bg-gray-200 p-6 shadow-sm border-2 border-gray-300 w-full h-full">
        <div className="flex flex-col items-center justify-center">
          <img src="https://picsum.photos/200/300" alt="card image" />
          <h2 className="text-center text-2xl font-bold -translate-x-0.5">
            is a card title
          </h2>
          <h4 className="text-center text-sm font-normal -translate-x-0.5">
            This is a description of the card, which completes the introduction
            of the card through AI abbreviations.
          </h4>
        </div>
      </div>
    </>
  );
}
