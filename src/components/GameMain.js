import react from 'react';
import React from 'react';
import { getAllAgents } from '../lib/api';

const GameMain = () => {
  const [agents, setAgents] = React.useState('');
  const [activeAgent, setActive] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllAgents();
        setAgents(data.data.filter((agent) => agent.isPlayableCharacter));
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  react.useEffect(() => {
    setActive(agents[Math.floor(Math.random() * agents.length)]);
    console.log('Active Agent', activeAgent);
  }, [agents]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline">
          {!agents ? (
            <p>Loading...</p>
          ) : (
            <>
              {activeAgent && <h2>{activeAgent.displayName}</h2>}
            </>
          )}
          {!agents ? (
            <p>Loading...</p>
          ) : (
            <>
              {activeAgent && <img src={activeAgent.bustPortrait} alt="agentpic"></img>}
            </>
          )}
        </div>
        {activeAgent && <img
          src={
            activeAgent.abilities[
              Math.floor(Math.random() * activeAgent.abilities.length)
            ].displayIcon
          }
          alt="abilitypic"
        ></img>}

      </div>
    </section>
  );
};
export default GameMain;