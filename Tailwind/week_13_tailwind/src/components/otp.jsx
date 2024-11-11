import { useRef, useState } from "react";

export const OTP = ({number}) => {
  const refs = useRef([Array(number).fill(0)]);

  return (
    <>
      <div className="flex justify-center">
        {Array(number).fill(1).map((x,index)=>
            <OTPbox
                key={index}
                reference={(e)=>refs.current[index]=e} // Set current reference to current index 
                onDone={() => {
                    if(index+1==number){
                        return; // No next box for last box
                    }
                    refs.current[index+1].focus();
                    refs.current[index+1].value = "" // Delete value as you move ahead (optional safety measure, not neccessary)
                }}
                goBack={() => {
                    if(index==0){
                        refs.current[index].value = "" // Empty current box (goBack pressed on first box should empty the box)
                        return; // No back box for first box
                    }
                    refs.current[index-1].focus();
                    refs.current[index-1].value = "" // Delete value as you move back (important safety measure)
                }}
            />
        )}
      </div>
    </>
  );
};


function OTPbox({reference, onDone, goBack }) {

    const [inputBoxVal, setInputBoxVal] = useState("")

  return (
    <div>
      <input
        value={inputBoxVal} // Explicitly control the input value
        ref={reference}
        onKeyUp={(e) => {
          if (e.key == "Backspace") {
            goBack();
          }
        }}
        onChange={(e) => {
          const val = e.target.value;

          // Check if the input is numeric
          if (/^\d*$/.test(val)) {
            // Only update state if value is numeric
            setInputBoxVal(val);
            if (val) onDone();
          } else {
            console.log("Non-numeric input"); // Log non-numeric input
          }
        }}
        type="text"
        className="w-[40px] h-[50px] rounded-2xl bg-blue-100 text-white text-center m-1 outline-none"
      />
    </div>
  );
}
