import { PlayersList } from "../../components/players/PlayersList";
import { Title } from '../../components/ui/Title';
import { Panel } from "../../components/ui/Panel";
import { CustomCard } from "../../components/ui/CustomCard";

const PlayersPage = () => {
    return (
        <>
        <Title text="Players" />
        <Panel colour="primary">
                <CustomCard>
                    <p>
                        This is a secret page to play around with React interactions with NestJS locally. It uses Axios to make the request out to a NestJS service with a
                        postgres database that serves Player data. The base of the nestJS codebase was created using claude, but all additions since the first commit are manual
                        with the intention of learning more about Typescript, NestJS, React and Node.
                    </p>    
                </CustomCard>
        </Panel>
        <Panel colour="secondary">
                <CustomCard>                
                    <PlayersList />
                </CustomCard>
        </Panel>
        </>
    );
};
export default PlayersPage;