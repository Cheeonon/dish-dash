import './Platform.scss';

function Platform ({height}){
    return(
        <div 
            className="test-platform" 
            style={{bottom: height}}>
        </div>
    )
}
export default Platform