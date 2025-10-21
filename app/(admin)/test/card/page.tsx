import Card from "@/components/common/Card";
import CardForm from "@/components/common/CardForm";

export default function CardPage() {
  return (
    <>
      <div className="flex items-center justify-center w-full p-10 border-b border-gray-200">
        <div className="w-1/3">
          <Card />
        </div>
      </div>
      <div className="flex items-center justify-center w-full p-10 border-b border-gray-200">
        <CardForm />
      </div>
    </>
  );
}
