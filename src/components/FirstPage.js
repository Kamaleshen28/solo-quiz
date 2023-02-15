export default function FirstPage (props) {
    return(
        <div className="firstpage">
            <div>
                <h3>Quizzcal</h3>
                <a>Some description if needed</a>
            </div>
            <div>
            <button className="start--quiz--button" onClick= {props.renderSecondPage} >Start quiz</button>
            </div>
            
        </div>
    )
}