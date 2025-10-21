const testMap = {
  title: "Title",
  description: "Description",
  image: "Image",
  link: "Link",
  button: "Button",
  input: "Input",
  textarea: "Textarea",
  select: "Select",
  checkbox: "Checkbox",
  radio: "Radio",
};

export default function CardForm() {
  return (
    <>
      <div className="grid grid-cols-3">
        {Object.entries(testMap).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col gap-2 border border-gray-200 rounded-md p-2"
          >
            <label htmlFor={key}>{value}</label>
            <input type={key} id={key} />
          </div>
        ))}
      </div>
    </>
  );
}
