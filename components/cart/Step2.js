export default function Step2({ onPrevStep, onNextStep }) {
  return (
    <div>
      Contact details
      <button onClick={onPrevStep}>Previous</button>
      <button onClick={onNextStep}>Next</button>
    </div>
  );
}
