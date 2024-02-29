export default function Step1({ onNextStep }) {
  return (
    <div>
      Review cart
      <button onClick={onNextStep}>Next</button>
    </div>
  );
}
