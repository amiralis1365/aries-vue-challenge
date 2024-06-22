import RiskRewardGraph from "./components/RiskRewardGraph";
import "./App.css";
import { sampleData } from "./components/sampleData";

function App() {
  return (
    <div>
      <h1>Options Profit Calculator</h1>
      <RiskRewardGraph data={sampleData} />
    </div>
  );
}

export default App;
