import './App.css';
import TeamAddPanel from "./TeamAddPanel"
import Bracket from "./BracketPanel";
import {useState} from "react";

// TODO:
//      -Fix bugs with going Bracket -> Add -> Bracket
//      -Have a "next matchup" button
//      -Format matchups automatically after user input
//      -Multiple rounds: after declaring winners of all matches, make new matches w/ those winners
function App() {
    //0 for TeamAddPanel, 1 for BracketPanel
    const [whichScreen, setWhichScreen] = useState(0);
    const [teams, setTeams] = useState([]);


    let handleCallback = (childData) => {
        setTeams(childData);
    };


    let content = (whichScreen === 1) ? <Bracket teams={teams} setTeams={setTeams} /> :
                 <TeamAddPanel setTeams={handleCallback} teams={teams}/>

    return (
        <>
            <h1>Luke's Bracket Maker</h1>
            {content}
            <button onClick={() => setWhichScreen((whichScreen + 1) % 2)}>{
                (whichScreen === 0) ? "Start bracket" : "Back to add teams"
            }</button>
        </>
    );
}



export default App;

