import './TestPlatform.scss';

function TestPlatform ({height}){
    return(
        <div 
            className="test-platform" 
            style={{bottom: height}}>
        </div>
    )
}
export default TestPlatform