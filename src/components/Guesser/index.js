import { useEffect, useState } from "react";
import "./index.scss";

const Guesser = () => {
  // All the state setters for the game
  const [userGuess, setUserGuess] = useState({
    name: "",
  });
  const [refetch, setRefetch] = useState(false); //Boolean value switch used to force useEffect to rerun
  const [wrongGuess, setWrongGuess] = useState("");
  const [rightGuess, setRightGuess] = useState("");
  const [poke, setPoke] = useState({}); //short for pokemon data from api

  // Button handling, and state modification
  const handleChange = (event) => {
    setUserGuess({ ...userGuess, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserGuess({ name: "" });

    if (userGuess.name.toUpperCase() === poke.name.toUpperCase()) {
      setRefetch(!refetch);
      setWrongGuess("");
      setRightGuess(
        "Congratulation it was " +
          userGuess.name[0].toUpperCase() +
          userGuess.name.substring(1) +
          "!"
      );
    } else {
      setRightGuess("");
      setWrongGuess(
        "It was not " +
          userGuess.name[0].toUpperCase() +
          userGuess.name.substring(1)
      );
    }
  };

  // Obtain data from pokemon API
  useEffect(() => {
    // id of the pokemons' pokedex number for the API fetch call
    const id = Math.floor(Math.random() * 151) + 1; //Random 1st generation pokemon
    // const id = Math.floor(Math.random() * 898) + 1; //Any random pokemon
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      res.json().then(
        (json) => {
          setPoke(json);
        },
        [refetch]
      );
    };
    fetchData();
  }, [refetch]);

  return (
    <div className="Guesser">
      <div className="sprite">
        {poke.name ? (
          <img src={poke.sprites.back_default} alt="pokemon" />
        ) : (
          <div></div>
        )}
      </div>

      <div className="guessForm">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Guess"
              autoComplete="off"
              value={userGuess.name}
              onChange={handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
      <button
        className="retry"
        onClick={() => {
          setRefetch(!refetch);
          setWrongGuess("Unlucky");
          setRightGuess("");
        }}
      >
        Retry
      </button>
      <div className="userGuesses">
        <div className="wrongGuesses">{wrongGuess}</div>
        <div className="rightGuesses">{rightGuess}</div>
      </div>
    </div>
  );
};

export default Guesser;
