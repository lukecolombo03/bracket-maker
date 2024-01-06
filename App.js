import './App.css';
import TeamAddPanel from "./TeamAddPanel"
import Bracket from "./BracketPanel";
import {useState} from "react";

//TODO:
//      -Store matchups as arrays within an array
//      -Have a "next matchup" button
//      -Format matchups automatically after user input
//      -Multiple rounds: after declaring winners of all matches, make new matches w/ those winners
function App() {
    //0 for TeamAddPanel, 1 for BracketPanel
    const [whichScreen, setWhichScreen] = useState(0)
    //TODO: Turn a flat array of teams into an array of matches, where a match is an array of 2
    // teams
    function partitionTeams() {
    }


    let content = (whichScreen === 1) ? <Bracket/> :
                 <TeamAddPanel />

    return (
        <>
            <h1>Welcome to my app</h1>
            {content}
            <button onClick={() => setWhichScreen((whichScreen + 1) % 2)}>{
                (whichScreen === 0) ? "Start bracket" : "Back to add teams"
            }</button>
        </>
    );
}





export default App;

