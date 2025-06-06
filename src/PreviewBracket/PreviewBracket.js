import "./PreviewBracket.css";
import Matchup from "./Matchup";

/**
 * Takes in the data from one round and renders it, then recursively renders the next round.
 * The right side of the setup screen, giving a preview of what the bracket will look like.
 * @param roundData
 * @returns {JSX.Element|null}
 */

export default function PreviewBracket({bracket}) {

    // Renders the bracket recursively, turning each Match into a Matchup component
    function renderRound(roundData) {
        if (roundData == null || roundData.matches.length === 0) {
            return null;
        } else {
            let curRound = roundData.roundID;
            return (
                <>
                    <div className={"round"}>
                        {/*Generate actual matches*/}
                        {roundData.matches.map((match, index) => (
                            <Matchup key={index} team1={match.team1}
                                     team2={match.team2} className={curRound}/>))}
                    </div>
                    {renderRound(roundData.nextRound, curRound + 1)}
                </>
            )
        }
    }

    return (
        <div className={"tournament"}>
            {renderRound(bracket)}
        </div>

    )
}