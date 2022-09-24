import "./LeaderboardPage.scss";
import { getTopScores } from "../../utils/axios";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

const LeaderboardPage = () => {
    const [topScores, setTopScores] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getTopScores()
            .then((resolve) => {
                setTopScores(resolve.data.topScores);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!topScores) {
        return <h1>Loading...</h1>;
    }

    const handleBack = () => {
        navigate(-1);
      };
 
    return (
        <div className="leaderboard">
            <span onClick={handleBack} className="leaderboard__back"></span>
            <div className="leaderboard__bg">
                <div className="leaderboard__content">
                    <h1 className="leaderboard__title">Leaderboard</h1>
                    <ul className="leaderboard__list">
                        <li className="leaderboard__item">
                            <span className="leaderboard__user-name leaderboard__subtitle">User Name</span>
                            <span className="leaderboard__score leaderboard__subtitle">Score</span>
                        </li>
                        {topScores.map((score, index) => {
                            return (
                            <li className="leaderboard__item">
                                {index === 0 && <span className="leaderboard__icon">🥇</span>}
                                {index === 1 && <span className="leaderboard__icon">🥈</span>}
                                {index === 2 &&  <span className="leaderboard__icon">🥉</span>}
                                <span className="leaderboard__user-name">{score.userName}</span>
                                <span className="leaderboard__score">{score.score}</span>
                            </li>
                        )})}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
