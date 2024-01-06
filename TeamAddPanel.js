//Array of matchups
//A single matchup is an array of two teams (represented as objects)
import {useState} from "react";

let initialTeams = [];

export default function TeamAddPanel() {
    const [teams, setTeams] = useState(initialTeams);
    const [userInput, setUserInput] = useState('')

    //Add a new team based on data from child component (AddNewTeam)
    //TODO: let users drag to reorder the teams/pick their matchups
    function handleNewTeam(newNameRequest) {
        //check if name is already taken
        let nameTaken = false;
        for (const team of teams) {
            if (team.name === newNameRequest) {
                nameTaken = true;
                alert("Name already taken!") //could change this so it's less in your face
            }
        }
        //add new team to teams
        if (!nameTaken) {
            let newID = (teams.length === 0) ? 0 : teams[teams.length - 1].id + 1;
            const newTeam = {name: newNameRequest, id: newID, votes: 0};
            const nextTeams = [...teams, newTeam];
            setTeams(nextTeams);
        }
    }

    //given a team index, move that team up (closer to start) in the array
    //upOrDown will be TRUE if moving up, FALSE if moving down
    //TODO: when a team is at the top and you click move up, it goes down one
    function moveTeam(team, index, upOrDown) {
        let nextIndex = (upOrDown) ? index - 1 : index + 1;
        let filtered = teams.filter(t => t.id !== team.id);
        let nextTeams = [
            ...filtered.slice(0, nextIndex), team, ...filtered.slice(nextIndex)
        ];
        setTeams(nextTeams);
    }

    function handleSubmit(event) {
        event.preventDefault();
        handleNewTeam(userInput);
        setUserInput("")
    }

    function unflattenTeams() {
        console.log(teams);
        let newTeams = teams;
        for (let i = 0; i < teams.length - 1; i++) {
            let newMatch = [newTeams.slice(i, i + 1)]
            newTeams = [...newTeams, newMatch]
        }
        console.log(newTeams)
    }

    return (
        <>
            <h2>Add Contestants</h2>
            <ul>
                {teams.map((team, i) => (
                    <div>
                        <li key={team.id}>
                            {i + 1}. {team.name}
                        </li>
                        <button onClick={() => moveTeam(team, i, true)}>Move up</button>
                        <button onClick={() => moveTeam(team, i, false)}>Move down</button>
                    </div>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>Add new: {" "}
                    <input type={"text"} value={userInput} onChange={event => {
                        setUserInput(event.target.value)
                    }}/>
                </label>
                <input type={"submit"} value={"Submit"}/>
            </form>
            <button onClick={() => unflattenTeams()}>Unflatten teams (view in console)</button>
            <br/>

        </>

    )
}