import { useEffect, useState } from "react";

function SentenceTempData({}) {
  const token = localStorage.getItem("token");
  const [sentence, setSentence] = useState();

  const refreshSentence = async () => {
    try {
      const res = await fetch("sentence", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        const listSentence = [];
        data.sentence.forEach((element) => {
          listSentence.push(element.sentence);
        });
        setSentence([listSentence]);
        console.log("Succesfully Refreshing Data");
        console.log(data.sentence);
      } else {
        console.log("Failed Refreshing Data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>{sentence ? sentence : "No sentence loaded yet"}</p>
      <button onClick={refreshSentence}>Refresh Sentence</button>
    </div>
  );
}

export default SentenceTempData;
