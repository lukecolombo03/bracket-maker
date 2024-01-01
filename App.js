import './App.css';
import {useState} from "react";

//TODO:
//      -User input to choose teams
//      -Render a bunch of different matchups
//      -change conditional statement in style
function App() {
    return (
        <div className="App">
            <h1>Welcome to my app</h1>
            <ButtonList/>
        </div>
    );
}

let initialTeams = [
    {name: "Oklahoma", id: 1, votes: 0},
    {name: "California", id: 2, votes: 0},
    {name: "Oregon", id: 3, votes: 0},
    {name: "Hawaii", id: 4, votes: 0},
    {name: "Ohio", id: 5, votes: 0},
    {name: "Nebraska", id: 6, votes: 0},
    {name: "Georgia", id: 7, votes: 0},
    {name: "Texas", id: 8, votes: 0},
];

function ButtonList() {
    const [teams, setTeams] = useState(initialTeams);

    //teams is a list of dictionaries, so this must return a dictionary
    function handleClick(index) {
        const nextTeams = teams.map((team, i) => {
            if (i === index) {
                team.votes++;
                return team;
            } else {
                return team;
            }
        });
        setTeams(nextTeams);
    }

    //Add a new team based on data from child component (AddNewTeam)
    function handleNewTeam(childData) {
        const newTeam = {name: childData, votes: 0, id: teams[teams.length - 1].id + 1};
        const nextTeams = [teams, newTeam];
        setTeams(nextTeams);
        for (const team in teams) {
            console.log(team.name)
        }
    }

    const mostClicked = Math.max.apply(null, teams.map(team => team.votes));

    function isWinner(team) {
        return team.votes === mostClicked;
    }

    let winners = teams.filter(isWinner);
    let winnerDisplay;
    if (winners.length > 1) {
        winnerDisplay = "It's a tie!"
    } else {
        winnerDisplay = <ul>{winners.map((team, i) => (
            <li key={i}>{team.name}</li>))}</ul>
    }

    return (<>
        <h3>{teams[0].name} VS. {teams[1].name}</h3>
        <ul>
            {teams.map((team, i) => (
                <li key={i}>
                    <button onClick={() => handleClick(i)}
                            style={{
                                color: teams[i].votes === mostClicked ? 'blue' : 'gray'
                            }}> {teams[i].name} votes: {teams[i].votes}</button>
                </li>))} </ul>
        <h3>Winner(s): {winnerDisplay}</h3>
        <AddNewTeam parentCallback={handleNewTeam}/>
    </>);
}

function AddNewTeam({parentCallback}) {
    const [state, setState] = useState('')

    function handleSubmit() {
        parentCallback(state);
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

