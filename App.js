import './App.css';
import {useState} from "react";

//TODO:
//      -Store matchups as arrays within an array
//      -Have a "next matchup" button
//      -Format matchups automatically after user input
//      -Multiple rounds: after declaring winners of all matches, make new matches w/ those winners
function App() {
    return (
        <>
            <h1>Welcome to my app</h1>
            <Bracket/>
        </>
    );
}

//Array of matchups
//A single matchup is an array of two teams (represented as objects)
//TODO: handle empty arrays
let initialTeams = [
    [{name: "Jake", id: 0, votes: 0}, {name: "Cole", id: 1, votes: 0}],
    [{name: "Aidan", id: 0, votes: 0}, {name: "Zach", id: 1, votes: 0}]
];

function Bracket() {
    const [matchups, setMatchups] = useState(initialTeams);


    function handleClick(index) {
        let nextMatchups = []
        for (let match of matchups) {
            nextMatchups.push(match.map((team, i) => {
                if (i === index) {
                    team.votes++;
                    return team;
                } else {
                    return team;
                }
            }));
        }
        console.log(nextMatchups);
        setMatchups(nextMatchups);
    }

    //Add a new team based on data from child component (AddNewTeam)
    // function handleNewTeam(childData) {
    //     let newID = (teams.length === 0) ? 0 : teams[teams.length - 1].id + 1;
    //     const newTeam = {name: childData, id: newID, votes: 0};
    //     const nextTeams = [...teams, newTeam];
    //     setTeams(nextTeams);
    // }
    let winnerDisplay;
    let teamDisplay;
    //Takes in 2 teams (objects) and returns a String representing the winner
    //NOTE: does not work if it returns an object
    //NOTE: right now it's hardcoded so that a match only works with 2 teams
    function getWinner(team1, team2) {
        if (team1.votes === team2.votes) {
            return "It's a tie!";
        } else if (team1.votes > team2.votes) {
            return team1.name;
        } else {
            return team2.name;
        }
    }
    //outer map loops through each match (list of 2 teams) in matchups
    //inner map loops through each team in that match

    //another way to get winner is to loop through each match in matchups,
    // get the highest vote count in each, then compare each team to the highest vote count
    // in its own match
    teamDisplay = matchups.map((match, i) => (
        <>
            {match.map((team, i) => (
                <>
                    <li key={i}>
                        <button onClick={() => handleClick(i)}>
                            {match[i].name} votes: {match[i].votes}
                        </button>
                    </li>

                </>
            ))}
            <h3>
                Winner: {getWinner(match[0], match[1])}
            </h3>
        </>
    ))

    return (<>
        <ul> {teamDisplay} </ul>
        {/*<NewTeamForm parentCallback={handleNewTeam}/>*/}
    </>);
}

function NewTeamForm({parentCallback}) {
    const [state, setState] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
        parentCallback(state);
        setState('')
    }

    return <form onSubmit={handleSubmit}>
        <label>Add new: <spacer/>
            <input type={"text"} value={state} onChange={event => {
                setState(event.target.value)
            }}/>
        </label>
        <input type={"submit"} value={"Submit"}/>
    </form>;

}

export default App;

