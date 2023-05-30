import { Dispatch, SetStateAction } from "react";

interface GenderProps {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

export const Gender = ({ gender, setGender }: GenderProps) => {
    return (
        <div className="w-full">
           <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="inline-flex justify-between items-center rounded-md border border-gray-300 bg-transparent px-8 h-10 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue"
>

                <option value="" disabled>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="prefer not to say">Prefer not to say</option>
            </select>
        </div>
    );
};
