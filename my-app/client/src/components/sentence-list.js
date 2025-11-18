import { useState } from "react";

function SentenceList({ currentSentence }) {
  const [sentenceList, setSentenceList] = useState({
    0: {
      name: "Test 1",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    1: {
      name: "Test 2",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
  });

  // Function to toggle the isOptionOpened field for a specific key (e.g., "0" or "1")
  const toggleOption = (keyToUpdate) => {
    setSentenceList((prevList) => ({
      ...prevList, // Copy the existing sentenceList object
      [keyToUpdate]: {
        // Access the specific key using bracket notation
        ...prevList[keyToUpdate], // Copy the properties of the inner object
        isOptionOpened: !prevList[keyToUpdate].isOptionOpened, // Toggle the boolean value
      },
    }));
  };

  return (
    <>
      <div className="p-10 [&>*]:text-xs [&>*]:sm:text-base">
        <div className=" w-full grid gap-1">
          <div className="p-1">
            <h5>Sentence List</h5>
          </div>
          <div>Current Sentence : ABCSDEF</div>
          <div className="flex justify-center gap-2 p-1">
            <button className="bg-amber-700 w-fit h-fit f p-1 rounded-1">
              ⟳ Refresh
            </button>
            {/* <button className="bg-amber-900 w-fit h-fit f p-1 rounded-1">
              ⇓ Load
            </button> */}
          </div>
          <div className="grid gap-1">
            {Object.keys(sentenceList).map((value, index) => (
              <div className="flex w-full gap-2">
                <button
                  key={index}
                  className="bg-yellow-800 hover:bg-yellow-600 w-[70%] rounded-1 "
                >
                  {sentenceList[value].name} : {sentenceList[value].description}{" "}
                  | Sentence : {sentenceList[value].sentence}
                </button>

                {sentenceList[value].isOptionOpened ? (
                  <>
                    <button className="bg-amber-900 w-[10%] h-fit f p-1 rounded-1">
                      ⇓ Load
                    </button>
                    <button className="bg-red-800 hover:bg-red-600 place-self-end w-[10%] h-full rounded-1 ">
                      ✖ Delete
                    </button>
                    <button
                      className="w-[10%] bg-gray-900"
                      onClick={() => {
                        toggleOption(value);
                      }}
                    >
                      ⋮
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="w-[30%] bg-gray-900"
                      onClick={() => {
                        toggleOption(value);
                      }}
                    >
                      ⋮
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SentenceList;
