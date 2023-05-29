import { Dispatch, SetStateAction } from "react";

interface GenderProps {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

export const Gender = ({ gender, setGender }: GenderProps) => {
    return (
        <div className="w-full">
            <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                placeholder="Gender"
                className="text-black w-full p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner"
            />
        </div>
    );
};