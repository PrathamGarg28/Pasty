import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [lines, setLines] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams(); // Destructure useSearchParams
  const pasteId = searchParams.get("pasteId"); // Get pasteId from the search params
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const handleTextChange = (e) => {
    const content = e.target.value;
    setValue(content); // Update the textarea value
    const newLines = content.split("\n").length; // Count number of new lines
    setLines(newLines); // Update the number of lines
  };

  // Render line numbers dynamically based on the number of lines
  const renderLineNumbers = () => {
    let lineNumbers = [];
    for (let i = 1; i <= lines; i++) {
      lineNumbers.push(<div key={i}>{i}</div>);
    }
    return lineNumbers;
  };

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // If pasteId is present, update the paste
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");

    // Remove the pasteId from the URL after creating/updating a paste
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
    // navigate("/");
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="bg-slate-500 min-h-screen w-screen">
      <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="flex flex-col gap-y-5 items-start">
          <div className="w-full flex flex-row gap-x-4 justify-between items-center">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              // Dynamic width based on whether pasteId is present
              className={`${
                pasteId ? "w-[80%]" : "w-[85%]"
              } text-black border border-input rounded-md p-2`}
            />
            <button
              className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 lg:font-sm  dark:bg-slate-600 dark:hover:bg-slate-700"
              onClick={createPaste}
            >
              {pasteId ? "Update Paste" : "Create My Paste"}
            </button>

            {pasteId && (
              <button
                className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={resetPaste}
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>

          <div
            className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
          >
            <div
              className={`w-full bg-white rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
            >
              <div className="w-full flex gap-x-[6px] items-center select-none group ">
                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

                <div
                  className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
                />

                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
              </div>
              {/* Circle and copy btn */}
              <div
                className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
              >
                {/*Copy  button */}
                <button
                  className={`flex justify-center items-center text-slate -700 transition-all duration-300 ease-in-out group`}
                  onClick={() => {
                    navigator.clipboard.writeText(value);
                    toast.success("Copied to Clipboard", {
                      position: "top-right",
                    });
                  }}
                >
                  <Copy className="group-hover:text-sucess-500 text-slate-500" size={20} />
                </button>
              </div>
            </div>

            {/* TextArea */}
            <div className="w-full flex">
              <div className="flex">
                <div
                  id="line-numbers"
                  className="w-8 bg-neutral-2 dark:bg-black  rounded-bl-md dark:text-white text-right pr-2 text-sm pt-2 max-h-[620px] overflow-auto border border-r-0 border-input scrollbar-hide"
                >
                  {renderLineNumbers()}
                </div>
              </div>
              <textarea
                className="flex min-h-[80px] text-white rounded-br  border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 bg-neutral-2 dark:bg-black w-full border-l-0 rounded-l-none focus-visible:ring-0"
                placeholder="Write Your Content Here...."
                rows="25"
                value={value} // Controlled input with value from state
                onChange={handleTextChange} // Handle content and line number change
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
