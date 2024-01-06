export default function Bracket() {

    //outerIndex: a match's index inside the array matchups
    //innerIndex: a team's index inside a single match (should only be 0 or 1)
    // function handleClick(innerIndex, outerIndex) {
    //     let nextMatchups = matchups.map((match, i) => {
    //                                         match.map((team, j) => {
    //                                             if (j === innerIndex && i === outerIndex) {
    //                                                 team.votes++;
    //                                             }
    //                                             return team;
    //                                         })
    //                                         return match;
    //                                     }
    //     )
    //     setMatchups(nextMatchups);
    // }

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
    // return (<>
    //     <ul> {matchups.map((match, i) => (
    //         <>
    //             {match.map((team, j) => (
    //                 <>
    //                     <li key={j}>
    //                         <button onClick={() => handleClick(j, i)}>
    //                             {match[j].name} votes: {match[j].votes}
    //                         </button>
    //                     </li>
    //
    //                 </>
    //             ))}
    //             <h3 key={i}>
    //                 Winner: {getWinner(match[0], match[1])}
    //             </h3>
    //         </>
    //     ))} </ul>
    //     {/*<NewTeamForm parentCallback={handleNewTeam}/>*/}
    // </>);
    return (
        <h3>Hiiiii</h3>
    )
}