
export default function QuizComponent (props) {
    const renderOptions = props.options.map(option => {
        let colorClass;
        switch(option.isHeld){
            case 0: colorClass= "options"; break;
            case 1: colorClass= "coloredOption"; break;
            case 2: colorClass= "greenOption"; break;
            case 3: colorClass= "redOption"; break;
            default: colorClass = "";
        }
        return <a className={colorClass} key={option.id} onClick={()=>props.handleClick(props.id, option.id)}>{option.value}</a>
    })
    return(
        <div className="quiz--component">
            <a className="question">{props.question}</a>
            <div className="options-container" >
                {renderOptions}
            </div>
            <hr />
        </div>
    )
}