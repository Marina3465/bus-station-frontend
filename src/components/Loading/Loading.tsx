import { FC } from "react";
import st from './Loading.module.css';

interface LoadingProps {

}

const Loading: FC<LoadingProps> = () => {
    return (
        <div className={st['conteiner']}>
            <div id={st["load"]}>
                <div>G</div>
                <div>N</div>
                <div>I</div>
                <div>D</div>
                <div>A</div>
                <div>O</div>
                <div>L</div>
            </div>
        </div>
    );
}

export default Loading;