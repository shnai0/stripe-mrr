import { Dispatch, SetStateAction } from "react";

interface SubjectProps {
    subject: string;
    setSubject: Dispatch<SetStateAction<string>>;
}

export const Subject = ({ subject, setSubject }: SubjectProps) => {
    return (
        <div className="w-full">
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject and grade"
                className="text-black w-full p-2 text-s bg-white border border-gray-300 rounded-md shadow-inner"
            />
        </div>
    );
};