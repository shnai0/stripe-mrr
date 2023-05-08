import { Dispatch, SetStateAction } from "react";

interface NameProps {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
}

export const Name = ({ name, setName }: NameProps) => {
    return (
        <div className="w-full">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter the name here"
                className="text-black w-full p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner"
            />
        </div>
    );
};