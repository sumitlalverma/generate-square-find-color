import './App.css';
import SquareGenerator from './SquareGenerator';

function App() {
  return (
    <div className="App">
      <SquareGenerator width={5} height={5} numColors={3} />
    </div>
  );
}

export default App;
