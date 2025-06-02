interface Props {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  optional?: boolean;
}

interface NumberProps {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  optional?: boolean;
}

export function TextBox({ label, value, setValue, optional }: Props) {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block float-left text-lg font-medium mb-1"
      >
        {label}
        {optional ? " (Optional)" : ""}
      </label>
      <input
        type="text"
        id={label}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export function NumberBox({ label, value, setValue, optional }: NumberProps) {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block text-lg font-medium float-left mb-1"
      >
        {label}
        {optional ? " (Optional)" : ""}
      </label>
      <input
        type="number"
        id={label}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </div>
  );
}
