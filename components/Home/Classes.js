import { useState } from "react";
import Banner from "./Banner";
import ClassType from "./ClassType";
import Title from "./Title";
import { classTypes } from "../api/classTypes";
export default function Classes() {
  const [state] = useState(classTypes);
  return (
    <>
      <Title />
      <Banner />
      <div
        className='classTypeButton maxWidthHold'
        style={{ marginTop: "40px" }}>
        {state.map((curElem) => {
          return (
            <ClassType
              key={curElem.id}
              test={<curElem.type />}
              clasName={curElem.typeName}
            />
          );
        })}
      </div>
    </>
  );
}
