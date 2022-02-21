import './App.css';
import {Routes,Route} from "react-router-dom";
import {HomeR} from "./component/HomeR";
import {MainTestPage} from "./component/QuestionAns/MainTestPage";
import {Register} from "./component/Register";
import Result from './component/result/Result';

function App() {
  const resultMap = new Map();
  return (  
   <Routes>
     <Route path='/' element={<HomeR/>} />
     <Route path='register' element={<Register/>}/>
     <Route path='main' element= {<MainTestPage level={"One"} resultMap={resultMap}/>} />
     <Route path='result' element= {<Result/>} />
   </Routes>

  );
}

export default App;
