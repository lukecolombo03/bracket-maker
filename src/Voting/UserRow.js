import React, {useEffect} from "react";
import "./Voting.css";

// TODO: make the left/right buttons greyed out when everyone has voted
// Vote status:
// 0: neither selected. 1: left selected. 2: right selected
export default function UserRow({voterName, voteStatus, onClick, selected, locked}) {

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        function handleKeyDown(e) {

        }

        // Clean up listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    let leftBtnStyle = voteStatus === 1 ? "selected" : "unselected";
    let rightBtnStyle = voteStatus === 2 ? "selected" : "unselected";
    const voteBtnText = "+"
    const rowLockedStyle = locked ? "locked" : "";

    // When clicked, vote for team 1
    const leftButton = <button className={`vote-button ${leftBtnStyle} ${rowLockedStyle}`}
                               onClick={() => onClick(voterName, 1)}>{voteBtnText}</button>
    // When clicked, vote for team 2
    const rightButton = <button className={`vote-button ${rightBtnStyle} ${rowLockedStyle}`}
                                onClick={() => onClick(voterName, 2)}>{voteBtnText}</button>

    const voterNameSpan = <span className={"voter-name"}>{voterName}</span>

    let displayArray = [leftButton, voterNameSpan, rightButton] //default (no vote yet)
    if (voteStatus === 1) { //left button selected
        displayArray = [voterNameSpan, leftButton, rightButton]
    } else if (voteStatus === 2) { //right button selected
        displayArray = [leftButton, rightButton, voterNameSpan]
    }

    const selectedStyle = selected ? "voter-row-selected" : ""

    return (
        <div className={`voter-row ${selectedStyle}`}>
            <div className={"voter-col"}>
                {displayArray[0]}
            </div>
            <div className={"voter-middle"}>
                {displayArray[1]}
            </div>
            <div className={"voter-col"}>
                {displayArray[2]}
            </div>
        </div>
    )

}