import React, { useContext, useState } from "react";
const TournamentContext = React.createContext();

export const useTournamentContext = () => {
    return useContext(TournamentContext);
}

export const TournamentProvider = (props) => {
    const [selectedTournament, setSelectedTournament] = useState({
        tournament_id: "",
        tournament_name: "",
    })
    const setTournament = (id, name) => {
        setSelectedTournament({ tournament_id: id, tournament_name: name })
    }
    return (
        <TournamentContext.Provider value={{ selectedTournament, setTournament }}>
            {props.children}
        </TournamentContext.Provider >
    )
}