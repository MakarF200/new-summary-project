import Button from "@/components/ui/button";

export default function Card() {
  return (
    <>
      <div className="rounded-lg bg-white p-6 shadow-sm w-full h-full">
        <h3 className="text-lg font-semibold text-gray-900">is a card</h3>
        <div className="flex justify-end items-end">
          <Button />
        </div>
      </div>
    </>
  );
}
