
import {useState} from "react";

export default function TeamAddPanel({setTeams, teams}) {
    // const [teams, setTeams] = useState(parentTeams);
    const [userInput, setUserInput] = useState('');

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
        //TODO: Right now you need to call both parentCallback and setTeams to keep the data
        // consistent, should fix
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

    function resetTeams() {
        let nextTeams = [];
        setTeams(nextTeams);
    }

    return (
        <>
            <h2>Add Contestants</h2>
            <ul>
                {teams.map((team, i) => (
                    <div key={team.id}>
                        <li >
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
            <button onClick={() => resetTeams()}>Reset all teams</button>
            <br/>

        </>

    )
}