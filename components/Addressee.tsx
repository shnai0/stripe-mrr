import { Dispatch, SetStateAction } from "react";

interface AddresseeProps {
    addressee: string;
    setAddressee: Dispatch<SetStateAction<string>>;
}

export const Addressee = ({ addressee, setAddressee }: AddresseeProps) => {
    return (
        <div className="w-full">
           <select
    value={addressee}
    onChange={(e) => setAddressee(e.target.value)}
    className="inline-flex justify-between items-center rounded-md border border-gray-300 bg-transparent px-8 h-10 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue"
>

                <option value="" disabled>Select your addressee</option>
                <option value="male">Parent</option>
                <option value="female">Student</option>
                <option value="non-binary">1-st Person</option>
                <option value="prefer not to say">2nd-Person</option>
                <option value="prefer not to say">3rd-Person</option>
            </select>
        </div>
    );
};
