import FirstPage from './components/FirstPage';
import './App.css';
import SecondPage from './components/SecondPage';
import React from "react"

function App() {
  const [click, setClick] = React.useState(false)
  const renderSecondPage = () => {
    setClick(true)
  }

  return (
    <div className="App">
      {!click && <FirstPage renderSecondPage={renderSecondPage} />}
      {click && <SecondPage />}
    </div>
  );
}

export default App;
