
export default function Settings({numTeams, changeNumTeams, title, setTitle, desc, setDesc}) {

    function handleNumTeamChange(newVal) {
        if (!(newVal < 0)) { //Don't let there be less than 0 teams
            changeNumTeams(newVal);
        }
    }

    return (
        <div className={"settings"}>
            <div className={"settings-item"}>
                <h4>Number of Teams </h4>
                {/*TODO: change the number adjuster thing in CSS*/}
                {/*TODO: add a 'presets' dropdown which lets you pick any power of 2*/}
                <input value={numTeams} className={"settings-input num-teams-input"}
                       type={"number"}
                       onChange={e => {
                           handleNumTeamChange(e.target.valueAsNumber);
                       }}/>
            </div>
            {/*<div className={"settings-item"}>*/}
            {/*    <h4>Enhanced mode </h4>*/}
            {/*</div>*/}
            <div className={"settings-item"}>
                <h4>Bracket Name</h4>
                <input value={title} className={"settings-input title-input"}
                       placeholder={"Untitled Bracket"}
                       maxLength={25}
                       onChange={e => setTitle(e.target.value)}/>
            </div>
            <div className={"settings-desc"}>
                <h4 className={"desc-title"}>Description</h4>
                <textarea value={desc} className={"desc"}
                          maxLength={150}
                          onChange={e => setDesc(e.target.value)}/>
            </div>
        </div>
    )
}