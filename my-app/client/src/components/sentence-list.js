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
    2: {
      name: "Test 3",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    3: {
      name: "Test 4",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    4: {
      name: "Test 4",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    5: {
      name: "Test 5",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    6: {
      name: "Test 6",
      description: "ABC",
      sentence: "ABC{}",
      isOptionOpened: false,
    },
    7: {
      name: "Test 7",
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
      <div className="sm:p-10 p-2 [&>*]:text-xs [&>*]:sm:text-base">
        <div className=" w-full flex flex-col gap-1">
          <div className="p-1 flex w-full border-b h-full">
            <div className="p-1 w-[80dvh]">
              <h5>Sentence List</h5>
            </div>
            <button className="bg-amber-700 w-[10dvh] h-full p-1 rounded-1 sm:h-full">
              ⟳
            </button>
          </div>
          {/* <div>Current Sentence : ABCSDEF</div> */}
          <div className="flex justify-center gap-2 p-1">
            {/* <button className="bg-amber-900 w-fit h-fit f p-1 rounded-1">
              ⇓ Load
            </button> */}
          </div>
          <div className="grid gap-1 max-h-[20dvh] overflow-y-scroll h-full  max-w-[100%]">
            {Object.keys(sentenceList).map((value, index) => (
              <div className="flex w-full gap-2">
                <button
                  key={index}
                  className="bg-yellow-800 hover:bg-yellow-600 w-full rounded-1 p-1 overflow-hidden"
                >
                  {sentenceList[value].name} : {sentenceList[value].description}{" "}
                  | Sentence : {sentenceList[value].sentence}
                </button>
                <button className="bg-amber-900 w-fit h-full f p-1 rounded-1">
                  ⇓ Load
                </button>

                {sentenceList[value].isOptionOpened ? (
                  <>
                    <button className="bg-red-800 hover:bg-red-600 place-self-end w-full h-full rounded-1 p-1">
                      ✖ Delete
                    </button>
                    <button
                      className="w-full bg-gray-900 p-1"
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
                      className="w-[10%] bg-gray-900 p-1"
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
