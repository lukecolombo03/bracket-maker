import { useState } from "react";

let alreadyStructured = false; //has to be outside or else it resets to false every time

export default function Bracket({ teams, setTeams }) {
    //NOTE: Parent (App) will not have accurate vote information since we don't pass it up
    const [matchups, setMatchups] = useState(teams);

    //tested and confirmed it works
    function structureTeams() {
        console.log("structuring teams: ", teams, alreadyStructured);
        if (alreadyStructured === false) {
            let nextMatchups = [];
            for (let i = 0; i < teams.length; i += 2) {
                let newMatch;
                if (teams[i + 1] === null) { //if this is the last team (doesn't have a partner)
                    newMatch = [teams[i], null];
                } else {
                    newMatch = teams.slice(i, i + 2); //slice is inclusive, exclusive
                }
                nextMatchups.push(newMatch);
            }
            setMatchups(nextMatchups);
            alreadyStructured = true;
        }
        else {
            alert("Teams already structured!");
        }
    }
    //TODO: can we call structureTeams() here? like instead of in the render line

    //only changes the (flat list) teams, not (structured list) matchups
    function addVote(teamIndex, matchIndex) {
        console.log("before adding vote: ", teams);
        let nextMatchups = matchups.map((match, i) => {
            match.map((team, j) => {
                if (j === teamIndex && i === matchIndex) {
                    team.votes++;
                }
                return team;
            })
            return match;
        })
        setMatchups(nextMatchups);
        console.log("after adding vote: ", teams);
    }

    //take the winners of the previous round and make them participants in next round
    function nextRound() {
        let nextTeams = matchups.map((match, i) => {
            return getWinner(match[0], match[1]);
        })
        console.log("next round:", nextTeams);
        setTeams(nextTeams); //call to Parent
        alreadyStructured = false; //want to restructure after this
    }

    //Takes in 2 teams (objects) and returns a String representing the winner
    //NOTE: right now it's hardcoded so that a match only works with 2 teams
    function getWinner(team1, team2) {
        if (team2 == null) { //use == here to check if its null or undefined
            return team1;
        }
        else if (team1.votes === team2.votes) {
            return null;
        } else if (team1.votes > team2.votes) {
            return team1;
        } else {
            return team2;
        }
    }

    // outer map loops through each match (list of 2 teams) in matchups
    // inner map loops through each team in that match
    let content = (!alreadyStructured) ?
        <p>Press "structure teams" to start</p> :
        <ul>
            {matchups.map((match, matchID) => (
                <li key={matchID}>
                    Match #{matchID}:
                    {match.map((team, teamID) => (
                        <ul key={teamID}>
                            <button onClick={() => addVote(teamID, matchID)}>{team.name}
                                votes: {team.votes}</button>
                        </ul>
                    ))}
                    {/*Render the winner's name, or a message if it's a tie (winner null)*/}
                    Winner: {(getWinner(match[0], match[1]) == null) ? "It's a tie!" :
                             (getWinner(match[0], match[1]).name)}
                </li>
            ))}
        </ul>

    //Displays a message if there's a winner
    function WinScreen() {
        if (teams.length === 1) {
            return <h2>Team {teams[0].name} has won!!</h2>
        }
    }



    return (
        <>
            <h2>Starting bracket!</h2>
            {content}
            <button onClick={() => structureTeams()}>Structure Teams</button>
            <button onClick={() => nextRound()}>Advance to next round</button>
            <WinScreen/>
        </>
    )
}